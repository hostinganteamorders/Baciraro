#!/usr/bin/env python3.11
"""Build scripts/3d/batch4_manifest.json with product metadata + estimated weight/time.

Weight is estimated from the converted GLB mesh volume (PLA density ~1.24 g/cm3),
exactly like build_batch3_manifest.py. Run AFTER scripts/3d/stl2glb.py so the
public/models/{slug}.glb files exist.
"""

import json
import os
import sys

import trimesh

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "public", "models")

META = [
    {
        "slug": "3d-flexi-axolotl",
        "title": "Flexi Axolotl Articulated",
        "description": "Axolotl artikulasi print-in-place yang lentur dan imut. Tanpa support, langsung bisa dimainkan begitu keluar dari printer.",
        "story": "Axolotl dengan badan bersegmen yang bisa digoyang-goyang. Cetak sekali jalan tanpa perakitan, cocok untuk mainan meja, hadiah anak, dan teman fidget harian.",
    },
    {
        "slug": "3d-axolotl-fidget",
        "title": "Axolotl Fidget Articulated",
        "description": "Fidget axolotl artikulasi yang lucu dan bisa digerak-gerakkan. Ringan, tanpa support, siap main langsung setelah dicetak.",
        "story": "Versi fidget dari axolotl dengan tubuh yang lentur. Menghibur di meja kerja dan mudah dicetak, jadi kandidat bagus untuk suvenir dan hadiah kecil.",
    },
    {
        "slug": "3d-flexi-manta-ray",
        "title": "Flexi Manta Ray",
        "description": "Manta ray artikulasi dengan sayap dan tubuh yang bergerak fleksibel. Print-in-place, detail, dan sangat memuaskan untuk dimainkan.",
        "story": "Seluruh tubuh manta ray tersambung engsel sehingga bisa meliuk seperti berenang. Desain klasik yang populer untuk koleksi satwa laut yang lentur.",
    },
    {
        "slug": "3d-mini-turtle",
        "title": "Mini Turtle Articulated",
        "description": "Penyu mini artikulasi yang cepat dicetak (sekitar 27 menit). Kecil, imut, dan murah — pas untuk suvenir dan hadiah.",
        "story": "Penyu mungil dengan leher dan kaki yang bisa bergerak. Waktu cetak super cepat membuatnya ideal untuk produksi massal kecil dan suvenir acara.",
    },
    {
        "slug": "3d-zookis-chameleon",
        "title": "Zookis Chameleon",
        "description": "Bunglon mini dari seri Zookis yang lentur dan cepat dicetak. Cocok untuk suvenir, hadiah, dan koleksi satwa mini.",
        "story": "Bunglon mungil dengan ekor dan tubuh yang bisa digoyang. Ukuran mini dan cetak cepat membuatnya murah per buah, cocok dijual sebagai gantungan maupun suvenir.",
    },
    {
        "slug": "3d-zookis-crocodile",
        "title": "Zookis Crocodile",
        "description": "Buaya mini dari seri Zookis dengan rahang dan badan lentur. Imut, ringan, dan cepat dicetak.",
        "story": "Buaya kecil yang menggemaskan dengan tubuh bersegmen. Desain mini yang ekonomis untuk suvenir tema satwa dan hadiah anak.",
    },
    {
        "slug": "3d-spike-dragon",
        "title": "Articulated Spike Dragon",
        "description": "Naga berduri artikulasi yang gagah. Print-in-place tanpa support, badan bersegmen yang bergerak bebas.",
        "story": "Naga dengan deretan duri di punggung dan tubuh yang lentur. Penampilannya dramatis namun mudah dicetak, seru untuk koleksi dan mainan meja.",
    },
    {
        "slug": "3d-flexi-dragon",
        "title": "Flexi Dragon Articulated",
        "description": "Naga artikulasi print-in-place yang mulus bergerak. Tersedia versi satu warna dan multicolor, tanpa support.",
        "story": "Naga dengan tubuh bersegmen yang dirancang agar bisa langsung bergerak dari print bed. Bisa untuk display, desk toy, atau koleksi.",
    },
    {
        "slug": "3d-flexi-toothless",
        "title": "Flexi Toothless Dragon",
        "description": "Naga Toothless flexi yang bisa berdiri, duduk, dan mengepakkan sayap. Multicolor, tanpa support.",
        "story": "Reproduksi naga mungil yang ikonik dengan sayap yang bisa dikepakkan. Salah satu model flexi paling populer, menyenangkan untuk penggemar dan kolektor.",
    },
    {
        "slug": "3d-flexi-bearded-dragon",
        "title": "Flexi Bearded Dragon",
        "description": "Biawak berjanggut flexi realistis dengan hampir semua sisik yang lentur. Print-in-place, tanpa brim dan support.",
        "story": "Reptil peliharaan dalam bentuk flexi yang detail dan sangat lentur. Desainnya yang hidup membuatnya cocok untuk penggemar reptil dan koleksi satwa.",
    },
    {
        "slug": "3d-flexi-pangolin",
        "title": "Flexi Pangolin",
        "description": "Pangolin flexi super detail dengan hampir seluruh sisiknya lentur. Print-in-place, tanpa support, sangat memuaskan.",
        "story": "Tenggiling dengan sisik-sisik individual yang bisa bergerak satu per satu. Salah satu model flexi paling detail dan menakjubkan untuk pengoleksi.",
    },
    {
        "slug": "3d-flexi-scorpion",
        "title": "Flexi Scorpion",
        "description": "Kalajengking artikulasi dengan capit dan ekor yang bergerak lentur. Cetak sekali jalan, tanpa support.",
        "story": "Kalajengking dengan kaki, capit, dan ekor bersegmen yang bisa digerakkan. Koleksi satwa unik yang seru dan mudah dicetak.",
    },
    {
        "slug": "3d-flexi-manta-ray-pip",
        "title": "Flexi Manta Ray Print-in-Place",
        "description": "Manta ray print-in-place tanpa support dengan sayap yang bergerak mulus. Desain ringkas dan mudah dicetak.",
        "story": "Versi print-in-place dari manta ray yang dioptimalkan tanpa support. Sayap dan tubuhnya bergerak alami seperti berenang di laut.",
    },
    {
        "slug": "3d-chameleon-flexi-dragon",
        "title": "Chameleon Flexi Dragon",
        "description": "Naga-bunglon flexi yang detail dengan ekor melingkar. Print-in-place, tanpa support, seluruh badan lentur.",
        "story": "Bunglon dengan ekor menggulung dan tubuh bersegmen yang bisa digoyang. Perpaduan unik antara dua hewan favorit dalam satu model flexi.",
    },
    {
        "slug": "3d-flexi-playful-star",
        "title": "Flexi Playful Star",
        "description": "Bintang flexi yang bisa digenggam dan digoyang-goyang. Print-in-place tanpa support, mainan meja yang menyenangkan.",
        "story": "Bintang laut versi flexi yang pas digenggam. Gerakannya yang mengalir membuatnya jadi fidget yang seru sekaligus dekorasi lucu.",
    },
    {
        "slug": "3d-skeleton-dragon",
        "title": "Articulated Skeleton Dragon",
        "description": "Naga kerangka artikulasi yang keren dengan tulang belakang bersegmen. Print-in-place, tanpa support.",
        "story": "Naga bertulang dengan tubuh yang lentur dan detail rangka yang dramatis. Cocok untuk penggemar fantasi dan koleksi yang menonjol.",
    },
    {
        "slug": "3d-infinity-serpent",
        "title": "Infinity Serpent Articulated",
        "description": "Ular naga panjang artikulasi dengan gerakan mengalir seperti ular sungguhan. Print-in-place, tanpa support.",
        "story": "Serpent sangat panjang dengan banyak segmen yang bergerak mengalir. Efek gerakannya menghipnotis dan jadi mainan favorit anak-anak.",
    },
    {
        "slug": "3d-flexi-unicorn-dragon",
        "title": "Flexi Unicorn Dragon",
        "description": "Naga berunicorn flexi yang cantik dengan sayap dan tanduk. Print-in-place, tanpa support, siap dimainkan.",
        "story": "Perpaduan unicorn dan naga dalam bentuk flexi yang lentur. Desainnya yang memukau cocok untuk hadiah dan koleksi fantasi.",
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
    with open(os.path.join(os.path.dirname(__file__), "batch4_manifest.json"), "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"\nWrote scripts/3d/batch4_manifest.json ({len(out)} products)")


if __name__ == "__main__":
    main()
