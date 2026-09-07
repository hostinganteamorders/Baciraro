#!/usr/bin/env python3.11
"""Segment an existing GLB into N color bands along the body (or its longest axis).

For each GLB in public/models/ the mesh is split into N bands. Two strategies:

  "geodesic" (default) — bands follow the body: components are stitched into a
      chain and a BFS distance field along the body assigns every face a band.
      Coiled/circular bodies (e.g. Infinity Serpent) get contiguous segments
      instead of planar wedges that cross the body many times.
  "planar" — the previous behaviour: split perpendicular to the longest extent.
  "none" — leave the model untouched (single material, no per-segment picker).

Each band becomes its own Trimesh with a dedicated PBR material named
"segmen-1".."segmen-N". Vertex colors are stripped so the model can be
recolored live on the client via model.materials[].setBaseColorFactor().

Usage:
  /opt/homebrew/bin/python3.11 scripts/3d/bandify.py                # all GLBs
  /opt/homebrew/bin/python3.11 scripts/3d/bandify.py --only slug1 slug2
  /opt/homebrew/bin/python3.11 scripts/3d/bandify.py --report        # metrics only, no writes

Dependency: trimesh (python3.11).
"""

import os
import sys
import time
from collections import deque

import numpy as np
import trimesh
from trimesh.visual.material import PBRMaterial

MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "public", "models")

CYAN = [0x22 / 255.0, 0xD3 / 255.0, 0xEE / 255.0, 1.0]

# Jumlah band per slug; fallback ke default bila tidak ada.
DEFAULT_BANDS = 6
BAND_COUNT = {
    "3d-mini-turtle": 4,
    "3d-zookis-chameleon": 4,
    "3d-zookis-crocodile": 4,
    "3d-skeleton-dragon": 8,
    "3d-infinity-serpent": 8,
    "3d-flexi-manta-ray": 6,
    "3d-flexi-manta-ray-pip": 6,
}

# Strategi banding per slug; default "geodesic".
#   "geodesic" — bands follow the body length (good for coiled/curved bodies)
#   "planar"   — bands perpendicular to the longest axis (old behaviour)
#   "none"     — skip banding, model stays single-material (no color picker)
DEFAULT_STRATEGY = "geodesic"
BAND_STRATEGY = {
    # "3d-example": "planar",
}


def bands_for(slug):
    return BAND_COUNT.get(slug, DEFAULT_BANDS)


def strategy_for(slug):
    return BAND_STRATEGY.get(slug, DEFAULT_STRATEGY)


def _build_bands(verts, faces, band_of_face, n_bands):
    """Turn a per-face band label array into a list of Trimesh."""
    bands = []
    for b in range(n_bands):
        sel = np.where(band_of_face == b)[0]
        if len(sel) == 0:
            continue
        fb = faces[sel]
        uv, inv = np.unique(fb.reshape(-1), return_inverse=True)
        vb = verts[uv]
        fbb = inv.reshape(-1, 3).astype(np.int64)
        bands.append(trimesh.Trimesh(vertices=vb, faces=fbb, process=False))
    return bands


def split_into_bands_planar(mesh, n_bands):
    """Split a single Trimesh into n_bands meshes perpendicular to its longest axis."""
    verts = np.asarray(mesh.vertices, dtype=np.float64)
    faces = np.asarray(mesh.faces, dtype=np.int64)
    centroids = verts[faces].mean(axis=1)
    axis = int(np.argmax(mesh.extents))
    t = centroids[:, axis]
    lo, hi = t.min(), t.max()
    span = hi - lo
    if span <= 1e-9:
        return [mesh.copy()]
    norm = np.clip((t - lo) / span, 0.0, 0.999999)
    band_of_face = np.floor(norm * n_bands).astype(np.int64)
    return _build_bands(verts, faces, band_of_face, n_bands)


def _geodesic_field(verts, faces):
    """Distance of every vertex from one end of the body.

    Stitches disconnected components into a nearest-neighbour chain, then BFS
    from the tail end of that chain. Returns (dist_array, reachable_fraction).
    """
    edges = np.sort(
        np.concatenate([faces[:, [0, 1]], faces[:, [1, 2]], faces[:, [0, 2]]]), axis=1
    )
    edges = np.unique(edges, axis=0)
    vadj = [[] for _ in range(len(verts))]
    for a, b in edges:
        vadj[a].append(b)
        vadj[b].append(a)

    # face-level connected components (cover isolated faces as singletons)
    fa = trimesh.graph.face_adjacency(faces=faces)
    groups = []
    covered = set()
    for arr in trimesh.graph.connected_components(fa):
        g = [int(f) for f in arr]
        groups.append(g)
        covered.update(g)
    for f in range(len(faces)):
        if f not in covered:
            groups.append([f])

    if len(groups) <= 1:
        dist = np.full(len(verts), -1, dtype=np.int64)
        dist[0] = 0
        q = deque([0])
        while q:
            u = q.popleft()
            du = dist[u] + 1
            for v in vadj[u]:
                if dist[v] < 0:
                    dist[v] = du
                    q.append(v)
        return dist, 1.0

    # component centroids -> nearest-neighbour chain
    cents = np.array(
        [verts[np.unique(faces[g].reshape(-1))].mean(axis=0) for g in groups]
    )
    order = [0]
    used = {0}
    cur = 0
    for _ in range(len(groups) - 1):
        d = np.linalg.norm(cents - cents[cur], axis=1)
        d[list(used)] = np.inf
        nxt = int(np.argmin(d))
        order.append(nxt)
        used.add(nxt)
        cur = nxt

    def sample_verts(gi, k=40):
        uf = np.unique(faces[groups[gi]].reshape(-1))
        return uf[:: max(1, len(uf) // k)][:k] if len(uf) > k else uf

    # stitch nearest vertex pair between consecutive components
    stitch = []
    for i in range(len(order) - 1):
        a, b = order[i], order[i + 1]
        va = verts[sample_verts(a)]
        vb = verts[sample_verts(b)]
        dd = va[:, None, :] - vb[None, :, :]
        d2 = np.einsum("ijk,ijk->ij", dd, dd)
        ia, ib = np.unravel_index(np.argmin(d2), d2.shape)
        stitch.append((int(sample_verts(a)[ia]), int(sample_verts(b)[ib])))

    # BFS from the tail end of the chain
    dist = np.full(len(verts), -1, dtype=np.int64)
    start = int(sample_verts(order[-1])[0])
    dist[start] = 0
    q = deque([start])
    while q:
        u = q.popleft()
        du = dist[u] + 1
        for v in vadj[u]:
            if dist[v] < 0:
                dist[v] = du
                q.append(v)
        for u0, v0 in stitch:
            if u0 == u and dist[v0] < 0:
                dist[v0] = du
                q.append(v0)
            elif v0 == u and dist[u0] < 0:
                dist[u0] = du
                q.append(u0)

    reachable = float(np.count_nonzero(dist >= 0)) / float(len(verts))
    return dist, reachable


def split_into_bands_geodesic(mesh, n_bands):
    """Split a mesh into n_bands following the body length (coil-safe)."""
    verts = np.asarray(mesh.vertices, dtype=np.float64)
    faces = np.asarray(mesh.faces, dtype=np.int64)

    dist, _ = _geodesic_field(verts, faces)
    tri = dist[faces]
    reachable = tri.min(axis=1) >= 0
    fd = tri.mean(axis=1)[reachable]
    if len(fd) == 0 or fd.max() - fd.min() <= 1e-9:
        return split_into_bands_planar(mesh, n_bands)

    norm = np.clip((fd - fd.min()) / (fd.max() - fd.min()), 0.0, 0.999999)
    band_of_face = np.full(len(faces), -1, dtype=np.int64)
    band_of_face[reachable] = np.floor(norm * n_bands).astype(np.int64)

    # orphan faces (unreachable shells) -> planar projection as fallback
    orphan = np.where(~reachable)[0]
    if len(orphan):
        centroids = verts[faces[orphan]].mean(axis=1)
        axis = int(np.argmax(mesh.extents))
        t = centroids[:, axis]
        span = t.max() - t.min()
        if span > 1e-9:
            onorm = np.clip((t - t.min()) / span, 0.0, 0.999999)
            band_of_face[orphan] = np.floor(onorm * n_bands).astype(np.int64)
        else:
            band_of_face[orphan] = 0

    return _build_bands(verts, faces, band_of_face, n_bands)


def bandify(path, slug, t0, strategy):
    print(f"== {os.path.basename(path)} -> {slug} [{strategy}]", flush=True)
    mesh = trimesh.load(path, force="mesh")
    n0 = len(mesh.faces)
    n = bands_for(slug)
    print(f"  loaded {len(mesh.vertices)}v/{n0}f -> {n} bands", flush=True)

    if strategy == "geodesic":
        bands = split_into_bands_geodesic(mesh, n)
    else:
        bands = split_into_bands_planar(mesh, n)
    print(f"  split into {len(bands)} bands in {time.time()-t0:.1f}s", flush=True)

    scene = trimesh.Scene()
    for i, bm in enumerate(bands, start=1):
        mat = PBRMaterial(baseColorFactor=list(CYAN), name=f"segmen-{i}")
        bm.visual = trimesh.visual.TextureVisuals(material=mat)
        scene.add_geometry(bm, node_name=f"segmen-{i}")

    scene.export(path)
    print(
        f"  wrote {os.path.getsize(path)//1024} KB, {len(bands)} materials, {time.time()-t0:.1f}s",
        flush=True,
    )


def report(path, slug, strategy):
    """Print banding quality metrics without writing anything."""
    mesh = trimesh.load(path, force="mesh")
    verts = np.asarray(mesh.vertices, dtype=np.float64)
    faces = np.asarray(mesh.faces, dtype=np.int64)
    fa = trimesh.graph.face_adjacency(faces=faces)
    comps = trimesh.graph.connected_components(fa)
    comp_of = {}
    for ci, arr in enumerate(comps):
        for f in arr:
            comp_of[int(f)] = ci

    if strategy == "geodesic":
        dist, reach = _geodesic_field(verts, faces)
        tri = dist[faces]
        reachable = tri.min(axis=1) >= 0
        fd = tri.mean(axis=1)[reachable]
        norm = np.clip(
            (fd - fd.min()) / (fd.max() - fd.min() + 1e-9), 0.0, 0.999999
        )
        band = np.full(len(faces), -1)
        band[reachable] = np.floor(norm * BAND_COUNT.get(slug, DEFAULT_BANDS)).astype(int)
    else:
        centroids = verts[faces].mean(axis=1)
        axis = int(np.argmax(mesh.extents))
        t = centroids[:, axis]
        norm = np.clip(
            (t - t.min()) / (t.max() - t.min() + 1e-9), 0.0, 0.999999
        )
        band = np.floor(norm * BAND_COUNT.get(slug, DEFAULT_BANDS)).astype(int)

    n_bands = BAND_COUNT.get(slug, DEFAULT_BANDS)
    shares = []
    for b in range(n_bands):
        sel = np.where(band == b)[0]
        if len(sel) == 0:
            shares.append(0.0)
            continue
        cc = {}
        for f in sel:
            cc[comp_of.get(int(f), -1)] = cc.get(comp_of.get(int(f), -1), 0) + 1
        shares.append(max(cc.values()) / len(sel))

    reach_txt = f"{reach*100:.1f}%" if strategy == "geodesic" else "-"
    worst = f"{min(shares)*100:.0f}%"
    print(
        f"{slug:34s} [{strategy:8s}] comps={len(comps):4d} reach={reach_txt:7s} "
        f"worstBandLargest={worst:4s} avgLargest={sum(shares)/len(shares)*100:.0f}%"
    )


def main():
    only = set()
    do_report = False
    args = sys.argv[1:]
    i = 0
    while i < len(args):
        arg = args[i]
        if arg == "--report":
            do_report = True
        elif arg == "--only":
            i += 1
            while i < len(args) and not args[i].startswith("--"):
                for part in args[i].split(","):
                    if part:
                        only.add(part)
                i += 1
            continue
        elif arg.startswith("--only="):
            only = {a for a in arg.split("=", 1)[1].split(",") if a}
        i += 1

    files = sorted(f for f in os.listdir(MODELS_DIR) if f.endswith(".glb"))
    if not files:
        print(f"No .glb files in {MODELS_DIR}")
        sys.exit(0)
    if only:
        files = [f for f in files if f[:-4] in only]
        if not files:
            print(f"No matching GLBs for --only {sorted(only)}")
            sys.exit(1)

    t0 = time.time()
    n_skipped = 0
    for f in files:
        slug = f[:-4]
        strategy = strategy_for(slug)
        if strategy == "none":
            n_skipped += 1
            if do_report:
                print(f"{slug:34s} [none    ] skipped")
            continue
        if do_report:
            report(os.path.join(MODELS_DIR, f), slug, strategy)
        else:
            bandify(os.path.join(MODELS_DIR, f), slug, t0, strategy)
    if do_report:
        print(f"\nReport done for {len(files)-n_skipped} model(s) ({n_skipped} skipped).")
    else:
        print(f"\nDone. {len(files)-n_skipped} model(s) bandified ({n_skipped} skipped) in {time.time()-t0:.0f}s.")


if __name__ == "__main__":
    main()
