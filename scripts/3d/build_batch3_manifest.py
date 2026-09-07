#!/usr/bin/env python3.11
"""Build scripts/3d/batch3_manifest.json with product metadata + estimated weight/time.

Weight is estimated from the converted GLB mesh volume (PLA density ~1.24 g/cm3),
exactly like build_batch2_manifest.py. Run AFTER scripts/3d/stl2glb.py so the
public/models/{slug}.glb files exist. Output is consumed by scripts/3d/insert_batch3.mjs.
"""

import json
import os
import sys

import trimesh

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "public", "models")

META = [
    {
        "slug": "3d-mini-shark",
        "title": "Mini Shark Articulated",
        "description": "Hiu mini artikulasi yang lentur, cocok untuk gantungan kunci maupun mainan meja. Cetak cepat, hanya sekitar 20 menit.",
        "story": "Hiu kecil dengan badan artikulasi yang bisa digoyang-goyang. Ukurannya pas untuk gantungan kunci dan hadiah, serta sangat cepat dicetak sehingga murah.",
    },
    {
        "slug": "3d-whale-shark-keychain",
        "title": "Whale Shark Articulated Keychain",
        "description": "Hiu paus artikulasi versi mini dengan lubang gantungan kunci. Ringan, imut, dan bisa meliuk seperti berenang.",
        "story": "Hiu paus yang ramah, dibuat dalam ukuran miniaturnya lengkap dengan gantungan. Segmen artikulasinya bergerak bebas, pas untuk aksesori harian atau hadiah tema laut.",
    },
    {
        "slug": "3d-articulated-caterpillar",
        "title": "Articulated Caterpillar",
        "description": "Ulat artikulasi print-in-place tanpa support. Mudah dicetak, seru dimainkan, dan bisa untuk hadiah anak maupun giveaway.",
        "story": "Ulat dengan segmen-segmen lentur yang mencetak dalam sekali jalan tanpa perakitan. Motif gerakannya yang mengalir membuatnya menyenangkan untuk anak-anak.",
    },
    {
        "slug": "3d-articulated-octopus",
        "title": "Articulated Octopus",
        "description": "Gurita artikulasi dengan lengan yang lentur. Print-in-place, tanpa support, langsung main begitu keluar dari printer.",
        "story": "Gurita yang seluruh lengannya bisa digerakkan, dirancang agar mudah dicetak dan menyenangkan untuk dimainkan. Cocok untuk desk toy, mainan anak, dan hadiah.",
    },
    {
        "slug": "3d-articulated-octopus-keychain",
        "title": "Articulated Octopus Keychain",
        "description": "Versi gantungan kunci dari gurita artikulasi. Sama lenturnya, ditambah lubang untuk ring kunci.",
        "story": "Gurita mini dengan lengan lentur dan lubang gantungan. Bisa dibawa ke mana-mana sebagai aksesori lucu atau hadiah kecil yang menyenangkan.",
    },
    {
        "slug": "3d-turtle-25pcs",
        "title": "Set 25 Mini Turtles",
        "description": "Paket 25 penyu mini dalam satu cetakan. Hemat biaya per pcs, pas untuk suvenir, hadiah ulang tahun, dan event.",
        "story": "Dua puluh lima penyu kecil yang dicetak sekaligus. Setiap penyu ringan sehingga murah per buah, cocok untuk didistribusikan sebagai suvenir atau ditempatkan di toko.",
    },
    {
        "slug": "3d-amazing-star-fidget",
        "title": "Amazing Star Fidget",
        "description": "Fidget bintang yang bisa diputar dan mengembang-merapat. Sensasi kinetik yang menghipnotis, tanpa perakitan.",
        "story": "Bintang mekanik berputar yang membuka dan menutup dengan gerakan memuaskan. Silky PLA membuat gerakannya mulus dan tampilannya berkilau.",
    },
]

DENSITY_PLA = 1.24  # g/cm3


def est_minutes(weight_g):
    return max(15, min(600, round(weight_g * 3.2)))


def main():
    out = []
    missing = []
    for m in META:
        glb = os.path.join(OUT_DIR, f"{m['slug']}.glb")
        if not os.path.exists(glb):
            missing.append(m["slug"])
            continue
        mesh = trimesh.load(glb)
        vol_cm3 = float(mesh.volume) / 1000.0
        weight_g = round(max(vol_cm3, 0.0) * DENSITY_PLA, 1)
        m2 = dict(m)
        m2["weight_g"] = weight_g
        m2["print_time_min"] = est_minutes(weight_g)
        out.append(m2)
        print(f"{m['slug']:28} vol={vol_cm3:8.1f} cm3  weight={weight_g:6.1f} g  min={m2['print_time_min']}")
    if missing:
        print("\nMISSING GLB (jalankan npm run stl2glb dulu):")
        for s in missing:
            print("  ", s)
        sys.exit(1)
    with open(os.path.join(os.path.dirname(__file__), "batch3_manifest.json"), "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"\nWrote scripts/3d/batch3_manifest.json ({len(out)} products)")


if __name__ == "__main__":
    main()