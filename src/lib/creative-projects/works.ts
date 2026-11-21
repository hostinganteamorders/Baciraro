import { projectImages as mataluntung } from "@/lib/creative-projects/mataluntung";
import { projectImages as pensil } from "@/lib/creative-projects/pensil-2026";
import { projectImages as wasteBin } from "@/lib/creative-projects/plastic-waste-bin";
import { recapPhotoUrl, recapProjects, type L } from "@/lib/creative-projects/recaps";

export type WorkCategory = "piala" | "produk" | "event" | "budaya";

export type Work = {
  slug: string;
  category: WorkCategory;
  href: string;
  image: string;
  /** posisi fokus foto di dalam kartu, mis. "50% 20%" */
  focus?: string;
  /** angka ciri khas yang ditampilkan sebagai stiker di kartu */
  figure?: string;
  tag: L;
  title: L;
  partner: L;
  blurb: L;
  cta: L;
};

export const categoryLabel: Record<WorkCategory, L> = {
  piala: { id: "Piala & Penghargaan", en: "Trophies & Awards" },
  produk: { id: "Produk & Objek", en: "Products & Objects" },
  event: { id: "Event & Workshop", en: "Events & Workshops" },
  budaya: { id: "Budaya", en: "Culture" },
};

const SB = "https://zkotqpszynvfunhenysp.supabase.co/storage/v1/object/public/product-images/projects";
const view: L = { id: "Lihat studi kasus", en: "View case study" };
const gallery: L = { id: "Lihat dokumentasi", en: "View documentation" };

const legacy: Work[] = [
  {
    slug: "piala-aer-tembaga",
    figure: "2.078 g",
    category: "piala",
    href: "/creative/projects/piala-aer-tembaga",
    image: `${SB}/piala-aer-tembaga/01_Hero_Final_Trophies.png`,
    focus: "50% 25%",
    tag: { id: "Piala Penghargaan", en: "Award Trophy" },
    title: { id: "Piala Aer Tembaga", en: "Aer Tembaga Trophy" },
    partner: { id: "Bank Indonesia × Baciraro Creative", en: "Bank Indonesia × Baciraro Creative" },
    blurb: {
      id: "Piala custom dari tutup botol daur ulang untuk Bank Indonesia — 2.078 gram plastik diselamatkan.",
      en: "A custom trophy from recycled bottle caps for Bank Indonesia — 2,078 grams of plastic rescued.",
    },
    cta: view,
  },
  {
    slug: "mataluntung",
    category: "produk",
    href: "/creative/projects/mataluntung",
    image: mataluntung.hero,
    tag: { id: "Kolaborasi Kafe", en: "Café Collaboration" },
    title: { id: "Mataluntung × Baciraro", en: "Mataluntung × Baciraro" },
    partner: { id: "Mataluntung Coffee & Culture", en: "Mataluntung Coffee & Culture" },
    blurb: {
      id: "Ganci, coaster, dan asbak dari plastik daur ulang — karakter material jadi identitas produk.",
      en: "Keychains, coasters and ashtrays from recycled plastic — the material's character becomes the product identity.",
    },
    cta: view,
  },
  {
    slug: "pensil-2026",
    figure: "2.904 g",
    category: "piala",
    href: "/creative/projects/pensil-2026",
    image: pensil.trophies,
    tag: { id: "Piala Penghargaan", en: "Award Trophies" },
    title: { id: "PENSIL 2026", en: "PENSIL 2026" },
    partner: { id: "ROHIS SMA Negeri 1 Manado", en: "ROHIS SMA Negeri 1 Manado" },
    blurb: {
      id: "Dari sampah plastik menjadi simbol apresiasi — 2.904 gram plastik diolah menjadi piala.",
      en: "From plastic waste to a symbol of appreciation — 2,904 grams of plastic turned into trophies.",
    },
    cta: view,
  },
  {
    slug: "plastic-waste-bin",
    category: "produk",
    href: "/creative/projects/plastic-waste-bin",
    image: wasteBin.prototype,
    tag: { id: "Infrastruktur Sampah", en: "Waste Infrastructure" },
    title: { id: "Plastic Waste Bin", en: "Plastic Waste Bin" },
    partner: { id: "Tempat sampah khusus plastik", en: "A bin for plastic only" },
    blurb: {
      id: "Rangka kawat besi dengan struktur terbuka untuk membangun kebiasaan memilah dari sumbernya.",
      en: "A wire-frame bin with an open structure to build the habit of sorting at the source.",
    },
    cta: view,
  },
  {
    slug: "dialog-budaya",
    category: "budaya",
    href: "/creative/dialog-budaya",
    image: "/Dialog Budaya/foto bersama dengan narasumber.webp",
    tag: { id: "Forum Budaya", en: "Cultural Forum" },
    title: { id: "Dialog Budaya Minahasa 2026", en: "Minahasa Cultural Dialogue 2026" },
    partner: { id: "Kedai Kana, Desa Sukur · 1 Agustus 2026", en: "Kedai Kana, Sukur Village · 1 August 2026" },
    blurb: {
      id: "Forum yang menelusuri evolusi atribut Kawasaran bersama tokoh adat, akademisi, seniman, dan generasi muda.",
      en: "A forum tracing the evolution of Kawasaran attributes with traditional leaders, academics, artists and young people.",
    },
    cta: gallery,
  },
  {
    slug: "lokawaya",
    category: "event",
    href: "/creative/lokawaya",
    image: "/Lokawaya/proses pembuatan keychain anak dari USA.png",
    tag: { id: "Event", en: "Event" },
    title: { id: "Lokawaya × Baciraro Creative", en: "Lokawaya × Baciraro Creative" },
    partner: { id: "25 Juli 2026", en: "25 July 2026" },
    blurb: {
      id: "Workshop mengubah tutup botol menjadi keychain dan booth produk yang bisa ditukar dengan Dobu atau Doi Bulu.",
      en: "A workshop turning bottle caps into keychains, plus a product booth you could pay for with Dobu or Doi Bulu.",
    },
    cta: gallery,
  },
];

const recapCategory: Record<string, WorkCategory> = {
  "annual-games-2026": "piala",
  "piala-bank-indonesia": "piala",
  "piala-idx-kspm-mengajar": "piala",
  "atribut-kawasaran": "budaya",
  "tjf-less-waste-event": "event",
  "workshop-unima-kkn-satgas": "event",
};

const recapFigure: Record<string, string> = {
  "annual-games-2026": "±48 kg",
  "piala-bank-indonesia": "2.169 g",
  "piala-idx-kspm-mengajar": "396 g",
};

const recaps: Work[] = recapProjects.map((p) => ({
  slug: p.slug,
  figure: recapFigure[p.slug],
  category: recapCategory[p.slug] ?? "event",
  href: `/creative/projects/${p.slug}`,
  image: recapPhotoUrl(p, p.hero, true),
  tag: p.card.tag,
  title: p.title,
  partner: p.partner,
  blurb: p.card.blurb,
  cta: p.card.cta,
}));

/** Urutan: yang terbaru dulu. */
export const works: Work[] = [...recaps, ...legacy];
