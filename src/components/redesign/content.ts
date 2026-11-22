import type { L } from "@/components/redesign/ui";

export const WA = "https://wa.me/6288212835350?text=Halo%2C%20saya%20ingin%20berkolaborasi%20dengan%20Baciraro.";

export type Entity = {
  id: string;
  name: string;
  role: L;
  desc: L;
  href: string;
  logo: string;
  color: string;
  /** indeks langkah alur (0–4) yang ditangani entitas ini */
  steps: number[];
  /** logo berwarna gelap/transparan butuh latar putih */
  pad?: boolean;
  /** logo satu warna: digambar sebagai mask berwarna entitas */
  mask?: boolean;
};

export const entities: Entity[] = [
  {
    id: "tnl", name: "Tana Nyiur Lestari", color: "var(--green)", steps: [0], href: "/tananyiurlestari", logo: "/tnl-transparent.png",
    role: { id: "Edukasi & Pemberdayaan", en: "Education & Empowerment" },
    desc: { id: "Edukasi lingkungan, peningkatan kesadaran, dan pemberdayaan masyarakat di tahap awal ekosistem.", en: "Environmental education, awareness and community empowerment at the start of the ecosystem." },
  },
  {
    id: "trc", name: "Trash Recycle Center", color: "var(--terra)", steps: [0, 1], href: "/trashrecyclecenter", logo: "/trc.png",
    role: { id: "Pengumpulan & Pengolahan", en: "Collection & Processing" },
    desc: { id: "Offtaker yang memilah dan mengolah sampah menjadi bahan baku berkualitas.", en: "The offtaker that sorts and processes waste into quality raw material." },
  },
  {
    id: "elmast", name: "ELMAST Greenovasi", color: "var(--gold)", steps: [1], href: "/elmast", logo: "/elmast.png", pad: true,
    role: { id: "Teknologi Organik", en: "Organic Technology" },
    desc: { id: "Teknologi pengolahan sampah organik menjadi biogas, kompos, dan pupuk organik cair.", en: "Technology turning organic waste into biogas, compost and liquid organic fertiliser." },
  },
  {
    id: "creative", name: "Baciraro Creative", color: "var(--orange)", steps: [2], href: "/creative", logo: "/Logo Baciraro Creative.png", pad: true, mask: true,
    role: { id: "Produk Kreatif Daur Ulang", en: "Recycled Creative Products" },
    desc: { id: "Mengubah plastik daur ulang menjadi piala, kriya, dan produk bernilai bersama komunitas.", en: "Turning recycled plastic into trophies, crafts and valuable products with communities." },
  },
  {
    id: "retail", name: "Baciraro Retail", color: "var(--green-ink)", steps: [3], href: "/products", logo: "/Baciraro cap.png", pad: true,
    role: { id: "Distribusi & Penjualan", en: "Distribution & Sales" },
    desc: { id: "Menyalurkan produk daur ulang ke pelanggan dan mitra, dengan poin untuk setiap pembelian.", en: "Bringing recycled products to customers and partners, with points on every purchase." },
  },
  {
    id: "orders", name: "ORDERS", color: "var(--ink)", steps: [4], href: "/orders", logo: "/Orders.png", pad: true,
    role: { id: "Digital & Data", en: "Digital & Data" },
    desc: { id: "Website, aplikasi, dashboard, dan pelacakan dampak yang menggerakkan seluruh ekosistem.", en: "The website, apps, dashboards and impact tracking that power the whole ecosystem." },
  },
];

export const flow: { title: L; desc: L }[] = [
  { title: { id: "Pemilahan", en: "Sorting" }, desc: { id: "Sampah dipilah dari sumbernya oleh komunitas dan bank sampah mitra.", en: "Waste is sorted at source by communities and partner waste banks." } },
  { title: { id: "Pengolahan", en: "Processing" }, desc: { id: "Material diolah menjadi bahan baku siap produksi di TRC dan ELMAST.", en: "Material is processed into production-ready raw material at TRC and ELMAST." } },
  { title: { id: "Karya", en: "Creation" }, desc: { id: "Bahan baku diubah menjadi produk bernilai oleh Baciraro Creative.", en: "Raw material becomes valuable products at Baciraro Creative." } },
  { title: { id: "Distribusi", en: "Distribution" }, desc: { id: "Produk disalurkan lewat Baciraro Retail dan mitra.", en: "Products reach people through Baciraro Retail and partners." } },
  { title: { id: "Pelacakan", en: "Tracking" }, desc: { id: "ORDERS mencatat setiap langkah, transparan dan terukur.", en: "ORDERS records every step, transparent and measurable." } },
];

export const partners = [
  { name: "Pertamina Geothermal Energy", logo: "/partners/pertamina.png", scale: 1.05 },
  { name: "Danone Aqua", logo: "/partners/danone.png", scale: 0.92 },
  { name: "KKP", logo: "/partners/kkp.png", scale: 1.3 },
  { name: "Kemenparekraf", logo: "/partners/kemenparekraf.png", scale: 1.08 },
  { name: "PLN", logo: "/partners/pln.png", scale: 1.25 },
  { name: "BNI", logo: "/partners/bni.png", scale: 0.9 },
  { name: "Kemenbud", logo: "/partners/kemenbud.png", scale: 1.05 },
];

export const metrics: { value: number; suffix: string; label: L; unit: L; color: string }[] = [
  { value: 1200, suffix: "+", label: { id: "Sampah terkelola", en: "Waste managed" }, unit: { id: "ton", en: "tons" }, color: "var(--green)" },
  { value: 80, suffix: "+", label: { id: "Komunitas aktif", en: "Active communities" }, unit: { id: "komunitas", en: "communities" }, color: "var(--terra)" },
  { value: 40, suffix: "+", label: { id: "Produk kreatif", en: "Creative products" }, unit: { id: "karya", en: "works" }, color: "var(--orange)" },
  { value: 25, suffix: "+", label: { id: "Proyek digital", en: "Digital projects" }, unit: { id: "proyek", en: "projects" }, color: "var(--ink)" },
  { value: 85, suffix: "%", label: { id: "Reduksi ke TPA", en: "Diverted from landfill" }, unit: { id: "persen", en: "percent" }, color: "var(--green)" },
  { value: 15, suffix: "+", label: { id: "Mitra kolaborasi", en: "Collaboration partners" }, unit: { id: "mitra", en: "partners" }, color: "var(--green-ink)" },
];

export const cases: { partner: string; logo?: string; badge: L; result: L; color: string }[] = [
  { partner: "BNI 46 Manado", logo: "/partners/bni.png", color: "var(--green)", badge: { id: "CSR Tersertifikasi", en: "Certified CSR" }, result: { id: "50+ ton sampah terkelola melalui program CSR bank sampah.", en: "50+ tons of waste managed through a waste-bank CSR programme." } },
  { partner: "KKP & Kemenparekraf", logo: "/partners/kkp.png", color: "var(--terra)", badge: { id: "Kemitraan Strategis", en: "Strategic Partnership" }, result: { id: "Program edukasi lingkungan di 5 desa wisata pesisir.", en: "Environmental education across 5 coastal tourism villages." } },
  { partner: "Desa Wisata Likupang", color: "var(--orange)", badge: { id: "Dampak Lokal", en: "Local Impact" }, result: { id: "Bank sampah aktif dengan 200+ nasabah dan produksi ecobrick.", en: "An active waste bank with 200+ members and ecobrick production." } },
];

export const trail: { year: number; title: L; src: string }[] = [
  { year: 2010, title: { id: "Reboisasi Gunung Klabat", en: "Mount Klabat reforestation" }, src: "/2010/tanam pohon di gunung klabat.webp" },
  { year: 2012, title: { id: "Bank Sampah Brits, Pulau Bunaken", en: "Brits waste bank, Bunaken Island" }, src: "/2012/Manado-Bunaken (29).jpg" },
  { year: 2017, title: { id: "Peluncuran Bank Sampah Agape", en: "Agape waste bank launch" }, src: "/2017/launching bank sampah agape di desa tumaluntung.jpg" },
  { year: 2018, title: { id: "Bank Sampah Simfoni", en: "Simfoni waste bank" }, src: "/2018/Bank Sampah Simfoni di Festival paskah dan pencanangan bank sampah jemaat menunjang pariwisata sulut.jpg" },
  { year: 2019, title: { id: "Produksi sofa ecobrick", en: "Ecobrick sofa production" }, src: "/2019/4 sofa ecobrick.jpg" },
  { year: 2022, title: { id: "Bank Sampah Setor Jo & Eco-Enzyme", en: "Setor Jo waste bank & eco-enzyme" }, src: "/2022/20221013_100454.jpg" },
  { year: 2023, title: { id: "Bijak Berplastik, Danone Aqua", en: "Bijak Berplastik, Danone Aqua" }, src: "/2023/IMG20230510091609.jpg" },
  { year: 2024, title: { id: "Desa Pesisir & kolaborasi BUMN", en: "Coastal villages & SOE collaboration" }, src: "/2024/IMG20240409232612.jpg" },
];

export type Audience = { key: string; tab: L; title: L; points: L[]; case: number };
export const audiences: Audience[] = [
  {
    key: "company", tab: { id: "Perusahaan", en: "Companies" }, title: { id: "CSR yang bisa dipertanggungjawabkan", en: "CSR you can account for" }, case: 0,
    points: [
      { id: "Program CSR pengelolaan sampah yang terukur", en: "Measurable waste-management CSR programmes" },
      { id: "Pelaporan dampak dan dashboard digital", en: "Impact reporting and a digital dashboard" },
      { id: "Suvenir dan plakat dari bahan daur ulang", en: "Souvenirs and plaques from recycled material" },
    ],
  },
  {
    key: "gov", tab: { id: "Pemerintah", en: "Government" }, title: { id: "Menguatkan layanan persampahan daerah", en: "Strengthening local waste services" }, case: 1,
    points: [
      { id: "Penguatan layanan persampahan daerah", en: "Stronger local waste services" },
      { id: "Edukasi dan pendampingan sistem digital", en: "Education and digital-system mentoring" },
      { id: "Pemetaan timbulan sampah secara partisipatif", en: "Participatory mapping of waste generation" },
    ],
  },
  {
    key: "village", tab: { id: "Desa & Komunitas", en: "Villages & Communities" }, title: { id: "Dari bank sampah ke produk bernilai jual", en: "From waste bank to products that sell" }, case: 2,
    points: [
      { id: "Model bank sampah terpadu", en: "An integrated waste-bank model" },
      { id: "Pelatihan pemilahan dan daur ulang", en: "Sorting and recycling training" },
      { id: "Akses pasar offtaker dan produk kreatif", en: "Access to offtaker markets and creative products" },
    ],
  },
];
