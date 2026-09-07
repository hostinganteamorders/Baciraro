#!/usr/bin/env python3.11
"""Generate supabase-mw-batch2.sql from batch2_manifest.json + images on disk."""
import json
import os

BASE = os.path.dirname(__file__)
ROOT = os.path.normpath(os.path.join(BASE, "..", ".."))
IMG_DIR = os.path.join(ROOT, "public", "produk", "3d", "mw-b2")
manifest = json.load(open(os.path.join(BASE, "batch2_manifest.json")))

lines = [
    "-- MakerWorld batch 2 (sea/satwa/religi/nama) - integrated products",
    "-- Run in Supabase SQL Editor. Replaces/updates rows by slug.",
    "INSERT INTO products (slug, title, description, category, story, materials, total_plastic_kg, image_url, gallery, is_active, weight_g, print_time_min, variants, artists) VALUES",
]
for i, m in enumerate(manifest):
    slug = m["slug"]
    files = sorted(f for f in os.listdir(IMG_DIR) if f.startswith(slug + "-"))
    hero = next((f for f in files if f.startswith(slug + "-1.")), files[0])
    gallery = [f for f in files if f != hero]

    def esc(s):
        return s.replace("'", "''")

    row = (
        f"('{m['slug']}', '{esc(m['title'])}', '{esc(m['description'])}', '3dprint', "
        f"'{esc(m['story'])}', '[]', 0, '/produk/3d/mw-b2/{hero}', "
        f"'{json.dumps(['/produk/3d/mw-b2/' + g for g in gallery], ensure_ascii=False)}', true, "
        f"{m['weight_g']}, {m['print_time_min']}, "
        f"'[{{\"label\":\"Standar\",\"weight_g\":{m['weight_g']},\"minutes\":{m['print_time_min']}}}]', '[]')"
    )
    lines.append(row + ("," if i < len(manifest) - 1 else ""))

lines.append("ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, category = EXCLUDED.category, story = EXCLUDED.story, image_url = EXCLUDED.image_url, gallery = EXCLUDED.gallery, is_active = true, weight_g = EXCLUDED.weight_g, print_time_min = EXCLUDED.print_time_min, variants = EXCLUDED.variants, artists = EXCLUDED.artists;")

out = os.path.join(ROOT, "supabase-mw-batch2.sql")
open(out, "w").write("\n".join(lines) + "\n")
print("Wrote", out)
