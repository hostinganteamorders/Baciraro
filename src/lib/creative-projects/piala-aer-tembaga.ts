const IMAGE_BASE = "/Piala_Aer_Tembaga_Selected_Web_Photos";

export const projectImages = {
  hero: `${IMAGE_BASE}/01_Hero_Final_Trophies.png`,
  trophyInHand: `${IMAGE_BASE}/02_Final_Trophy_In_Hand.png`,
  emblemDetail: `${IMAGE_BASE}/03_BI_Emblem_Detail.png`,
  rawMaterials: `${IMAGE_BASE}/04_Raw_Materials_Overview.png`,
  blueCaps: `${IMAGE_BASE}/05_Blue_Bottle_Caps.png`,
  redCaps: `${IMAGE_BASE}/06_Red_Bottle_Caps.png`,
  sortedFlakes: `${IMAGE_BASE}/07_Sorted_Recycled_Flakes.png`,
  blueFlakes: `${IMAGE_BASE}/08_Blue_Flakes_In_Hands.png`,
  recycledSheet: `${IMAGE_BASE}/09_Recycled_Sheet_Material.png`,
  shaping: `${IMAGE_BASE}/10_Cutting_Shaping_Process.png`,
  formDevelopment: `${IMAGE_BASE}/11_Trophy_Form_Before_Finishing.png`,
  assembly: `${IMAGE_BASE}/12_Assembly_Workbench.png`,
  weighing: `${IMAGE_BASE}/13_Documented_Weighing.png`,
  finalGroup: `${IMAGE_BASE}/14_Final_Trophies_Close_Group.png`,
};

export const pialaAerTembagaProject = {
  slug: "piala-aer-tembaga",
  title: "Piala Aer Tembaga",
  client: "Bank Indonesia",
  year: 2026,
  category: "Custom Trophy / Circular Product",
  material: "Recycled Bottle Caps",
  brand: "Baciraro Creative",

  tags: ["Custom Trophy", "Recycled Plastic", "Circular Design"],

  awardLevels: ["Juara 1", "Juara 2", "Juara 3"],

  documentedFrames: 52,

  impact: {
    plasticWeight: "2.078",
    unit: "gram",
    bottleEquiv: "±2.078 botol plastik",
    label: "Material daur ulang terdokumentasi",
  },

  eyebrow: "BACIRARO CREATIVE / PROJECT 2026",
  clientLine: "Bank Indonesia × Baciraro Creative",

  headline: "Turning Recycled Plastic Into a Symbol of Achievement",

  introHeading: "An Award That Carries Another Story",

  introBody: `Sebuah penghargaan biasanya menandai sebuah pencapaian. Dalam proyek ini, kami ingin membuatnya membawa cerita yang lebih jauh.

Bank Indonesia mempercayakan Baciraro Creative untuk menghadirkan piala yang tidak hanya berfungsi sebagai simbol kemenangan, tetapi juga membawa nilai sirkular melalui material plastik yang telah digunakan sebelumnya.

Tutup botol yang sebelumnya berada di akhir siklus konsumsi diolah kembali menjadi material baru.

Warna, serpihan, dan karakter plastik tidak disembunyikan. Justru karakter tersebut menjadi identitas visual dari setiap piala.`,

  briefStatement:
    "Create an award that carries identity, place, achievement, and circular value.",

  briefConcepts: [
    {
      title: "IDENTITY",
      description:
        "Identitas Bank Indonesia harus langsung terbaca dari piala.",
    },
    {
      title: "LOCAL FORM",
      description:
        "Bentuk piala membawa elemen visual yang berkaitan dengan konsep Aer Tembaga.",
    },
    {
      title: "CIRCULAR MATERIAL",
      description:
        "Material utama dibuat dari plastik/tutup botol yang diproses kembali.",
    },
  ],

  processSteps: [
    {
      number: "01",
      label: "MATERIAL",
      headline: "It Starts With What Was Once Discarded",
      body: "Perjalanan material dimulai dari tutup botol plastik yang dikumpulkan untuk digunakan kembali sebagai bahan dasar produk.",
      image: projectImages.rawMaterials,
      imageAlt: "Tutup botol plastik bekas sebagai bahan awal pembuatan piala",
      tags: ["RAW MATERIAL", "RECOVERED PLASTIC"],
    },
    {
      number: "02",
      label: "COLOR SORTING",
      headline: "Color Becomes Part of the Material",
      body: "Material dipisahkan berdasarkan warna agar komposisi visual dapat dikendalikan sejak awal proses.",
      images: [projectImages.blueCaps, projectImages.redCaps],
      imageAlts: [
        "Tutup botol plastik biru setelah dipilah",
        "Tutup botol plastik merah setelah dipilah",
      ],
      tags: ["BLUE", "RED", "RECYCLED COLOR SYSTEM"],
    },
    {
      number: "03",
      label: "SHREDDING",
      headline: "Breaking It Down",
      body: "Tutup botol kemudian diproses menjadi serpihan plastik kecil yang menjadi bahan untuk proses pembentukan material berikutnya.",
      images: [projectImages.sortedFlakes, projectImages.blueFlakes],
      imageAlts: [
        "Serpihan plastik daur ulang setelah proses pencacahan",
        "Serpihan plastik biru di tangan sebagai bahan pembuatan material",
      ],
      tags: ["FLAKES"],
      editorialGraphic: "FLAKES",
    },
    {
      number: "04",
      label: "RE-FORMING",
      headline: "Waste Becomes Material Again",
      body: "Serpihan plastik dibentuk kembali menjadi material solid yang dapat dipotong dan digunakan sebagai bahan utama piala.",
      image: projectImages.recycledSheet,
      imageAlt: "Lembaran material padat dari hasil daur ulang plastik",
      tags: [],
      visualTransition: ["CAPS", "FLAKES", "SHEET"],
    },
    {
      number: "05",
      label: "SHAPING",
      headline: "Shaped by Hand & Process",
      body: "Material kemudian dipotong dan dibentuk mengikuti geometri desain piala.",
      image: projectImages.shaping,
      imageAlt: "Proses pemotongan lembar plastik daur ulang",
      tags: [],
    },
    {
      number: "06",
      label: "FORM & ASSEMBLY",
      headline: "From Material to Form",
      body: "Bagian-bagian piala dirakit secara bertahap hingga membentuk komposisi final.",
      images: [projectImages.formDevelopment, projectImages.assembly],
      imageAlts: [
        "Bentuk piala sebelum proses finishing",
        "Meja perakitan komponen piala",
      ],
      tags: [],
      assemblyDiagram: [
        "BI EMBLEM",
        "MAIN BODY",
        "ANCHOR / BLADE FORM",
        "BASE",
        "AWARD IDENTITY",
      ],
    },
    {
      number: "07",
      label: "FINAL OBJECT",
      headline: "Built to Be Given",
      body: "Setelah melalui proses finishing dan pemasangan identitas, material daur ulang berubah menjadi objek penghargaan yang siap diberikan.",
      image: projectImages.finalGroup,
      imageAlt: "Tiga piala final dari material plastik daur ulang untuk Bank Indonesia",
      tags: [],
    },
  ],

  designAnnotations: [
    {
      title: "CIRCULAR BI MARK",
      description:
        "Identitas Bank Indonesia menjadi focal point bagian atas.",
    },
    {
      title: "ANCHOR FORM",
      description:
        "Elemen jangkar menjadi salah satu bahasa bentuk utama project.",
    },
    {
      title: "UPWARD BLADE",
      description:
        "Gerak vertikal membantu memberikan karakter achievement dan progression.",
    },
    {
      title: "RECYCLED SURFACE",
      description:
        "Pola warna dan serpihan material tetap terlihat sehingga menunjukkan asal materialnya.",
    },
  ],

  materialPaletteItems: [
    {
      label: "BI BLUE",
      image: projectImages.blueCaps,
      imageAlt: "Tutup botol plastik biru sebagai warna identitas proyek",
    },
    {
      label: "RECYCLED RED",
      image: projectImages.redCaps,
      imageAlt: "Tutup botol plastik merah sebagai warna material daur ulang",
    },
    {
      label: "MULTICOLOR FLAKES",
      image: projectImages.blueFlakes,
      imageAlt: "Serpihan plastik berbagai warna sebagai tekstur material",
    },
  ],

  circularFlowSteps: [
    "USED BOTTLE CAPS",
    "SORTING",
    "RECYCLED FLAKES",
    "REFORMED MATERIAL",
    "CUSTOM OBJECT",
    "SYMBOL OF ACHIEVEMENT",
  ],

  closingQuote:
    "No two recycled surfaces are exactly the same.",

  closingBody: `Circular design bukan hanya tentang mengganti material.

Ia tentang mengubah cara kita melihat nilai sebuah material.

Pada proyek ini, plastik yang sebelumnya berada di akhir siklusnya dikembalikan sebagai sebuah objek yang dirancang untuk disimpan, dipajang, dan dikenang.`,

  documentationLabel: "Documented batch weighing",

  archiveTitle: "52 Frames of the Making Process",

  archiveCategories: ["MATERIAL", "MAKING", "DETAILS", "FINAL OBJECTS"] as const,

  archiveCta: "View Full Process — 52 Frames",

  finalHeadline: "From discarded plastic\nto something worth celebrating.",

  finalSubheadline: "Designed & Made by Baciraro Creative",

  closingFinalBody: `Piala Aer Tembaga menunjukkan bahwa material daur ulang tidak harus berhenti sebagai bahan alternatif.

Dengan desain, proses, dan perhatian terhadap detail, material tersebut dapat berubah menjadi objek yang memiliki fungsi, identitas, dan cerita baru.`,

  ctaHeading: "Have a Circular Product in Mind?",

  ctaBody:
    "Baciraro Creative mengembangkan produk custom berbasis material daur ulang untuk perusahaan, institusi, event, komunitas, dan berbagai kebutuhan kolaborasi.",
};

export type ProcessStepData = (typeof pialaAerTembagaProject.processSteps)[number];
