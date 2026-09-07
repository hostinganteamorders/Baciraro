"use client";

import { useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/lib/i18n/context";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, LogOut, Eye, LogIn, Recycle, Leaf, Palette, Droplets, Timer, CheckCircle, Archive, Pencil, QrCode, Upload, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

type User = { id: number; username: string; name: string } | null;

type Bucket = {
  id: number;
  code: string;
  start_date: string;
  estimated_harvest: string;
  status: string;
  type: string;
  material: string;
  notes: string;
};

type Stats = {
  organic_kg: number;
  inorganic_kg: number;
  products_count: number;
};

type Product = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  story: string;
  materials: string;
  total_plastic_kg: number;
  image_url: string;
  gallery: string;
  artists: string;
  is_active: number;
  weight_g?: number | null;
  print_time_min?: number | null;
  variants?: unknown;
};

const emptyBucket: Bucket = { id: 0, code: "", start_date: "", estimated_harvest: "", status: "fermenting", type: "both", material: "", notes: "" };

const emptyProduct: {
  id?: number; slug: string; title: string; description: string; category: string; story: string;
  materials: string; total_plastic_kg: number; image_url: string; gallery: string; artists: string;
  weight_g: number | null; print_time_min: number | null; variants: string;
} = {
  slug: "", title: "", description: "", category: "craft", story: "",
  materials: "[]", total_plastic_kg: 0, image_url: "", gallery: "[]", artists: "[]",
  weight_g: null, print_time_min: null, variants: "[]",
};

const showcaseProducts = [
  { icon: Recycle, color: "emerald" },
  { icon: Palette, color: "coral" },
  { icon: Leaf, color: "emerald" },
  { icon: Droplets, color: "coral" },
];

export default function CreativeStudioPage() {
  const [mode, setMode] = useState<"gate" | "dashboard">("gate");
  const { t } = useLanguage();
  const [user, setUser] = useState<User>(null);
  const [guestName, setGuestName] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [stats, setStats] = useState<Stats>({ organic_kg: 0, inorganic_kg: 0, products_count: 0 });
  const [showForm, setShowForm] = useState(false);
  const [editingBucket, setEditingBucket] = useState<Bucket | null>(null);
  const [form, setForm] = useState<Bucket>(emptyBucket);

  const [products, setProducts] = useState<Product[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchData = useCallback(async () => {
    const [bucketsRes, statsRes, productsRes] = await Promise.all([
      fetch("/api/buckets"),
      fetch("/api/stats"),
      fetch("/api/products"),
    ]);
    const bData = await bucketsRes.json();
    const sData = await statsRes.json();
    const pData = await productsRes.json();
    setBuckets(bData.buckets);
    setStats(sData.stats);
    setProducts(pData.products);
  }, []);

  const checkSession = useCallback(async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    if (data.user) {
      setUser(data.user);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: loginUsername, password: loginPassword }),
    });
    if (!res.ok) {
      setLoginError(t("creativeStudio.loginError"));
      return;
    }
    const data = await res.json();
    setUser(data.user);
    setShowLoginForm(false);
    setMode("dashboard");
    fetchData();
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setGuestName("");
    setMode("gate");
  };

  const enterAsGuest = () => {
    const name = prompt(t("creativeStudio.namePrompt"));
    setGuestName(name || t("creativeStudio.guestLabel"));
    setMode("dashboard");
  };

  const handleEdit = (bucket: Bucket) => {
    setEditingBucket(bucket);
    setForm(bucket);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm(t("creativeStudio.hapusEmber"))) return;
    await fetch(`/api/buckets/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBucket) {
      await fetch(`/api/buckets/${editingBucket.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/buckets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setShowForm(false);
    setEditingBucket(null);
    setForm(emptyBucket);
    fetchData();
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploadingImage(false);
    return data.url || "";
  };

  const handleAddMaterial = () => {
    const mats = Array.isArray(productForm.materials) ? productForm.materials : JSON.parse(productForm.materials || "[]");
    mats.push({ name: "", amount: 0, unit: "kg" });
    setProductForm({ ...productForm, materials: JSON.stringify(mats) });
  };

  const handleMaterialChange = (i: number, field: string, value: string | number) => {
    const mats = Array.isArray(productForm.materials) ? productForm.materials : JSON.parse(productForm.materials || "[]");
    mats[i][field] = value;
    setProductForm({ ...productForm, materials: JSON.stringify(mats) });
  };

  const handleRemoveMaterial = (i: number) => {
    const mats = Array.isArray(productForm.materials) ? productForm.materials : JSON.parse(productForm.materials || "[]");
    mats.splice(i, 1);
    setProductForm({ ...productForm, materials: JSON.stringify(mats) });
  };

  const parseArtists = () => {
    const raw = productForm.artists;
    if (Array.isArray(raw)) return raw;
    try {
      return JSON.parse(raw || "[]");
    } catch {
      return [];
    }
  };

  const handleAddArtist = () => {
    const artists = parseArtists();
    artists.push({ name: "", role: "", bio: "", photo_url: "" });
    setProductForm({ ...productForm, artists: JSON.stringify(artists) });
  };

  const handleArtistChange = (i: number, field: string, value: string) => {
    const artists = parseArtists();
    artists[i][field] = value;
    setProductForm({ ...productForm, artists: JSON.stringify(artists) });
  };

  const handleRemoveArtist = (i: number) => {
    const artists = parseArtists();
    artists.splice(i, 1);
    setProductForm({ ...productForm, artists: JSON.stringify(artists) });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      slug: product.slug,
      title: product.title,
      description: product.description,
      category: product.category,
      story: product.story,
      materials: typeof product.materials === "string" ? product.materials : JSON.stringify(product.materials || []),
      total_plastic_kg: product.total_plastic_kg,
      image_url: product.image_url,
      gallery: product.gallery,
      artists: typeof product.artists === "string" ? product.artists : JSON.stringify(product.artists || []),
      weight_g: product.weight_g ?? null,
      print_time_min: product.print_time_min ?? null,
      variants: typeof product.variants === "string" ? product.variants : JSON.stringify(product.variants || []),
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (slug: string) => {
    if (!confirm(t("creativeStudio.hapusProduk"))) return;
    await fetch(`/api/products/${slug}`, { method: "DELETE" });
    fetchData();
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...productForm };
    if (editingProduct) {
      await fetch(`/api/products/${editingProduct.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setShowProductForm(false);
    setEditingProduct(null);
    setProductForm(emptyProduct);
    setSelectedFile(null);
    fetchData();
  };

  const handleEditStats = async () => {
    const og = prompt(t("creativeStudio.sampahOrganikLabel"), String(stats.organic_kg));
    if (og === null) return;
    const inog = prompt(t("creativeStudio.sampahAnorganikLabel"), String(stats.inorganic_kg));
    if (inog === null) return;
    const pc = prompt(t("creativeStudio.jumlahProdukLabel"), String(stats.products_count));
    if (pc === null) return;
    await fetch("/api/stats", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ organic_kg: parseFloat(og), inorganic_kg: parseFloat(inog), products_count: parseInt(pc) }),
    });
    fetchData();
  };

  if (mode === "gate") {
    return (
      <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
        <div aria-hidden="true" className="page-bg" />
        <div className="relative z-[1]">
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
        <Header subtitle={t("creativeStudio.gateTitle")} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <section className="min-h-[80vh] flex flex-col items-center justify-center text-center py-20">
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: springEase }}>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {t("creativeStudio.gateTitle")}
              </p>
              <h1 className="mt-6 font-serif text-[clamp(48px,7vw,88px)] font-normal leading-[1.08] tracking-[-0.04em] text-white">
                {t("creativeStudio.gateFrom")}<br /><span className="text-emerald-400">{t("creativeStudio.gateTo")}</span>
              </h1>
              <p className="mt-4 max-w-[520px] mx-auto text-[15px] text-zinc-300 leading-relaxed">
                {t("creativeStudio.gateDesc")}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: springEase }} className="mt-12 flex flex-col sm:flex-row gap-4">
              <button onClick={() => setShowLoginForm(true)} className="inline-flex items-center gap-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 text-sm font-bold tracking-wider uppercase transition-all hover:gap-4 hover:scale-[1.02]">
                <LogIn className="h-4 w-4" />
                {t("creativeStudio.login")}
              </button>
              <button onClick={enterAsGuest} className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-4 text-sm font-bold tracking-wider uppercase transition-all hover:gap-4 hover:scale-[1.02]">
                <Eye className="h-4 w-4" />
                {t("creativeStudio.masukGuest")}
              </button>
            </motion.div>

            <AnimatePresence>
              {showLoginForm && (
                <motion.form initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onSubmit={handleLogin} className="mt-8 w-full max-w-[380px] rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 space-y-4">
                  <input value={loginUsername} onChange={e => setLoginUsername(e.target.value)} placeholder={t("creativeStudio.username")} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40 transition-colors" />
                  <input value={loginPassword} onChange={e => setLoginPassword(e.target.value)} type="password" placeholder={t("creativeStudio.password")} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40 transition-colors" />
                  {loginError && <p className="text-xs text-[#f87171]">{loginError}</p>}
                  <button type="submit" className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black py-3 text-sm font-bold tracking-wider uppercase transition-all">{t("creativeStudio.loginButton")}</button>
                </motion.form>
              )}
            </AnimatePresence>
          </section>
        </div>
        <Footer />
        </div>
      </main>
    );
  }

  const isAdmin = !!user;
  const displayName = user?.name || guestName || t("creativeStudio.guestLabel");

  const statusBadge = (s: string) => {
    const map: Record<string, { label: string; color: string }> = {
      fermenting: { label: t("creativeStudio.statusFermentasi"), color: "bg-amber-500/20 text-amber-300 border-amber-500/20" },
      ready: { label: t("creativeStudio.statusSiapPanen"), color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/20" },
      harvested: { label: t("creativeStudio.statusSudahDipanen"), color: "bg-zinc-500/20 text-zinc-400 border-zinc-500/20" },
    };
    const m = map[s] || map.fermenting;
    return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${m.color}`}>{m.label}</span>;
  };

  const typeLabel = (type: string) => {
    const map: Record<string, string> = { compost: t("creativeStudio.typeKompos"), liquid: t("creativeStudio.typePoc"), both: t("creativeStudio.typeKomposPoc") };
    return map[type] || type;
  };

  return (
    <main className="relative min-h-screen text-[#fafafa] overflow-hidden">
      <div aria-hidden="true" className="page-bg" />
      <div className="relative z-[1]">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] bg-noise" />
      <Header subtitle={t("creativeStudio.gateTitle")} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Bar */}
        <section className="pt-6 pb-2 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("creativeStudio.gateTitle")}</p>
            <h1 className="font-serif text-[28px] font-normal text-white mt-1">{t("creativeStudio.dashboard")}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400">{t("creativeStudio.hello")}<span className="text-white font-semibold">{displayName}</span></span>
            {isAdmin && (
              <>
                <Link href="/dashboard/qr" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-400 hover:text-emerald-400 transition-all">
                  <QrCode className="h-3 w-3" />
                  {t("creativeStudio.qrDashboard")}
                </Link>
                <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-400 hover:text-[#f87171] transition-all">
                  <LogOut className="h-3 w-3" />
                  {t("creativeStudio.logout")}
                </button>
              </>
            )}
            {!isAdmin && (
              <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-400 hover:text-[#f87171] transition-all">
                {t("creativeStudio.kembali")}
              </button>
            )}
          </div>
        </section>

        {/* Stats */}
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: springEase }} className="py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("creativeStudio.dampakTerukur")}</p>
            {isAdmin && (
              <button onClick={handleEditStats} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#f87171] transition-all">
                <Pencil className="h-3 w-3" />
                {t("creativeStudio.editData")}
              </button>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: t("creativeStudio.sampahOrganik"), value: `${stats.organic_kg} ${t("creativeStudio.satuanKg")}`, icon: Leaf, color: "emerald" },
              { label: t("creativeStudio.sampahAnorganik"), value: `${stats.inorganic_kg} ${t("creativeStudio.satuanKg")}`, icon: Recycle, color: "coral" },
              { label: t("creativeStudio.produkDihasilkan"), value: `${stats.products_count}`, icon: Archive, color: "emerald" },
            ].map((item) => (
              <div key={item.label} className="rounded-[20px] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6 transition-all hover:border-white/[0.12]">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${item.color === "emerald" ? "bg-emerald-500/10 text-emerald-400" : "bg-[#f87171]/10 text-[#f87171]"}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{item.label}</p>
                </div>
                <p className={`font-serif text-[32px] font-normal leading-tight ${item.color === "emerald" ? "text-emerald-400" : "text-[#f87171]"}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Products */}
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: springEase }} className="py-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400 pb-3 border-b border-white/[0.05] mb-8">{t("creativeStudio.produkJadi")}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {showcaseProducts.map((product, i) => (
              <div key={i} className="group rounded-[20px] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6 transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-0.5">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${product.color === "emerald" ? "bg-emerald-500/10 text-emerald-400" : "bg-[#f87171]/10 text-[#f87171]"}`}>
                  <product.icon className="h-6 w-6" />
                </div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 mb-1">{t("creativeStudio.showcase." + i + ".label")}</p>
                <h3 className="font-serif text-[17px] font-normal text-white">{t("creativeStudio.showcase." + i + ".title")}</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{t("creativeStudio.showcase." + i + ".desc")}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Ember Kompos Tracker */}
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: springEase }} className="py-10 pb-20">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.05] mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("creativeStudio.emberTracker")}</p>
            {isAdmin && (
              <button onClick={() => { setEditingBucket(null); setForm(emptyBucket); setShowForm(true); }} className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 text-[10px] font-bold tracking-wider uppercase transition-all hover:gap-3">
                <Plus className="h-3 w-3" />
                {t("creativeStudio.tambahEmber")}
              </button>
            )}
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} onSubmit={handleSave} className="mb-8 overflow-hidden">
                <div className="rounded-[20px] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{editingBucket ? t("creativeStudio.editEmber") : t("creativeStudio.tambahEmberBaru")}</p>
                    <button type="button" onClick={() => { setShowForm(false); setEditingBucket(null); }} className="text-zinc-500 hover:text-[#f87171] transition-colors"><X className="h-4 w-4" /></button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <input value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder={t("creativeStudio.kodeEmber")} required className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                    <input value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} type="date" required className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/40 [color-scheme:dark]" />
                    <input value={form.estimated_harvest} onChange={e => setForm({ ...form, estimated_harvest: e.target.value })} type="date" required className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/40 [color-scheme:dark]" />
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/40">
                      <option value="fermenting">{t("creativeStudio.statusFermentasi")}</option>
                      <option value="ready">{t("creativeStudio.statusSiapPanen")}</option>
                      <option value="harvested">{t("creativeStudio.statusSudahDipanen")}</option>
                    </select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/40">
                      <option value="both">{t("creativeStudio.typeKomposPoc")}</option>
                      <option value="compost">{t("creativeStudio.typeKompos")}</option>
                      <option value="liquid">{t("creativeStudio.typePoc")}</option>
                    </select>
                    <input value={form.material} onChange={e => setForm({ ...form, material: e.target.value })} placeholder={t("creativeStudio.bahanBaku")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                  </div>
                  <input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder={t("creativeStudio.catatan")} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                  <button type="submit" className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black py-3 text-sm font-bold tracking-wider uppercase transition-all">
                    {editingBucket ? t("creativeStudio.simpanPerubahan") : t("creativeStudio.tambahEmberBtn")}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {buckets.length === 0 ? (
            <div className="rounded-[20px] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-12 text-center">
              <Timer className="h-10 w-10 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm">{t("creativeStudio.emberKosong")}</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {buckets.map((bucket, i) => (
                <motion.div key={bucket.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05, ease: springEase }} className="rounded-[20px] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-5 sm:p-6 transition-all hover:border-white/[0.12]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <span className="font-bold text-sm text-emerald-400">{bucket.code.replace("EMBR-", "")}</span>
                      </div>
                      <div>
                        <Link href={`/compost/${bucket.code}`} className="font-serif text-[17px] text-white hover:text-emerald-400 transition-colors">{bucket.code}</Link>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {statusBadge(bucket.status)}
                          <span className="text-[10px] text-zinc-500">{typeLabel(bucket.type)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-400">
                      <div className="flex items-center gap-1.5"><Timer className="h-3 w-3" /> {t("creativeStudio.fermentasiLabel")} {bucket.start_date}</div>
                      <div className="flex items-center gap-1.5"><CheckCircle className="h-3 w-3 text-emerald-400" /> {t("creativeStudio.panenLabel")} {bucket.estimated_harvest}</div>
                      {isAdmin && (
                        <div className="flex gap-2 ml-auto">
                          <button onClick={() => handleEdit(bucket)} className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-400 hover:text-emerald-400 transition-all"><Pencil className="h-3 w-3" /></button>
                          <button onClick={() => handleDelete(bucket.id)} className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-400 hover:text-[#f87171] transition-all"><X className="h-3 w-3" /></button>
                        </div>
                      )}
                    </div>
                  </div>
                  {bucket.material && <p className="mt-3 text-xs text-zinc-500">{t("creativeStudio.bahanLabel")} {bucket.material}</p>}
                  {bucket.notes && <p className="mt-1 text-xs text-zinc-600 italic">{bucket.notes}</p>}
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Product Management */}
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: springEase }} className="py-10 pb-20">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.05] mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400">{t("creativeStudio.manajemenProduk")}</p>
            {isAdmin && (
              <button onClick={() => { setEditingProduct(null); setProductForm(emptyProduct); setSelectedFile(null); setShowProductForm(true); }} className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 text-[10px] font-bold tracking-wider uppercase transition-all hover:gap-3">
                <Plus className="h-3 w-3" />
                {t("creativeStudio.tambahProduk")}
              </button>
            )}
          </div>

          <AnimatePresence>
            {showProductForm && (
              <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} onSubmit={handleSaveProduct} className="mb-8 overflow-hidden">
                <div className="rounded-[20px] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{editingProduct ? t("creativeStudio.editProduk") : t("creativeStudio.tambahProdukBaru")}</p>
                    <button type="button" onClick={() => { setShowProductForm(false); setEditingProduct(null); }} className="text-zinc-500 hover:text-[#f87171] transition-colors"><X className="h-4 w-4" /></button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input value={productForm.title} onChange={e => setProductForm({ ...productForm, title: e.target.value })} placeholder={t("creativeStudio.namaProduk")} required className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                    <input value={productForm.slug} onChange={e => setProductForm({ ...productForm, slug: e.target.value })} placeholder={t("creativeStudio.slugProduk")} required className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                  </div>

                  <textarea value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} placeholder={t("creativeStudio.deskripsiSingkat")} rows={2} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />

                  <div className="grid gap-4 sm:grid-cols-3">
                    <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/40">
                      <option value="plastic">{t("products.plastic")}</option>
                      <option value="organic">{t("products.organic")}</option>
                      <option value="craft">{t("products.craft")}</option>
                      <option value="digital">{t("products.digital")}</option>
                      <option value="art">{t("products.art")}</option>
                      <option value="3dprint">{t("products.3dprint")}</option>
                    </select>
                    <input value={productForm.total_plastic_kg || ""} onChange={e => setProductForm({ ...productForm, total_plastic_kg: parseFloat(e.target.value) || 0 })} type="number" step="0.1" placeholder={t("creativeStudio.totalPlastik")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                  </div>

                  <textarea value={productForm.story} onChange={e => setProductForm({ ...productForm, story: e.target.value })} placeholder={t("creativeStudio.ceritaProdukLabel")} rows={4} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />

                  {/* Image Upload */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">{t("creativeStudio.gambarUtama")}</p>
                    <div className="flex items-center gap-3">
                      <input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setSelectedFile(file);
                        const url = await handleImageUpload(file);
                        if (url) setProductForm({ ...productForm, image_url: url });
                      }} className="text-xs text-zinc-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:bg-emerald-500 file:text-black hover:file:bg-emerald-400" />
                      {uploadingImage && <span className="text-xs text-zinc-500">{t("creativeStudio.uploading")}</span>}
                      {productForm.image_url && <span className="text-xs text-emerald-400">✓ {t("creativeStudio.gambarTerupload")}</span>}
                    </div>
                  </div>

                  {/* 3D Print: weight, time, variants */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input value={productForm.weight_g ?? ""} onChange={e => setProductForm({ ...productForm, weight_g: parseInt(e.target.value) || null })} type="number" min="0" placeholder={t("creativeStudio.berat")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                    <input value={productForm.print_time_min ?? ""} onChange={e => setProductForm({ ...productForm, print_time_min: parseInt(e.target.value) || null })} type="number" min="0" placeholder={t("creativeStudio.waktuCetak")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                  </div>
                  <textarea value={typeof productForm.variants === "string" ? productForm.variants : JSON.stringify(productForm.variants || [])} onChange={e => setProductForm({ ...productForm, variants: e.target.value })} placeholder={t("creativeStudio.varian")} rows={3} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />

                  {/* Materials */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{t("creativeStudio.material")}</p>
                      <button type="button" onClick={handleAddMaterial} className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold">{t("creativeStudio.tambahMaterial")}</button>
                    </div>
                    <div className="space-y-2">
                      {(Array.isArray(productForm.materials) ? productForm.materials : JSON.parse(productForm.materials || "[]")).map((mat: { name: string; amount: number; unit: string }, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <input value={mat.name} onChange={e => handleMaterialChange(i, "name", e.target.value)} placeholder={t("creativeStudio.namaMaterial")} className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                          <input value={mat.amount || ""} onChange={e => handleMaterialChange(i, "amount", parseFloat(e.target.value) || 0)} type="number" step="0.1" placeholder={t("creativeStudio.jumlah")} className="w-24 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                          <select value={mat.unit} onChange={e => handleMaterialChange(i, "unit", e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/40">
                            <option value="kg">{t("creativeStudio.satuanKg")}</option>
                            <option value="gram">{t("creativeStudio.satuanGram")}</option>
                            <option value="meter">{t("creativeStudio.satuanMeter")}</option>
                            <option value="buah">{t("creativeStudio.satuanBuah")}</option>
                          </select>
                          <button type="button" onClick={() => handleRemoveMaterial(i)} className="text-zinc-500 hover:text-[#f87171] transition-colors"><X className="h-4 w-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Artists */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{t("creativeStudio.seniman")}</p>
                      <button type="button" onClick={handleAddArtist} className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold">{t("creativeStudio.tambahSeniman")}</button>
                    </div>
                    <div className="space-y-4">
                      {parseArtists().map((artist: { name: string; role: string; bio: string; photo_url: string }, i: number) => (
                        <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{t("creativeStudio.seniman")} #{i + 1}</p>
                            <button type="button" onClick={() => handleRemoveArtist(i)} className="text-zinc-500 hover:text-[#f87171] transition-colors"><X className="h-4 w-4" /></button>
                          </div>
                          <div className="grid gap-2 sm:grid-cols-2">
                            <input value={artist.name} onChange={e => handleArtistChange(i, "name", e.target.value)} placeholder={t("creativeStudio.namaSeniman")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                            <input value={artist.role} onChange={e => handleArtistChange(i, "role", e.target.value)} placeholder={t("creativeStudio.peranSeniman")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                          </div>
                          <textarea value={artist.bio} onChange={e => handleArtistChange(i, "bio", e.target.value)} placeholder={t("creativeStudio.bioSeniman")} rows={2} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">{t("creativeStudio.fotoSeniman")}</p>
                            <div className="flex items-center gap-3">
                              <input type="file" accept="image/*" onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const url = await handleImageUpload(file);
                                if (url) handleArtistChange(i, "photo_url", url);
                              }} className="text-xs text-zinc-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:bg-emerald-500 file:text-black hover:file:bg-emerald-400" />
                              {uploadingImage && <span className="text-xs text-zinc-500">{t("creativeStudio.uploading")}</span>}
                              {artist.photo_url && <span className="text-xs text-emerald-400">✓ {t("creativeStudio.fotoSenimanTerupload")}</span>}
                            </div>
                            <input value={artist.photo_url} onChange={e => handleArtistChange(i, "photo_url", e.target.value)} placeholder="/Appy Pongtuluran.png" className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black py-3 text-sm font-bold tracking-wider uppercase transition-all">
                    {editingProduct ? t("creativeStudio.simpanProduk") : t("creativeStudio.tambahProdukBtn")}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {products.length === 0 ? (
            <div className="rounded-[20px] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-12 text-center">
              <Package className="h-10 w-10 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm">{t("creativeStudio.produkKosong")}</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {products.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05, ease: springEase }} className="rounded-[20px] border border-white/[0.07] bg-white/[0.02] backdrop-blur p-5 sm:p-6 transition-all hover:border-white/[0.12]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                        {product.image_url ? (
                          <Image src={product.image_url} alt="" width={48} height={48} className="rounded-full object-cover h-full w-full" />
                        ) : (
                          <Package className="h-5 w-5 text-emerald-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-serif text-[17px] text-white truncate">{product.title}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border border-zinc-500/20 bg-zinc-500/10 text-zinc-400">{product.category}</span>
                          {product.total_plastic_kg > 0 && (
                            <span className="text-[10px] text-emerald-400">{product.total_plastic_kg} {t("creativeStudio.kgPlastik")}</span>
                          )}
                        </div>
                        {(() => {
                          const artists = typeof product.artists === "string" ? product.artists : JSON.stringify(product.artists || []);
                          let names: string[] = [];
                          try {
                            names = (JSON.parse(artists || "[]") as { name?: string }[]).map((a) => a.name).filter((n): n is string => Boolean(n));
                          } catch {}
                          return names.length > 0 ? (
                            <p className="mt-1 text-[10px] text-[#f2d479] truncate">
                              {names.join(", ")}
                            </p>
                          ) : null;
                        })()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Link href={`/products/${product.slug}`} className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-400 hover:text-emerald-400 transition-all">
                        <QrCode className="h-3 w-3" />
                      </Link>
                      {isAdmin && (
                        <>
                          <button onClick={() => handleEditProduct(product)} className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-400 hover:text-emerald-400 transition-all"><Pencil className="h-3 w-3" /></button>
                          <button onClick={() => handleDeleteProduct(product.slug)} className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-400 hover:text-[#f87171] transition-all"><X className="h-3 w-3" /></button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>

      <Footer />
      </div>
    </main>
  );
}
