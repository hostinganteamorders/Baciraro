#!/usr/bin/env python3.11
"""Render flat-shaded preview PNG dari GLB untuk kartu produk 3D Print.

Output: public/produk/3d/<slug>.png (transparan, cyan, isometrik, 16:10).
Model dirender tight lalu contain-fit agar mengisi frame.
"""

import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import trimesh
from PIL import Image

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "public", "produk", "3d")

JOBS = [
    ("public/models/3d-jimothy-raccoon.glb", "jimothy-raccoon.png"),
    ("public/models/3d-dragon.glb", "dragon.png"),
]

CANVAS = (960, 600)


def render(glb, out_png):
    scene = trimesh.load(glb)
    name = list(scene.geometry.keys())[0]
    mesh = scene.geometry[name]
    verts = mesh.vertices
    faces = mesh.faces

    fig = plt.figure(figsize=(8, 8), dpi=150)
    ax = fig.add_subplot(111, projection="3d")
    ax.set_axis_off()
    ax.set_facecolor((0, 0, 0, 0))
    fig.patch.set_alpha(0.0)

    ax.plot_trisurf(
        verts[:, 0], verts[:, 1], verts[:, 2],
        triangles=faces, color="#22d3ee", shade=True, antialiased=False,
        lightsource=matplotlib.colors.LightSource(azdeg=45, altdeg=35),
    )
    ax.view_init(elev=28, azim=-55)
    ax.set_box_aspect((1, 1, 1))
    pad = mesh.extents.max() * 0.06
    ax.set_xlim(verts[:, 0].min() - pad, verts[:, 0].max() + pad)
    ax.set_ylim(verts[:, 1].min() - pad, verts[:, 1].max() + pad)
    ax.set_zlim(verts[:, 2].min() - pad, verts[:, 2].max() + pad)

    fig.canvas.draw()
    buf, (w, h) = fig.canvas.print_to_buffer()
    plt.close(fig)
    im = Image.frombuffer("RGBA", (w, h), buf, "raw", "RGBA", 0, 1)

    a = np.array(im)
    ys, xs = np.where(a[..., 3] > 10)
    if len(xs) == 0:
        print(f"WARN: render kosong untuk {glb}", flush=True)
        return
    crop = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    cw, ch = crop.size

    W, H = CANVAS
    scale = min(0.92 * W / cw, 0.88 * H / ch)
    nw = max(1, int(round(cw * scale)))
    nh = max(1, int(round(ch * scale)))
    model = crop.resize((nw, nh), Image.LANCZOS)

    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    canvas.paste(model, ((W - nw) // 2, (H - nh) // 2), model)

    os.makedirs(OUT_DIR, exist_ok=True)
    canvas.save(out_png)
    print(f"OK -> {out_png} ({os.path.getsize(out_png)//1024} KB)", flush=True)


def main():
    for glb, png in JOBS:
        render(glb, os.path.join(OUT_DIR, png))


if __name__ == "__main__":
    main()
