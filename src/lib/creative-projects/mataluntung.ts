const IMAGE_BASE = "https://zkotqpszynvfunhenysp.supabase.co/storage/v1/object/public/product-images/projects/mataluntung";

export const projectImages = {
  hero: `${IMAGE_BASE}/01_Hero_Mataluntung_Collection.png`,
  ganciDetail: `${IMAGE_BASE}/02_Ganci_Mataluntung_Detail.png`,
  ganciCollection: `${IMAGE_BASE}/03_Ganci_Mataluntung_Collection.png`,
  coasterBlueStack: `${IMAGE_BASE}/04_Coaster_Blue_Stack.png`,
  coasterOrange: `${IMAGE_BASE}/05_Coaster_Orange_Material.png`,
  ashtrayCollection: `${IMAGE_BASE}/06_Ashtray_Collection_Color_Forms.png`,
  ashtraySquare: `${IMAGE_BASE}/07_Ashtray_Square_Detail.png`,
  coasterInUse: `${IMAGE_BASE}/08_Coaster_In_Use.png`,
  coffeeContext: `${IMAGE_BASE}/09_Mataluntung_Coffee_Context.png`,
  threeObjectsLifestyle: `${IMAGE_BASE}/10_Three_Objects_Lifestyle.png`,
  projectHandover: `${IMAGE_BASE}/11_Project_Handover.png`,
  swatchDarkBlue: `${IMAGE_BASE}/Material_Dark_Blue.png`,
  swatchBlue: `${IMAGE_BASE}/Material_Blue.png`,
  swatchMixed: `${IMAGE_BASE}/Material_Mixed.png`,
  swatchBrown: `${IMAGE_BASE}/Material_Brown.png`,
  swatchGold: `${IMAGE_BASE}/Material_Gold.png`,
  swatchGreen: `${IMAGE_BASE}/Material_Green.png`,
  swatchRed: `${IMAGE_BASE}/Material_Red.png`,
  swatchOrange: `${IMAGE_BASE}/Material_Orange.png`,
  swatchPink: `${IMAGE_BASE}/Material_Pink.png`,
  swatchWhite: `${IMAGE_BASE}/Material_White.png`,
};

export const mataluntungProject = {
  slug: "mataluntung",
  title: "Mataluntung",
  client: "Mataluntung",
  creative: "Baciraro Creative",
  year: 2026,
  category: "Custom Recycled Product Collection",
  products: ["Ganci Mataluntung", "Coaster", "Asbak"],
  material: "Recycled / Reprocessed Plastic",
  projectType: "Functional Recycled Objects",

  eyebrow: "BACIRARO CREATIVE / COLLABORATION 2026",
  clientLine: "Mataluntung × Baciraro Creative",

  headline: "Functional Objects,\nRecast Through Recycled Material.",

  subStatement: "Three everyday objects. One material language.",

  tags: [
    { label: "Ganci", separator: "/" },
    { label: "Coaster", separator: "/" },
    { label: "Asbak", separator: "/" },
    { label: "Recycled Plastic", separator: "/" },
    { label: "Functional Objects", separator: "/" },
    { label: "Material Exploration", separator: "" },
  ],

  introHeading: "Three Objects.\nOne Material Language.",

  introBody: `Kolaborasi bersama Mataluntung berangkat dari gagasan sederhana: bagaimana material plastik yang telah digunakan sebelumnya dapat kembali hadir dalam benda-benda yang dekat dengan aktivitas sehari-hari.

Baciraro Creative mengembangkan tiga kategori objek — ganci Mataluntung, coaster, dan asbak — dengan mempertahankan karakter material daur ulang sebagai bagian utama dari desain.

Alih-alih menyembunyikan serpihan, warna, dan variasi permukaan, project ini menjadikannya sebagai identitas visual.

Setiap fungsi berbeda, tetapi seluruh collection berbicara melalui bahasa material yang sama.`,

  briefStatement:
    "Create everyday objects\nthat carry the character\nof recycled material.",

  briefConcepts: [
    {
      number: "01",
      title: "FUNCTION",
      description:
        "Produk harus benar-benar dapat digunakan sebagai everyday objects.",
    },
    {
      number: "02",
      title: "IDENTITY",
      description:
        "Ganci membawa identitas visual Mataluntung melalui bentuk huruf / mark yang langsung terbaca.",
    },
    {
      number: "03",
      title: "MATERIAL CHARACTER",
      description:
        "Tekstur dan variasi material daur ulang tidak disembunyikan.",
    },
  ],

  ganci: {
    heading: "Brand Identity,\nMade to Be Carried.",
    body: `Ganci Mataluntung menerjemahkan identitas brand menjadi sebuah objek kecil yang dapat dibawa dalam aktivitas sehari-hari.

Kontras elemen hitam dengan bidang material terang membuat bentuk huruf tetap terbaca, sementara serpihan pada material mempertahankan karakter daur ulang dari setiap unit.`,
    mainImage: projectImages.ganciDetail,
    secondaryImage: projectImages.ganciCollection,
    mainAlt: "Detail ganci Mataluntung dari material plastik daur ulang",
    secondaryAlt: "Koleksi ganci Mataluntung",
    microCaptions: ["MATALUNTUNG IDENTITY", "RECYCLED BASE", "PORTABLE OBJECT"],
  },

  coaster: {
    heading: "Simple Form.\nComplex Material.",
    body: `Bentuk lingkaran pada coaster dibuat sederhana agar perhatian berpindah pada material.

Ketebalan, serpihan warna, dan variasi permukaan menjadi bahasa visual utama dari objek yang digunakan pada aktivitas minum sehari-hari.`,
    materialImage: projectImages.coasterBlueStack,
    materialAlt: "Stack coaster biru memperlihatkan ketebalan material",
    warmImage: projectImages.coasterOrange,
    warmAlt: "Coaster oranye memperlihatkan variasi warna material",
    useImage: projectImages.coasterInUse,
    useAlt: "Coaster digunakan dalam konteks nyata",
    sequence: ["OBJECT", "MATERIAL", "IN USE"],
  },

  asbak: {
    heading: "One Material.\nDifferent Forms.",
    body: `Asbak menjadi ruang eksplorasi bentuk yang lebih ekspresif dalam collection ini.

Bentuk bulat, poligonal, hingga kotak memberi karakter yang berbeda pada setiap objek, sementara material yang sama menyatukan seluruh collection melalui warna dan tekstur.`,
    collectionImage: projectImages.ashtrayCollection,
    collectionAlt: "Koleksi asbak Mataluntung dalam berbagai bentuk dan warna",
    squareImage: projectImages.ashtraySquare,
    squareAlt: "Asbak bentuk kotak dari material daur ulang",
    microLabels: ["ROUND", "POLYGONAL", "SQUARE", "DEEP CAVITY", "RECYCLED SURFACE"],
  },

  materialPattern: {
    headline: "THE PATTERN\nIS THE MATERIAL.",
    body: `Warna pada collection ini bukan sekadar lapisan akhir.

Pola visual tidak ditempelkan di atas permukaan.

Serpihan dan komposisi warna muncul langsung dari material yang diproses kembali, sehingga setiap permukaan memiliki natural surface variation.`,
    crops: [
      { src: projectImages.swatchDarkBlue, alt: "Detail serpihan plastik biru tua" },
      { src: projectImages.swatchBrown, alt: "Detail serpihan plastik coklat" },
      { src: projectImages.swatchWhite, alt: "Detail serpihan plastik putih" },
    ],
  },

  materialPalette: {
    heading: "Material Palette",
    groups: [
      { label: "DEEP BLUE", image: projectImages.swatchDarkBlue, alt: "Serpihan plastik daur ulang warna biru tua" },
      { label: "WARM ORANGE", image: projectImages.swatchOrange, alt: "Serpihan plastik daur ulang warna oranye" },
      { label: "PINK FIELD", image: projectImages.swatchPink, alt: "Serpihan plastik daur ulang warna pink" },
      { label: "GREEN / BLUE", image: projectImages.swatchGreen, alt: "Serpihan plastik daur ulang warna hijau" },
      { label: "MULTICOLOR", image: projectImages.swatchMixed, alt: "Serpihan plastik daur ulang campuran warna" },
    ],
  },

  formThickness: {
    heading: "Material You Can See\nFrom Every Side.",
    images: [
      { src: projectImages.coasterBlueStack, alt: "Ketebalan dan edge coaster" },
      { src: projectImages.ashtraySquare, alt: "Detail asbak kotak dari material daur ulang" },
    ],
  },

  threeObjects: {
    flow: [
      { object: "GANCI", action: "CARRIED" },
      { object: "COASTER", action: "USED" },
      { object: "ASBAK", action: "PLACED" },
    ],
    statement: "Different functions.\nShared material language.",
  },

  realContext: {
    heading: "Designed to Leave the Studio.",
    body: `Project tidak berhenti ketika objek selesai dibuat.

Produk baru benar-benar memperoleh konteks ketika digunakan — coaster berada di bawah gelas, ganci ikut dibawa, dan asbak hadir sebagai bagian dari meja dan ruang aktivitas.`,
    images: [
      { src: projectImages.coasterInUse, alt: "Coaster dalam penggunaan nyata" },
      { src: projectImages.coffeeContext, alt: "Produk dalam konteks Mataluntung" },
    ],
    heroImage: projectImages.threeObjectsLifestyle,
    heroAlt: "Tiga objek dalam konteks lifestyle",
  },

  documentation: {
    heading: "From Making\nto Handover.",
    body: `Project ditutup dengan penyerahan collection kepada Mataluntung, membawa proses material dari ruang produksi menuju konteks penggunaan sebenarnya.`,
    image: projectImages.projectHandover,
    imageAlt: "Penyerahan project Mataluntung × Baciraro Creative",
  },

  galleryTitle: "Project Archive",

  galleryCategories: ["ALL", "GANCI", "COASTER", "ASBAK", "MATERIAL", "IN USE", "DOCUMENTATION"] as const,

  galleryImages: [
    { src: projectImages.hero, alt: "Koleksi Mataluntung", category: "GANCI" as const },
    { src: projectImages.ganciDetail, alt: "Detail ganci", category: "GANCI" as const },
    { src: projectImages.ganciCollection, alt: "Koleksi ganci", category: "GANCI" as const },
    { src: projectImages.coasterBlueStack, alt: "Coaster biru", category: "COASTER" as const },
    { src: projectImages.coasterOrange, alt: "Coaster oranye", category: "COASTER" as const },
    { src: projectImages.coasterInUse, alt: "Coaster digunakan", category: "IN USE" as const },
    { src: projectImages.ashtrayCollection, alt: "Koleksi asbak", category: "ASBAK" as const },
    { src: projectImages.ashtraySquare, alt: "Asbak kotak", category: "ASBAK" as const },
    { src: projectImages.swatchDarkBlue, alt: "Serpihan plastik biru tua", category: "MATERIAL" as const },
    { src: projectImages.swatchBlue, alt: "Serpihan plastik biru", category: "MATERIAL" as const },
    { src: projectImages.swatchBrown, alt: "Serpihan plastik coklat", category: "MATERIAL" as const },
    { src: projectImages.swatchGold, alt: "Serpihan plastik emas", category: "MATERIAL" as const },
    { src: projectImages.swatchGreen, alt: "Serpihan plastik hijau", category: "MATERIAL" as const },
    { src: projectImages.swatchRed, alt: "Serpihan plastik merah", category: "MATERIAL" as const },
    { src: projectImages.swatchOrange, alt: "Serpihan plastik oranye", category: "MATERIAL" as const },
    { src: projectImages.swatchPink, alt: "Serpihan plastik pink", category: "MATERIAL" as const },
    { src: projectImages.swatchWhite, alt: "Serpihan plastik putih", category: "MATERIAL" as const },
    { src: projectImages.swatchMixed, alt: "Serpihan plastik campuran warna", category: "MATERIAL" as const },
    { src: projectImages.coffeeContext, alt: "Konteks kopi", category: "IN USE" as const },
    { src: projectImages.threeObjectsLifestyle, alt: "Tiga objek lifestyle", category: "IN USE" as const },
    { src: projectImages.projectHandover, alt: "Penyerahan project", category: "DOCUMENTATION" as const },
  ],

  closingHeadline: "Made from what was left behind.\nDesigned to stay in everyday life.",
  closingAttribution: "Mataluntung × Baciraro Creative\n2026",

  ctaHeading: "Have an Object\nWorth Reimagining?",
  ctaBody:
    "Baciraro Creative mengembangkan produk custom berbasis material daur ulang untuk brand, perusahaan, institusi, event, komunitas, dan berbagai kebutuhan kolaborasi.",
};
