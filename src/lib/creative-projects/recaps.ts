import { creativeMedia } from "@/lib/media";

export type L = { id: string; en: string };

export type RecapPhoto = { n: number; alt: L; caption: L };

export type RecapProject = {
  slug: string; // folder foto di Supabase: creative/<slug>/
  mediaSlug: string;
  /** Alamat foto penuh bila tidak memakai pola fNNN.webp (mis. foto lokal di /public). Indeks = n - 1. */
  files?: string[];
  eyebrow: L;
  title: L;
  description: L;
  partner: L;
  date: L;
  hero: number;
  heroCaption: L;
  impact?: { value: string; unit: L; description: L; note?: L };
  story: { label: L; title: L; aside: L; paragraphs: L[]; quote?: L };
  process?: { label: L; title: L; steps: { label: L; title: L; body: L }[] };
  /** Foto produk berlatar transparan (folder `piala/pNN.webp`), ditampilkan sebagai etalase. */
  showcase?: { count: number; label: L; title: L; desc: L };
  gallery: { label: L; title: L; desc: L };
  photos: RecapPhoto[];
  thanks: { label: L; title: L; body: L; closing: L };
  card: { tag: L; blurb: L; cta: L };
  metaDescription: L;
};

export const showcaseUrl = (p: RecapProject, i: number) =>
  creativeMedia(p.mediaSlug, `piala/p${String(i).padStart(2, "0")}.webp`);

export const recapPhotoUrl = (p: RecapProject, n: number, thumb = false) =>
  p.files?.[n - 1] ??
  creativeMedia(p.mediaSlug, `f${String(n).padStart(3, "0")}${thumb ? "-t" : ""}.webp`);

const ph = (n: number, id: string, en: string, cid?: string, cen?: string): RecapPhoto => ({
  n,
  alt: { id, en },
  caption: { id: cid ?? id, en: cen ?? en },
});

/* ───────────────────────── ANNUAL GAMES 2026 ───────────────────────── */
const annualGames: RecapProject = {
  slug: "annual-games-2026",
  mediaSlug: "annual-games-2026",
  eyebrow: { id: "Project Recap · Merchandise Acara", en: "Project Recap · Event Merchandise" },
  title: {
    id: "27 piala & 285 medali dari plastik daur ulang",
    en: "27 trophies & 285 medals from recycled plastic",
  },
  description: {
    id: "Baciraro Creative memproduksi piala dan medali Annual Games 2026 untuk PT Bintan Industrial Estate (BII) dari campuran plastik daur ulang dan kayu — penghargaan juara yang tetap bercerita tentang sampah yang diselamatkan.",
    en: "Baciraro Creative produced the Annual Games 2026 trophies and medals for PT Bintan Industrial Estate (BII) from recycled plastic and wood — champion awards that still tell the story of the waste they saved.",
  },
  partner: { id: "PT Bintan Industrial Estate (BII)", en: "PT Bintan Industrial Estate (BII)" },
  date: { id: "November 2026", en: "November 2026" },
  hero: 19,
  heroCaption: {
    id: "Piala juara cabang tenis meja — papan plastik daur ulang berpola, tiang dan alas kayu.",
    en: "Table-tennis champion trophy — patterned recycled-plastic board with a wooden stem and base.",
  },
  impact: {
    value: "±48",
    unit: { id: "kilogram material terselamatkan", en: "kilograms of material rescued" },
    description: {
      id: "27 piala dan 285 medali dibuat dari sekitar 48 kg material: ±12 kg plastik untuk medali dan ±36 kg campuran plastik serta kayu untuk piala.",
      en: "27 trophies and 285 medals were made from roughly 48 kg of material: about 12 kg of plastic for the medals and about 36 kg of mixed plastic and wood for the trophies.",
    },
    note: {
      id: "Setiap cabang lomba mendapat desain papan sendiri, lengkap dengan stiker logo acara dan label juara.",
      en: "Every sport got its own board design, complete with the event logo sticker and a placement label.",
    },
  },
  story: {
    label: { id: "Cerita Proyek", en: "Project Story" },
    title: { id: "Penghargaan yang tidak menambah sampah", en: "Awards that don't add to the waste" },
    aside: {
      id: "Annual Games adalah ajang olahraga tahunan karyawan PT BII di Bintan.",
      en: "Annual Games is the annual employee sports event of PT BII in Bintan.",
    },
    paragraphs: [
      {
        id: "Piala dan medali biasanya dibuat dari logam atau resin baru. Untuk Annual Games 2026, BII memilih jalur lain: seluruh penghargaan dibuat dari plastik yang sudah dipakai.",
        en: "Trophies and medals are usually made from new metal or resin. For Annual Games 2026, BII took another route: every award is made from plastic that has already been used.",
      },
      {
        id: "Plastik dipilah, dicacah, lalu dipres menjadi papan bermotif. Papan itu dipotong menjadi bentuk perisai dan lingkaran sesuai cabang — sepak bola, basket, bola voli, tenis meja, bulu tangkis, hingga e-sport — dan dipadukan dengan kayu bekas sebagai tiang dan alas.",
        en: "The plastic was sorted, shredded and pressed into patterned boards. The boards were cut into shield and round shapes for each sport — football, basketball, volleyball, table tennis, badminton, even e-sport — and paired with reclaimed wood for the stem and base.",
      },
      {
        id: "Hasilnya 27 piala dan 285 medali yang tiap motifnya unik, karena tidak ada dua potong plastik yang berwarna sama.",
        en: "The result is 27 trophies and 285 medals whose patterns are all unique, because no two pieces of plastic are the same colour.",
      },
    ],
    quote: {
      id: "Juara pulang membawa piala yang juga menyelamatkan bumi.",
      en: "The champions go home with a trophy that also helps save the planet.",
    },
  },
  showcase: {
    count: 30,
    label: { id: "Etalase Piala", en: "Trophy Showcase" },
    title: { id: "Satu piala untuk setiap juara", en: "One trophy for every champion" },
    desc: {
      id: "Setiap cabang punya bentuk papan sendiri: bola voli, basket, tenis meja, badminton, e-sport, sepak takraw, hingga sepak bola. Klik untuk memperbesar.",
      en: "Every sport has its own board shape: volleyball, basketball, table tennis, badminton, e-sports, sepak takraw and football. Click to enlarge.",
    },
  },
  gallery: {
    label: { id: "Dokumentasi", en: "Documentation" },
    title: { id: "Piala dan medali Annual Games 2026", en: "Annual Games 2026 trophies and medals" },
    desc: {
      id: "Klik foto untuk memperbesar. Ada medali, piala per cabang, dan proses finishing.",
      en: "Click a photo to enlarge. Medals, trophies per sport and the finishing stage.",
    },
  },
  photos: [
    ph(2, "Medali Annual Games 2026 berbahan plastik daur ulang", "Annual Games 2026 medal made from recycled plastic"),
    ph(4, "Medali berwarna emas dengan logo Annual Games 2026", "Gold-toned medal with the Annual Games 2026 logo"),
    ph(3, "Medali berwarna perunggu dari plastik daur ulang", "Bronze-toned medal from recycled plastic"),
    ph(1, "Tumpukan medali dengan pita bergaris", "A pile of medals with striped ribbons"),
    ph(8, "Medali perunggu di dalam boks sebelum dikirim", "Bronze medals in a box before delivery"),
    ph(9, "Dua piala biru bertema sepak bola", "Two blue football-themed trophies"),
    ph(10, "Piala sepak bola dipegang untuk menunjukkan ukuran", "Football trophy held to show its size"),
    ph(15, "Piala sepak bola dengan label juara", "Football trophies with placement labels"),
    ph(18, "Piala bertiang kayu setinggi lengan", "Trophy with a wooden stem, arm-high"),
    ph(19, "Piala juara tenis meja", "Table-tennis champion trophy"),
    ph(21, "Piala e-sport dengan ikon stik game", "E-sport trophy with a game controller icon"),
    ph(23, "Piala bola voli di antara piala cabang lain", "Volleyball trophy among the other sports"),
    ph(24, "Piala bola voli putri juara 1", "Women's volleyball 1st place trophy"),
    ph(29, "Piala bermotif emas untuk juara", "Gold-patterned champion trophy"),
    ph(62, "Piala basket dan bola voli berjajar", "Basketball and volleyball trophies in a row"),
    ph(65, "Piala basket juara 2 dengan motif oranye", "Basketball 2nd place trophy in orange pattern"),
    ph(69, "Piala bola voli juara 1 berwarna biru", "Blue volleyball 1st place trophy"),
    ph(76, "Piala bermotif biru dengan ikon pemain", "Blue-patterned trophy with a player icon"),
    ph(82, "Piala berwarna hijau-emas dengan ikon pemain", "Green-gold trophy with a player icon"),
    ph(86, "Piala sepak bola juara 2", "Football 2nd place trophy"),
  ],
  thanks: {
    label: { id: "Terima Kasih", en: "Thank You" },
    title: { id: "Terima kasih, PT Bintan Industrial Estate", en: "Thank you, PT Bintan Industrial Estate" },
    body: {
      id: "Terima kasih telah memilih penghargaan yang lahir dari sampah plastik untuk para juara Annual Games 2026.",
      en: "Thank you for choosing awards born from plastic waste for the Annual Games 2026 champions.",
    },
    closing: { id: "Dari sampah, jadi penghargaan.", en: "From waste, to recognition." },
  },
  card: {
    tag: { id: "Merchandise Acara", en: "Event Merchandise" },
    blurb: {
      id: "27 piala dan 285 medali Annual Games 2026 untuk PT BII, dari ±48 kg plastik dan kayu.",
      en: "27 trophies and 285 medals for PT BII's Annual Games 2026, from ±48 kg of plastic and wood.",
    },
    cta: { id: "Lihat studi kasus", en: "View Case Study" },
  },
  metaDescription: {
    id: "27 piala dan 285 medali Annual Games 2026 untuk PT Bintan Industrial Estate, dibuat Baciraro Creative dari plastik daur ulang dan kayu.",
    en: "27 trophies and 285 medals for PT Bintan Industrial Estate's Annual Games 2026, made by Baciraro Creative from recycled plastic and wood.",
  },
};

/* ───────────────────────── PIALA BANK INDONESIA ───────────────────────── */
const pialaBi: RecapProject = {
  slug: "piala-bank-indonesia",
  mediaSlug: "piala-bi",
  eyebrow: { id: "Project Recap · Piala Penghargaan", en: "Project Recap · Award Trophies" },
  title: {
    id: "9 piala lomba untuk Bank Indonesia",
    en: "9 competition trophies for Bank Indonesia",
  },
  description: {
    id: "Piala juara untuk lomba Tamborin, Yel-Yel, dan Vokal Grup — masing-masing juara 1 sampai 3 — dibuat dari plastik daur ulang.",
    en: "Champion trophies for the Tambourine, Cheer and Vocal Group contests — 1st to 3rd place each — made from recycled plastic.",
  },
  partner: { id: "Bank Indonesia", en: "Bank Indonesia" },
  date: { id: "November 2026", en: "November 2026" },
  hero: 2,
  heroCaption: {
    id: "Satu piala ditimbang: 241 gram plastik daur ulang, lengkap dengan logo BI.",
    en: "One trophy on the scale: 241 grams of recycled plastic, with the BI logo.",
  },
  impact: {
    value: "2.169",
    unit: { id: "gram sampah plastik", en: "grams of plastic waste" },
    description: {
      id: "9 piala × ±241 gram. Seluruh bahan berasal dari plastik bekas yang dipilah, dicacah, dan dipres ulang.",
      en: "9 trophies × ±241 grams. All material comes from used plastic that was sorted, shredded and re-pressed.",
    },
  },
  story: {
    label: { id: "Cerita Proyek", en: "Project Story" },
    title: { id: "Biru dan merah, dari sampah", en: "Blue and red, from waste" },
    aside: {
      id: "Kategori: Tamborin, Yel-Yel, Vokal Grup.",
      en: "Categories: Tambourine, Cheer, Vocal Group.",
    },
    paragraphs: [
      {
        id: "Badan piala memadukan logo Bank Indonesia, simbol merpati, dan lekuk merah yang menjulang di atas alas.",
        en: "The trophy body combines the Bank Indonesia logo, a dove symbol and a red curve rising above the base.",
      },
      {
        id: "Warna biru dan merahnya tidak berasal dari cat, tetapi dari campuran plastik bekas yang dipadukan sedemikian rupa.",
        en: "The blue and red aren't paint — they come from a blend of used plastic arranged on purpose.",
      },
    ],
  },
  gallery: {
    label: { id: "Dokumentasi", en: "Documentation" },
    title: { id: "Piala Bank Indonesia", en: "Bank Indonesia trophies" },
    desc: {
      id: "Tahap finishing dan penimbangan.",
      en: "The finishing and weighing stage.",
    },
  },
  photos: [
    ph(1, "Potongan piala siap dirakit di lantai", "Trophy cut-outs ready for assembly on the floor"),
    ph(2, "Piala Bank Indonesia di atas timbangan", "Bank Indonesia trophy on the scale"),
  ],
  thanks: {
    label: { id: "Terima Kasih", en: "Thank You" },
    title: { id: "Terima kasih, Bank Indonesia", en: "Thank you, Bank Indonesia" },
    body: {
      id: "Terima kasih telah memberi panggung bagi plastik daur ulang sebagai simbol penghargaan.",
      en: "Thank you for giving recycled plastic a stage as a symbol of recognition.",
    },
    closing: { id: "Dari sampah, jadi penghargaan.", en: "From waste, to recognition." },
  },
  card: {
    tag: { id: "Piala Penghargaan", en: "Award Trophies" },
    blurb: {
      id: "9 piala lomba Tamborin, Yel-Yel, dan Vokal Grup untuk Bank Indonesia — 2.169 gram plastik.",
      en: "9 trophies for Bank Indonesia's Tambourine, Cheer and Vocal Group contests — 2,169 grams of plastic.",
    },
    cta: { id: "Lihat studi kasus", en: "View Case Study" },
  },
  metaDescription: {
    id: "9 piala lomba untuk Bank Indonesia dari 2.169 gram plastik daur ulang, karya Baciraro Creative.",
    en: "9 contest trophies for Bank Indonesia from 2,169 grams of recycled plastic, by Baciraro Creative.",
  },
};

/* ───────────────────────── PIALA IDX / KSPM ───────────────────────── */
const idx: RecapProject = {
  slug: "piala-idx-kspm-mengajar",
  mediaSlug: "idx",
  eyebrow: { id: "Project Recap · Piala Penghargaan", en: "Project Recap · Award Trophy" },
  title: { id: "Piala IDX untuk KSPM Mengajar", en: "IDX trophy for KSPM Mengajar" },
  description: {
    id: "Piala berbahan plastik daur ulang untuk KSPM Mengajar, Galeri Investasi BEI Fakultas Ekonomi dan Bisnis UNIMA.",
    en: "A recycled-plastic trophy for KSPM Mengajar, the IDX Investment Gallery at UNIMA's Faculty of Economics and Business.",
  },
  partner: {
    id: "Galeri Investasi BEI FEB UNIMA",
    en: "IDX Investment Gallery, FEB UNIMA",
  },
  date: { id: "Oktober 2026", en: "October 2026" },
  hero: 5,
  heroCaption: {
    id: "Poster proyek: piala custom berlogo IDX dari 396 gram plastik daur ulang.",
    en: "Project poster: a custom IDX-logo trophy made from 396 grams of recycled plastic.",
  },
  impact: {
    value: "396",
    unit: { id: "gram sampah plastik", en: "grams of plastic waste" },
    description: {
      id: "Satu piala ini menyelamatkan 396 gram plastik dari tempat pembuangan.",
      en: "This single trophy rescued 396 grams of plastic from disposal.",
    },
    note: {
      id: "Dengan estimasi internal 1 gram setara 1 botol plastik, jumlah ini mewakili sekitar 396 botol plastik yang berpotensi menjadi nilai guna baru, alih-alih berakhir di tempat pembuangan akhir.",
      en: "Using our internal estimate of 1 gram per plastic bottle, this represents about 396 bottles that gain a new use instead of ending up in landfill.",
    },
  },
  story: {
    label: { id: "Cerita Proyek", en: "Project Story" },
    title: { id: "Apresiasi yang ramah lingkungan", en: "Recognition that is kind to the planet" },
    aside: { id: "Galeri Investasi BEI FEB UNIMA.", en: "IDX Investment Gallery, FEB UNIMA." },
    paragraphs: [
      {
        id: "Piala ini dipesan oleh KSPM Mengajar, Galeri Investasi BEI FEB UNIMA, dan dibuat dari plastik bekas: cara yang bertanggung jawab untuk memberi apresiasi.",
        en: "This trophy was commissioned by KSPM Mengajar, the IDX Investment Gallery at FEB UNIMA, and made from used plastic — a responsible way to say thank you.",
      },
      {
        id: "Temanya logo IDX: lingkaran merah dengan pola garis putih, dibuat dari papan plastik daur ulang yang dicampur warna merah, putih, dan sedikit kuning serta biru.",
        en: "The theme is the IDX logo: a red circle with white stripes, made from recycled plastic board blended in red, white and a little yellow and blue.",
      },
      {
        id: "Bagian piala dipotong dengan gergaji scroll dan dihaluskan, sehingga tepinya rapi dan siap diserahkan.",
        en: "Pieces of the trophy were cut with a scroll saw and smoothed, leaving clean edges ready for handover.",
      },
    ],
  },
  gallery: {
    label: { id: "Dokumentasi", en: "Documentation" },
    title: { id: "Proses dan hasil", en: "Process and result" },
    desc: { id: "Dari hasil pres, proses pemotongan, hingga penimbangan material.", en: "From the pressed result and cutting stage to weighing the material." },
  },
  photos: [
    ph(1, "Medali bundar merah dengan garis putih di atas kain bergaris", "Round red medallion with white stripes on a striped cloth"),
    ph(2, "Medali yang sama dari sudut berbeda", "The same medallion from another angle"),
    ph(3, "Memotong bagian piala dengan gergaji scroll", "Cutting a trophy part with a scroll saw"),
    ph(4, "Piala berlogo IDX berdiri di atas alas kayu dengan label KSPM Mengajar", "The IDX-logo trophy on a wooden base with the KSPM Mengajar label", "Piala berlogo IDX dengan label KSPM Mengajar 2026", "The IDX-logo trophy with the KSPM Mengajar 2026 label"),
    ph(5, "Poster Custom Trophy Project Logo IDX: 396 gram plastik, 1 custom trophy", "Custom Trophy Project poster for the IDX logo: 396 grams of plastic, 1 custom trophy", "Poster proyek: 396 gram plastik, 1 piala, 1 nilai baru", "Project poster: 396 grams of plastic, 1 trophy, 1 new value"),
    ph(6, "Tangan memegang medali merah hasil olahan 396 gram plastik", "A hand holding the red medallion made from 396 grams of plastic", "Hasil olahan 396 gram sampah plastik", "The result: 396 grams of plastic waste"),
    ph(7, "Timbangan digital menunjukkan 396 gram", "A digital scale reading 396 grams", "Material ditimbang: 396 gram", "The material weighed: 396 grams"),
  ],
  thanks: {
    label: { id: "Terima Kasih", en: "Thank You" },
    title: { id: "Terima kasih, KSPM Mengajar", en: "Thank you, KSPM Mengajar" },
    body: {
      id: "Terima kasih telah mempercayakan penghargaan kepada Baciraro Creative.",
      en: "Thank you for entrusting your award to Baciraro Creative.",
    },
    closing: { id: "Dari sampah, jadi penghargaan.", en: "From waste, to recognition." },
  },
  card: {
    tag: { id: "Piala Penghargaan", en: "Award Trophy" },
    blurb: {
      id: "Piala 396 gram untuk KSPM Mengajar, Galeri Investasi BEI FEB UNIMA.",
      en: "A 396-gram trophy for KSPM Mengajar, IDX Investment Gallery at FEB UNIMA.",
    },
    cta: { id: "Lihat studi kasus", en: "View Case Study" },
  },
  metaDescription: {
    id: "Piala dari 396 gram plastik daur ulang untuk KSPM Mengajar, Galeri Investasi BEI FEB UNIMA.",
    en: "A trophy from 396 grams of recycled plastic for KSPM Mengajar, IDX Investment Gallery, FEB UNIMA.",
  },
};

/* ───────────────────────── ATRIBUT KAWASARAN ───────────────────────── */
const kawasaran: RecapProject = {
  slug: "atribut-kawasaran",
  mediaSlug: "kawasaran",
  eyebrow: { id: "R&D Budaya · Dana Indonesiaraya", en: "Cultural R&D · Dana Indonesiaraya" },
  title: {
    id: "Atribut Kawasaran dari plastik daur ulang",
    en: "Kawasaran attributes from recycled plastic",
  },
  description: {
    id: "Eksplorasi material untuk atribut Kawasaran — tengkorak Yaki, paruh Burung Uak, dan taring Babirusa — yang menjembatani otentisitas budaya Minahasa dengan inovasi plastik daur ulang.",
    en: "A material exploration for Kawasaran attributes — the Yaki skull, Uak bird beak and Babirusa tusk — bridging Minahasan cultural authenticity and recycled-plastic innovation.",
  },
  partner: {
    id: "Dana Indonesiaraya · Kementerian Kebudayaan RI · LPDP",
    en: "Dana Indonesiaraya · Ministry of Culture RI · LPDP",
  },
  date: { id: "Juli – September 2026", en: "July – September 2026" },
  hero: 16,
  heroCaption: {
    id: "Tengkorak Yaki dari plastik daur ulang (warna-warni) bersanding dengan atribut tradisional pada busana penari.",
    en: "A recycled-plastic Yaki skull (multicolour) beside traditional attributes on the dancer's costume.",
  },
  story: {
    label: { id: "Cerita Riset", en: "Research Story" },
    title: {
      id: "Menjaga makna, mengganti material",
      en: "Keep the meaning, change the material",
    },
    aside: {
      id: "Bagian dari rangkaian Dialog Budaya Minahasa 2026.",
      en: "Part of the Minahasa Cultural Dialogue 2026 series.",
    },
    paragraphs: [
      {
        id: "Atribut Kawasaran secara tradisional memakai bahan alami yang kini makin terbatas. Riset ini bertanya: apakah plastik daur ulang bisa menggantikannya tanpa menghilangkan makna?",
        en: "Kawasaran attributes have traditionally used natural materials that are increasingly scarce. This research asks: can recycled plastic replace them without losing meaning?",
      },
      {
        id: "Tahapannya dimulai dari pengenalan atribut dan batas penggunaan bahan tradisional, dialog budaya bersama tokoh adat, wawancara dengan Tonaas Rinto Taroreh, prototipe 3D, hingga eksplorasi material daur ulang.",
        en: "It began with an introduction to the attributes and the limits of traditional materials, followed by a cultural dialogue with traditional leaders, an interview with Tonaas Rinto Taroreh, 3D prototypes, and recycled-material exploration.",
      },
      {
        id: "Hasil awalnya adalah Tengkorak Yaki dan Paruh Burung Uak dari plastik daur ulang yang dikenakan langsung oleh penari Kawasaran.",
        en: "The first results are a Yaki skull and an Uak bird beak from recycled plastic, worn by a Kawasaran dancer.",
      },
    ],
    quote: {
      id: "Budaya tetap hidup ketika bahannya bisa terus diperbarui.",
      en: "Culture stays alive when its materials can be renewed.",
    },
  },
  gallery: {
    label: { id: "Dokumentasi", en: "Documentation" },
    title: { id: "Atribut dikenakan penari Kawasaran", en: "Attributes worn by a Kawasaran dancer" },
    desc: {
      id: "Termasuk penampilan Kawasaran pada Grand Launching Desa Wisata Tumaluntung.",
      en: "Including the Kawasaran performance at the Tumaluntung Tourism Village Grand Launching.",
    },
  },
  photos: [
    ph(2, "Penari Kawasaran tampil di bawah spanduk Grand Launching", "Kawasaran dancers performing under the Grand Launching banner"),
    ph(3, "Pembawa acara dan penari Kawasaran di Grand Launching", "Host and Kawasaran dancers at the Grand Launching"),
    ph(1, "Dada busana Kawasaran dengan tengkorak plastik daur ulang", "Kawasaran costume chest with a recycled-plastic skull"),
    ph(7, "Tengkorak Yaki dari plastik daur ulang, tampak dekat", "Recycled-plastic Yaki skull, close-up"),
    ph(8, "Tengkorak plastik warna-warni pada busana merah", "Multicolour plastic skull on the red costume"),
    ph(4, "Atribut tengkorak tradisional pada busana", "Traditional skull attributes on the costume"),
    ph(9, "Penari Kawasaran berhias bulu hitam", "Kawasaran dancer with black feather headdress"),
    ph(10, "Penari berbusana merah di tengah pepohonan", "Dancer in red among the trees"),
    ph(12, "Penari menatap ke samping dengan paruh di ikat kepala", "Dancer looking aside with a beak on the headband"),
    ph(15, "Penari Kawasaran, tampak depan", "Kawasaran dancer, front view"),
    ph(16, "Tengkorak plastik di antara atribut tradisional", "Plastic skull among traditional attributes"),
    ph(18, "Detail kalung atribut dan tengkorak daur ulang", "Detail of the attribute necklace and recycled skull"),
    ph(20, "Penari di sore hari dengan latar waruga", "Dancer in the afternoon with waruga in the background"),
    ph(23, "Penari Kawasaran dengan latar pepohonan", "Kawasaran dancer against the trees"),
  ],
  thanks: {
    label: { id: "Terima Kasih", en: "Thank You" },
    title: { id: "Terima kasih kepada para pendukung", en: "Thanks to our supporters" },
    body: {
      id: "Program ini didukung Dana Indonesiaraya, Kementerian Kebudayaan RI, dan LPDP, serta para tokoh adat yang berbagi pengetahuan.",
      en: "This programme is supported by Dana Indonesiaraya, the Ministry of Culture RI and LPDP, and by the traditional leaders who shared their knowledge.",
    },
    closing: { id: "Budaya, diperbarui.", en: "Culture, renewed." },
  },
  card: {
    tag: { id: "R&D Budaya", en: "Cultural R&D" },
    blurb: {
      id: "Tengkorak Yaki dan paruh Burung Uak dari plastik daur ulang untuk atribut Kawasaran.",
      en: "A Yaki skull and Uak bird beak from recycled plastic for Kawasaran attributes.",
    },
    cta: { id: "Lihat hasil riset", en: "View the research" },
  },
  metaDescription: {
    id: "Eksplorasi atribut Kawasaran dari plastik daur ulang — Tengkorak Yaki dan Paruh Burung Uak — bersama Dana Indonesiaraya, Kementerian Kebudayaan RI, dan LPDP.",
    en: "Kawasaran attributes from recycled plastic — a Yaki skull and Uak bird beak — with Dana Indonesiaraya, the Ministry of Culture RI and LPDP.",
  },
};

/* ───────────────────────── TJF LESS WASTE EVENT ───────────────────────── */
const tjf: RecapProject = {
  slug: "tjf-less-waste-event",
  mediaSlug: "tjf-less-waste",
  eyebrow: { id: "Event · Pengelolaan Sampah", en: "Event · Waste Management" },
  title: { id: "Less Waste Event di Tomohon Jazz Festival 2026", en: "Less Waste Event at Tomohon Jazz Festival 2026" },
  description: {
    id: "Bersama Masarang Foundation, tim relawan memilah dan menimbang sampah botol plastik di sepanjang festival agar sampah event tidak berakhir sebagai residu.",
    en: "With Masarang Foundation, a volunteer team sorted and weighed plastic bottle waste throughout the festival so event waste doesn't end up as residue.",
  },
  partner: { id: "Masarang Foundation", en: "Masarang Foundation" },
  date: { id: "Oktober 2026", en: "October 2026" },
  hero: 9,
  heroCaption: {
    id: "Tim relawan berseragam rompi hijau di area festival.",
    en: "The volunteer team in green vests at the festival grounds.",
  },
  story: {
    label: { id: "Cerita Event", en: "Event Story" },
    title: { id: "Festival jazz yang berusaha tidak meninggalkan sampah", en: "A jazz festival that tries to leave no trash behind" },
    aside: {
      id: "Tomohon Jazz Festival digelar di kawasan sejuk Tomohon.",
      en: "Tomohon Jazz Festival takes place in the cool highlands of Tomohon.",
    },
    paragraphs: [
      {
        id: "Festival besar menghasilkan banyak botol dan gelas sekali pakai. Tim Less Waste menempatkan stasiun pemilahan di area festival dan berkeliling mengambil botol dari tempat sampah.",
        en: "A big festival produces a lot of single-use bottles and cups. The Less Waste team set up sorting stations on the grounds and walked the site collecting bottles from the bins.",
      },
      {
        id: "Botol dipilah per jenis, tutupnya dilepas, lalu ditimbang agar jumlah sampah yang diselamatkan tercatat jelas.",
        en: "Bottles were sorted by type, caps removed, then weighed so the amount of waste rescued was clearly recorded.",
      },
    ],
  },
  process: {
    label: { id: "Alur Kerja", en: "Workflow" },
    title: { id: "Dari tempat sampah ke timbangan", en: "From the bin to the scale" },
    steps: [
      {
        label: { id: "Kumpulkan", en: "Collect" },
        title: { id: "Patroli area festival", en: "Patrolling the grounds" },
        body: {
          id: "Relawan berkeliling membawa penjepit dan karung untuk mengambil botol dan gelas.",
          en: "Volunteers walked the site with tongs and sacks to pick up bottles and cups.",
        },
      },
      {
        label: { id: "Pilah", en: "Sort" },
        title: { id: "Stasiun pemilahan", en: "Sorting stations" },
        body: {
          id: "Botol dilepas tutupnya, lalu dipisah per jenis ke dalam karung berbeda.",
          en: "Bottle caps were removed, then bottles were separated by type into different sacks.",
        },
      },
      {
        label: { id: "Timbang", en: "Weigh" },
        title: { id: "Catat hasilnya", en: "Record the result" },
        body: {
          id: "Setiap karung ditimbang supaya jumlah sampah yang terselamatkan bisa dilaporkan.",
          en: "Each sack was weighed so the amount of waste rescued could be reported.",
        },
      },
    ],
  },
  gallery: {
    label: { id: "Dokumentasi", en: "Documentation" },
    title: { id: "Di balik layar Less Waste Event", en: "Behind the scenes of the Less Waste Event" },
    desc: {
      id: "Klik foto untuk memperbesar.",
      en: "Click a photo to enlarge.",
    },
  },
  photos: [
    ph(9, "Tim relawan berpose bersama di area festival", "The volunteer team posing together at the festival"),
    ph(3, "Relawan duduk memilah botol di rumput", "Volunteers sorting bottles on the grass"),
    ph(4, "Relawan memilah botol di rumput", "Volunteers sorting bottles on the lawn"),
    ph(5, "Pemilahan botol bersama-sama", "Sorting bottles together"),
    ph(7, "Relawan memilah sampah di dalam tenda", "Volunteers sorting waste inside the tent"),
    ph(11, "Relawan membongkar wadah besar di stasiun pemilahan", "Volunteers handling a large container at the sorting station"),
    ph(14, "Relawan bekerja di atas terpal putih", "Volunteers working on a white tarp"),
    ph(15, "Relawan berkeliling mengambil sampah di jalan festival", "Volunteers walking the festival road collecting waste"),
    ph(17, "Relawan berompi memilah botol", "Vested volunteers sorting bottles"),
    ph(6, "Foto bersama tim saat malam hari", "Team photo in the evening"),
    ph(20, "Tim berpose ceria di panggung terbuka malam hari", "The team posing cheerfully on an open stage at night"),
    ph(33, "Relawan memilah sampah di rumput", "Volunteers sorting waste on the grass"),
    ph(36, "Timbangan digital menimbang karung botol", "Digital scale weighing a sack of bottles"),
    ph(38, "Foto bersama tim di bawah lampu tenda", "Team photo under the tent lights"),
    ph(42, "Botol air mineral yang akan dipilah", "A mineral-water bottle about to be sorted"),
    ph(46, "Botol diremukkan sebelum dimasukkan karung", "A bottle being crushed before going into the sack"),
    ph(49, "Tabung pengumpul botol berjaring", "Mesh bottle-collection tubes"),
    ph(52, "Empat tabung pengumpul di lapangan rumput", "Four collection tubes on the lawn"),
    ph(56, "Memasukkan botol ke tabung pengumpul, tampak dari atas", "Dropping a bottle into a collection tube, seen from above"),
    ph(76, "Relawan berjalan di depan gerbang festival", "Volunteers walking in front of the festival gate"),
    ph(80, "Tangan memilah botol plastik bekas", "Hands sorting used plastic bottles"),
    ph(89, "Foto bersama seluruh tim di lapangan", "Group photo of the whole team on the field"),
    ph(125, "Relawan di depan karya seni pameran festival", "A volunteer in front of festival exhibition art"),
    ph(129, "Memilah botol di rumput bersama relawan lain", "Sorting bottles on the grass with other volunteers"),
    ph(138, "Karung merah dan kuning berisi botol terpilah", "Red and yellow sacks of sorted bottles"),
    ph(142, "Tabung pengumpul botol di rumput", "A bottle-collection tube on the lawn"),
  ],
  thanks: {
    label: { id: "Terima Kasih", en: "Thank You" },
    title: { id: "Terima kasih, Masarang Foundation dan para relawan", en: "Thank you, Masarang Foundation and the volunteers" },
    body: {
      id: "Terima kasih kepada seluruh relawan yang rela memilah sampah di tengah festival.",
      en: "Thank you to every volunteer who sorted waste in the middle of the festival.",
    },
    closing: { id: "Less waste, more music.", en: "Less waste, more music." },
  },
  card: {
    tag: { id: "Event", en: "Event" },
    blurb: {
      id: "Pemilahan dan penimbangan sampah botol bersama Masarang Foundation di Tomohon Jazz Festival 2026.",
      en: "Sorting and weighing bottle waste with Masarang Foundation at Tomohon Jazz Festival 2026.",
    },
    cta: { id: "Lihat dokumentasi", en: "View documentation" },
  },
  metaDescription: {
    id: "Less Waste Event di Tomohon Jazz Festival 2026 bersama Masarang Foundation: relawan memilah dan menimbang sampah botol plastik.",
    en: "The Less Waste Event at Tomohon Jazz Festival 2026 with Masarang Foundation: volunteers sorting and weighing plastic bottle waste.",
  },
};

/* ───────────────────────── WORKSHOP UNIMA ───────────────────────── */
const workshop: RecapProject = {
  slug: "workshop-unima-kkn-satgas",
  mediaSlug: "workshop-unima",
  eyebrow: { id: "Workshop · Kolaborasi Kampus", en: "Workshop · Campus Collaboration" },
  title: {
    id: "Workshop daur ulang plastik bersama KKN SATGAS FIPP UNIMA",
    en: "Plastic recycling workshop with KKN SATGAS FIPP UNIMA",
  },
  description: {
    id: "Ratusan mahasiswa Fakultas Ilmu Pendidikan dan Psikologi UNIMA belajar mengolah plastik bekas menjadi produk lewat demo cetak panas langsung dari tim Baciraro.",
    en: "Hundreds of students from UNIMA's Faculty of Education and Psychology learned to turn used plastic into products through a live heat-press demo by the Baciraro team.",
  },
  partner: { id: "UNIMA · KKN SATGAS FIPP Kelompok 3", en: "UNIMA · KKN SATGAS FIPP Group 3" },
  date: { id: "November 2026", en: "November 2026" },
  hero: 8,
  heroCaption: {
    id: "Demo mesin pres panas di depan peserta, dengan contoh produk plastik daur ulang di meja.",
    en: "A heat-press demo in front of participants, with sample recycled-plastic products on the table.",
  },
  story: {
    label: { id: "Cerita Workshop", en: "Workshop Story" },
    title: { id: "Dari ruang kuliah ke meja kerja plastik", en: "From lecture hall to plastic workbench" },
    aside: { id: "Digelar di aula Fakultas Ilmu Pendidikan dan Psikologi UNIMA.", en: "Held in the hall of UNIMA's Faculty of Education and Psychology." },
    paragraphs: [
      {
        id: "Workshop dibuka dengan pemaparan tentang masalah sampah plastik dan peluang ekonomi sirkular, disusul demo langsung proses pengolahan.",
        en: "The workshop opened with a talk on the plastic-waste problem and circular-economy opportunities, followed by a live demo of the process.",
      },
      {
        id: "Peserta melihat bagaimana serpihan plastik berwarna dipres panas menjadi papan, lalu dipotong dan dibentuk menjadi suvenir dan perlengkapan.",
        en: "Participants watched coloured plastic flakes get heat-pressed into boards, then cut and shaped into souvenirs and accessories.",
      },
      {
        id: "Di akhir sesi, ada penyerahan piagam kepada pemateri.",
        en: "At the end of the session, a certificate was handed over to the speaker.",
      },
    ],
  },
  gallery: {
    label: { id: "Dokumentasi", en: "Documentation" },
    title: { id: "Suasana workshop", en: "Inside the workshop" },
    desc: { id: "Klik foto untuk memperbesar.", en: "Click a photo to enlarge." },
  },
  photos: [
    ph(8, "Demo mesin pres panas di depan peserta", "Heat-press demo in front of participants"),
    ph(1, "Mahasiswa berkumpul di tangga gedung fakultas", "Students gathered on the faculty building steps"),
    ph(17, "Meja berisi contoh produk plastik daur ulang", "A table of recycled-plastic sample products"),
    ph(84, "Wadah serpihan plastik berbagai warna", "Tubs of coloured plastic flakes"),
    ph(62, "Pemateri menjelaskan kepada peserta", "The speaker addressing participants"),
    ph(65, "Pemaparan materi dengan layar proyektor", "Presentation with a projector screen"),
    ph(77, "Perwakilan kampus menyampaikan sambutan", "A campus representative giving remarks"),
    ph(71, "Peserta mengikuti workshop di aula", "Participants attending the workshop in the hall"),
    ph(90, "Mencetak pola dengan mesin pres panas", "Pressing a pattern with the heat press"),
    ph(123, "Peserta memegang contoh produk plastik daur ulang", "Participants handling recycled-plastic samples"),
    ph(125, "Papan plastik bermotif hasil pres", "Patterned plastic boards from the press"),
    ph(127, "Peserta mencoba mesin pres", "A participant trying out the press"),
    ph(135, "Penyerahan piagam kepada pemateri", "Certificate handover to the speaker"),
    ph(139, "Foto bersama seluruh peserta dan panitia", "Group photo of all participants and organisers"),
    ph(150, "Foto bersama peserta di akhir acara", "Group photo at the end of the event"),
  ],
  thanks: {
    label: { id: "Terima Kasih", en: "Thank You" },
    title: { id: "Terima kasih, KKN SATGAS FIPP UNIMA", en: "Thank you, KKN SATGAS FIPP UNIMA" },
    body: {
      id: "Terima kasih kepada mahasiswa, panitia, dan pihak fakultas yang membuka ruang belajar tentang plastik daur ulang.",
      en: "Thank you to the students, organisers and faculty who opened a space to learn about recycled plastic.",
    },
    closing: { id: "Belajar bersama, berkarya bersama.", en: "Learning together, making together." },
  },
  card: {
    tag: { id: "Workshop", en: "Workshop" },
    blurb: {
      id: "Demo cetak panas plastik daur ulang untuk mahasiswa FIPP UNIMA bersama KKN SATGAS Kelompok 3.",
      en: "A recycled-plastic heat-press demo for FIPP UNIMA students with KKN SATGAS Group 3.",
    },
    cta: { id: "Lihat dokumentasi", en: "View documentation" },
  },
  metaDescription: {
    id: "Workshop daur ulang plastik untuk mahasiswa FIPP UNIMA bersama KKN SATGAS Kelompok 3 dan tim Baciraro.",
    en: "A plastic-recycling workshop for FIPP UNIMA students with KKN SATGAS Group 3 and the Baciraro team.",
  },
};


/* ───────────────────────── PENSIL 2026 (foto lokal di /public/creative) ───────────────────────── */
const pensil: RecapProject = {
  slug: "pensil-2026",
  mediaSlug: "pensil-2026",
  files: [
    "/creative/pensil-2026/01-proses-desain.jpeg",
    "/creative/pensil-2026/02-piala-bintang-emas.jpeg",
    "/creative/pensil-2026/03-material-2904-gram.jpeg",
    "/creative/pensil-2026/04-piala-bintang-merah.jpeg",
    "/creative/pensil-2026/05-piala-bintang-oranye.jpeg",
    "/creative/pensil-2026/06-piala-bintang-multiwarna.jpeg",
    "/creative/pensil-2026/07-piala-bintang-putih.jpeg",
    "/creative/pensil-2026/08-deretan-piala.jpeg",
    "/creative/pensil-2026/09-penyerahan-piala.jpeg",
  ],
  eyebrow: { id: "Project Recap 2026", en: "Project Recap 2026" },
  title: { id: "Dari sampah plastik menjadi simbol apresiasi.", en: "From plastic waste to a symbol of appreciation." },
  description: { id: "BACIRARO Creative memproduksi piala penghargaan berbahan plastik daur ulang untuk PENSIL (Pentas Seni Islam) 2026 bersama ROHIS SMA Negeri 1 Manado.", en: "BACIRARO Creative produced award trophies made from recycled plastic for PENSIL (Pentas Seni Islam) 2026 with ROHIS SMA Negeri 1 Manado." },
  partner: { id: "ROHIS SMA Negeri 1 Manado × Baciraro Creative", en: "ROHIS SMA Negeri 1 Manado × Baciraro Creative" },
  date: { id: "12 Oktober 2026", en: "12 October 2026" },
  hero: 9,
  heroCaption: { id: "Perwakilan ROHIS SMA Negeri 1 Manado menerima piala penghargaan PENSIL 2026 di Studio BACIRARO Creative.", en: "Representatives of ROHIS SMA Negeri 1 Manado receiving the PENSIL 2026 award trophies at the BACIRARO Creative Studio." },
  impact: {
    value: "2.904",
    unit: { id: "gram plastik terselamatkan", en: "grams of plastic rescued" },
    description: { id: "Sampah plastik siap daur ulang diolah menjadi piala yang memiliki fungsi dan nilai baru.", en: "Recyclable plastic waste turned into trophies with a new function and value." },
    note: { id: "Setara 2,904 kg material yang kembali memiliki fungsi dan nilai baru.", en: "Equivalent to 2.904 kg of material given function and value again." },
  },
  story: {
    label: { id: "Cerita proyek", en: "Project story" },
    title: { id: "Sampah yang kembali memiliki fungsi.", en: "Waste with a purpose again." },
    aside: { id: "PENSIL 2026, piala penghargaan dari plastik daur ulang untuk ROHIS SMA Negeri 1 Manado.", en: "PENSIL 2026, recycled plastic award trophies for ROHIS SMA Negeri 1 Manado." },
    paragraphs: [
      { id: "BACIRARO Creative berkesempatan memproduksi piala penghargaan berbahan plastik daur ulang untuk kegiatan PENSIL (Pentas Seni Islam) 2026 bersama ROHIS SMA Negeri 1 Manado.", en: "BACIRARO Creative was entrusted to produce award trophies made from recycled plastic for PENSIL (Pentas Seni Islam) 2026 with ROHIS SMA Negeri 1 Manado." },
      { id: "Melalui proyek ini, kami berhasil mengolah 2.904 gram (2,904 kg) sampah plastik siap daur ulang menjadi piala yang memiliki fungsi dan nilai baru.", en: "Through this project, we processed 2.904 grams (2.904 kg) of recyclable plastic waste into trophies with a new function and value." },
      { id: "Mulai dari proses desain, produksi, hingga penyerahan piala pada 12 Oktober 2026, setiap tahap menjadi bagian dari perjalanan kami dalam mengubah sampah menjadi karya yang bermakna.", en: "From design and production to the handover on 12 October 2026, every stage became part of our journey to turn waste into meaningful work." },
    ],
    quote: { id: "2.904 gram plastic waste. A new purpose.", en: "2.904 grams of plastic waste. A new purpose." },
  },
  process: {
    label: { id: "Proses", en: "Process" },
    title: { id: "Desain, produksi, penyerahan.", en: "Design, production, handover." },
    steps: [
      { label: { id: "Desain", en: "Design" }, title: { id: "Brief dan visualisasi", en: "Brief and visualization" }, body: { id: "Proses dimulai dari brief dan referensi klien, lalu dilanjutkan dengan visualisasi desain untuk menyesuaikan bentuk piala dengan karakter material plastik daur ulang.", en: "The process began with the client's brief and references, followed by design visualization to align the trophy form with the character of the recycled plastic material." } },
      { label: { id: "Produksi", en: "Production" }, title: { id: "Material menjadi bentuk", en: "Material becomes form" }, body: { id: "Sampah plastik yang telah diproses menjadi papan material daur ulang kemudian dibentuk dan dirakit sesuai desain. Tahap akhir finishing memastikan setiap piala siap digunakan.", en: "Plastic waste processed into recycled material sheets was cut, shaped, and assembled according to the design. A final finishing stage ensured every trophy was ready to use." } },
      { label: { id: "Penyerahan", en: "Handover" }, title: { id: "Piala sampai ke tangan ROHIS", en: "Trophies reach ROHIS" }, body: { id: "Pada 12 Oktober 2026, perwakilan ROHIS SMA Negeri 1 Manado mengambil piala langsung di Studio BACIRARO Creative, menandai selesainya proses produksi dan penyerahan pesanan.", en: "On 12 October 2026, representatives of ROHIS SMA Negeri 1 Manado collected the trophies directly from the BACIRARO Creative Studio, marking the completion of production and handover." } },
    ],
  },
  gallery: { label: { id: "Dokumentasi", en: "Documentation" }, title: { id: "Sembilan momen dari proyek PENSIL 2026.", en: "Nine moments from the PENSIL 2026 project." }, desc: { id: "Dari proses desain hingga penyerahan, setiap tahap terdokumentasi dalam rangkaian foto ini.", en: "From the design process to the handover, every stage is documented in this photo series." } },
  photos: [
    { n: 1, alt: { id: "Lembar visualisasi desain piala PENSIL 2026 dari plastik daur ulang", en: "Design visualization sheet for PENSIL 2026 trophies made from recycled plastic" }, caption: { id: "Visualisasi desain piala", en: "Trophy design visualization" } },
    { n: 2, alt: { id: "Tangan memegang piala dengan bintang emas dari plastik daur ulang", en: "Hand holding a trophy with a gold star made from recycled plastic" }, caption: { id: "Piala bintang emas", en: "Gold star trophy" } },
    { n: 3, alt: { id: "Timbangan digital menunjukkan 2.904 gram material plastik daur ulang", en: "Digital scale showing 2.904 grams of recycled plastic material" }, caption: { id: "Material ditimbang 2.904 gram", en: "Material weighed at 2.904 grams" } },
    { n: 4, alt: { id: "Tangan memegang piala dengan bintang merah dari plastik daur ulang", en: "Hand holding a trophy with a red star made from recycled plastic" }, caption: { id: "Piala bintang merah", en: "Red star trophy" } },
    { n: 5, alt: { id: "Tangan memegang piala dengan bintang oranye dari plastik daur ulang", en: "Hand holding a trophy with an orange star made from recycled plastic" }, caption: { id: "Piala bintang oranye", en: "Orange star trophy" } },
    { n: 6, alt: { id: "Tangan memegang piala dengan bintang multiwarna dari plastik daur ulang", en: "Hand holding a trophy with a multicolor star made from recycled plastic" }, caption: { id: "Piala bintang multiwarna", en: "Multicolor star trophy" } },
    { n: 7, alt: { id: "Tangan memegang piala dengan bintang putih dari plastik daur ulang", en: "Hand holding a trophy with a white star made from recycled plastic" }, caption: { id: "Piala bintang putih", en: "White star trophy" } },
    { n: 8, alt: { id: "Deretan piala penghargaan PENSIL 2026 dengan bintang warna-warni", en: "Row of PENSIL 2026 award trophies with colorful stars" }, caption: { id: "Deretan piala penghargaan", en: "Line-up of award trophies" } },
    { n: 9, alt: { id: "Perwakilan ROHIS SMA Negeri 1 Manado berfoto bersama tim Baciraro Creative saat penyerahan piala", en: "Representatives of ROHIS SMA Negeri 1 Manado with the Baciraro Creative team during the trophy handover" }, caption: { id: "Penyerahan piala, 12 Oktober 2026", en: "Trophy handover, 12 October 2026" } },
  ],
  thanks: {
    label: { id: "Terima kasih", en: "Thank you" },
    title: { id: "Terima kasih, ROHIS SMA Negeri 1 Manado.", en: "Thank you, ROHIS SMA Negeri 1 Manado." },
    body: { id: "Atas kepercayaan dan kolaborasinya dalam menghadirkan piala penghargaan dari plastik daur ulang untuk PENSIL 2026.", en: "For the trust and collaboration in bringing recycled plastic award trophies to PENSIL 2026." },
    closing: { id: "From Waste to Worth.", en: "From Waste to Worth." },
  },
  card: {
    tag: { id: "Piala", en: "Trophy" },
    blurb: { id: "Dari sampah plastik menjadi simbol apresiasi. Piala penghargaan berbahan plastik daur ulang untuk PENSIL 2026 bersama ROHIS SMA Negeri 1 Manado.", en: "From plastic waste to a symbol of appreciation. Award trophies made from recycled plastic for PENSIL 2026 with ROHIS SMA Negeri 1 Manado." },
    cta: { id: "Lihat Project Recap", en: "View Project Recap" },
  },
  metaDescription: { id: "BACIRARO Creative memproduksi piala penghargaan berbahan plastik daur ulang untuk PENSIL (Pentas Seni Islam) 2026 bersama ROHIS SMA Negeri 1 Manado.", en: "BACIRARO Creative produced award trophies made from recycled plastic for PENSIL (Pentas Seni Islam) 2026 with ROHIS SMA Negeri 1 Manado." },
};

/* ───────────────────────── PLASTIC WASTE BIN (foto lokal di /public/creative) ───────────────────────── */
const wasteBin: RecapProject = {
  slug: "plastic-waste-bin",
  mediaSlug: "plastic-waste-bin",
  files: [
    "/creative/plastic-waste-bin/01-prototype.jpeg",
    "/creative/plastic-waste-bin/02-tim-produksi.jpeg",
    "/creative/plastic-waste-bin/03-tatakan-plastik.jpeg",
    "/creative/plastic-waste-bin/04-penutup-plastik.jpeg",
    "/creative/plastic-waste-bin/05-kait-penutup.jpeg",
    "/creative/plastic-waste-bin/06-alasan-proyek.jpeg",
  ],
  eyebrow: { id: "Project Recap · Waste Infrastructure", en: "Project Recap · Waste Infrastructure" },
  title: { id: "Memilah sampah bisa dimulai dari langkah sederhana!", en: "Sorting waste can start with a simple step!" },
  description: { id: "BACIRARO Creative menghadirkan tempat sampah khusus plastik daur ulang sebagai upaya membangun kebiasaan memilah sampah sejak dari sumbernya.", en: "BACIRARO Creative presents a dedicated recycled-plastic waste bin as an effort to build the habit of sorting waste at its source." },
  partner: { id: "Tempat sampah khusus plastik", en: "Dedicated plastic waste bin" },
  date: { id: "Prototipe 2026", en: "2026 prototype" },
  hero: 1,
  heroCaption: { id: "Prototipe tempat sampah plastik Baciraro Creative: rangka kawat besi dengan alas dan penutup dari plastik daur ulang.", en: "Baciraro Creative's plastic waste bin prototype: an iron mesh frame with a recycled plastic base and lid." },
  story: {
    label: { id: "Cerita proyek", en: "Project story" },
    title: { id: "Terlihat, sehingga lebih mudah dipilah.", en: "Visible, and therefore easier to sort." },
    aside: { id: "Inisiatif tempat sampah khusus plastik daur ulang dari Baciraro Creative.", en: "A dedicated recycled-plastic waste bin initiative from Baciraro Creative." },
    paragraphs: [
      { id: "Berangkat dari permasalahan sampah yang masih sering tercampur dalam satu tempat, Baciraro Creative menghadirkan sebuah inisiatif sederhana: tempat sampah khusus plastik daur ulang sebagai upaya membangun kebiasaan memilah sampah sejak dari sumbernya.", en: "Starting from the problem of waste that is still often mixed in a single bin, Baciraro Creative presents a simple initiative: a dedicated recycled-plastic waste bin that helps build the habit of sorting waste at its source." },
      { id: "Dirancang dengan menggunakan rangka kawat besi atau ram, tempat sampah ini memungkinkan isi di dalamnya terlihat dari luar. Transparansi tersebut bukan sekadar pilihan desain, tetapi juga menjadi bagian dari pendekatan edukasi agar masyarakat lebih mudah mengenali fungsi tempat sampah dan memahami pentingnya memisahkan sampah plastik dari jenis sampah lainnya.", en: "Designed with an iron mesh frame, or ram, the bin keeps its contents visible from the outside. That transparency is not merely a design choice, but also part of an educational approach that helps people recognize the bin's function and understand why plastic waste should be separated from other types of waste." },
      { id: "Alas dan penutup dibuat dari plastik daur ulang. Sebuah kait khusus ditambahkan agar penutup dapat dibuka dan ditutup dengan lebih mudah, sehingga proses pengambilan serta pemilahan sampah tidak menjadi hambatan.", en: "The base and lid are made from recycled plastic. A dedicated hook was added so the lid can be opened and closed more easily, keeping the process of collecting and sorting waste from becoming a barrier." },
    ],
    quote: { id: "Kebiasaan kecil, dampak besar.", en: "Small habits, big impact." },
  },
  process: {
    label: { id: "Proses", en: "Process" },
    title: { id: "Rangka, detail, lalu kebiasaan.", en: "Frame, detail, then habit." },
    steps: [
      { label: { id: "Konstruksi", en: "Construction" }, title: { id: "Rangka menjadi bentuk", en: "The frame takes shape" }, body: { id: "Badan tempat sampah dibentuk dari rangka kawat besi atau ram. Struktur ini menjadi dasar sebelum alas dan penutup dari plastik daur ulang dipasang.", en: "The bin body is formed from an iron mesh frame, or ram. This structure becomes the foundation before the recycled plastic base and lid are attached." } },
      { label: { id: "Detail", en: "Detail" }, title: { id: "Penutup yang dapat dibuka", en: "A lid that can be opened" }, body: { id: "Penutup dari plastik daur ulang dirancang dapat dibuka. Kait khusus dibuat karena prototipe awal sulit ditutup, sehingga proses pengambilan dan pemilahan sampah menjadi lebih mudah.", en: "The recycled plastic lid is designed to be opened. A dedicated hook was created because the early prototype was difficult to close, making waste collection and sorting easier." } },
      { label: { id: "Penggunaan", en: "Use" }, title: { id: "Isi terlihat, kebiasaan terbentuk", en: "Visible contents, forming habits" }, body: { id: "Desain terbuka membuat isi tempat sampah terlihat dari luar dan menjadi pengingat visual untuk memisahkan plastik dari jenis sampah lain.", en: "The open design keeps the bin's contents visible from the outside and acts as a visual reminder to separate plastic from other types of waste." } },
    ],
  },
  gallery: { label: { id: "Dokumentasi", en: "Documentation" }, title: { id: "Enam momen dari project Plastic Waste Bin.", en: "Six moments from the Plastic Waste Bin project." }, desc: { id: "Dari prototipe hingga detail penutup, setiap tahap terdokumentasi dalam rangkaian gambar ini.", en: "From the prototype to the lid details, every stage is documented in this image series." } },
  photos: [
    { n: 1, alt: { id: "Poster prototipe tempat sampah plastik Baciraro Creative dengan keterangan rangka kawat besi, penutup, tatakan, dan kait dari plastik daur ulang", en: "Baciraro Creative plastic waste bin prototype poster labeling the iron mesh frame, lid, base, and recycled plastic hook" }, caption: { id: "Prototipe tempat sampah", en: "Waste bin prototype" } },
    { n: 2, alt: { id: "Dua anggota tim Baciraro Creative menunjukkan komponen penutup dan alas tempat sampah dari plastik daur ulang", en: "Two Baciraro Creative team members showing the recycled plastic lid and base components" }, caption: { id: "Tim produksi Baciraro Creative", en: "Baciraro Creative production team" } },
    { n: 3, alt: { id: "Tempat sampah dengan badan rangka kawat besi dan tatakan plastik daur ulang berwarna biru", en: "Waste bin with an iron mesh body and a blue recycled plastic base" }, caption: { id: "Tatakan dari plastik daur ulang", en: "Recycled plastic base" } },
    { n: 4, alt: { id: "Tangan memegang penutup tempat sampah berbentuk cincin dari plastik daur ulang berwarna biru", en: "Hand holding a ring-shaped waste bin lid made from blue recycled plastic" }, caption: { id: "Penutup yang dapat dibuka", en: "A lid that can be opened" } },
    { n: 5, alt: { id: "Detail kait penutup tempat sampah dari plastik daur ulang pada badan rangka kawat besi", en: "Detail of the recycled plastic waste bin lid hook on the iron mesh body" }, caption: { id: "Kait penutup dari plastik daur ulang", en: "Recycled plastic lid hook" } },
    { n: 6, alt: { id: "Poster alasan project tempat sampah plastik daur ulang Baciraro Creative dengan ilustrasi tempat sampah", en: "Baciraro Creative recycled plastic waste bin project rationale poster with a bin illustration" }, caption: { id: "Alasan di balik desain terbuka", en: "The reason behind the open design" } },
  ],
  thanks: {
    label: { id: "Penutup", en: "Closing" },
    title: { id: "Kebiasaan kecil, dampak besar.", en: "Small habits, big impact." },
    body: { id: "Pengelolaan sampah yang baik dimulai dari kebiasaan kecil yang dilakukan bersama. Terima kasih sudah membaca perjalanan project ini.", en: "Good waste management starts with small habits practiced together. Thank you for reading the journey of this project." },
    closing: { id: "Small Actions, Big Impact.", en: "Small Actions, Big Impact." },
  },
  card: {
    tag: { id: "Produk", en: "Product" },
    blurb: { id: "Tempat sampah khusus plastik daur ulang dengan rangka kawat besi dan struktur terbuka, dirancang untuk membangun kebiasaan memilah sampah sejak dari sumbernya.", en: "A dedicated recycled-plastic waste bin with an iron mesh frame and open structure, designed to build the habit of sorting waste at its source." },
    cta: { id: "Lihat Project Recap", en: "View Project Recap" },
  },
  metaDescription: { id: "BACIRARO Creative menghadirkan tempat sampah khusus plastik daur ulang sebagai upaya membangun kebiasaan memilah sampah sejak dari sumbernya.", en: "BACIRARO Creative presents a dedicated recycled-plastic waste bin as an effort to build the habit of sorting waste at its source." },
};

/** Recap baru yang kartunya ditampilkan di works.ts. */
export const recapProjects: RecapProject[] = [annualGames, pialaBi, idx, kawasaran, tjf, workshop];
/** Recap lama yang rutenya statis (/creative/projects/pensil-2026, /plastic-waste-bin) dan kartunya sudah ada di works.ts. */
export const legacyRecaps: RecapProject[] = [pensil, wasteBin];
export const getRecap = (slug: string) => [...recapProjects, ...legacyRecaps].find((p) => p.slug === slug);
