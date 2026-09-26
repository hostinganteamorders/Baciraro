"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	Recycle,
	Leaf,
	Palette,
	Code2,
	Paintbrush,
	Cpu,
	MessageCircle,
	Search,
	ArrowDownWideNarrow,
	Tags,
	Printer,
	ArrowRight,
	Building2,
	User,
	RotateCcw,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { formatRupiah, formatMinutes } from "@/lib/pricing";
import {
	buildCatalogCards,
	sortCatalogCards,
	featuredSlugs,
	featureProjectKey,
	type CatalogCard,
	type CatalogSort,
	type RawProduct,
} from "@/lib/product-curation";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const WA_NUMBER = "6288212835350";

const priceRanges = [
	{ key: "all", min: 0, max: Infinity },
	{ key: "under50", min: 0, max: 50000 },
	{ key: "50to150", min: 50000, max: 150000 },
	{ key: "150to300", min: 150000, max: 300000 },
	{ key: "over300", min: 300000, max: Infinity },
];

const priceRangeLabels: Record<string, string> = {
	all: "all",
	under50: "≤ Rp 50rb",
	"50to150": "Rp 50–150rb",
	"150to300": "Rp 150–300rb",
	over300: "Rp 300rb+",
};

const categoryIcons: Record<string, typeof Recycle> = {
	plastic: Recycle,
	organic: Leaf,
	craft: Palette,
	digital: Code2,
	art: Paintbrush,
	"3dprint": Cpu,
};

const categoryColors: Record<string, string> = {
	plastic: "bg-blue-500/10 text-blue-400 border-blue-500/20",
	organic: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
	craft: "bg-amber-500/10 text-amber-400 border-amber-500/20",
	digital: "bg-purple-500/10 text-purple-400 border-purple-500/20",
	art: "bg-[#f2d479]/10 text-[#f2d479] border-[#f2d479]/20",
	"3dprint": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
	custom: "bg-white/10 text-zinc-200 border-white/20",
};

const categoryOrder = ["plastic", "craft", "art", "organic", "custom", "digital", "3dprint"];

function categoryLabel(t: (key: string) => string, category: string): string {
	const label = t("products." + category);
	return label.startsWith("products.") ? category : label;
}

function waLink(message: string): string {
	return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

function ProductCard({ card, index }: { card: CatalogCard; index: number }) {
	const { t } = useLanguage();
	const [imgFailed, setImgFailed] = useState(false);
	const showImage = Boolean(card.imageUrl) && !imgFailed;

	const message = card.isCustom
		? t("products.customWaMessage", { name: card.title })
		: card.price == null
			? t("catalog.hargaWaMessage", { title: card.title })
			: t("products.waMessage", { title: card.title });

	const ctaLabel =
		!card.isCustom && card.price == null ? t("catalog.hargaTanya") : t("products.pesan");

	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: Math.min(index, 8) * 0.05, ease: springEase }}
			className="h-full"
		>
			<div className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-1">
				<Link href={card.href} className="block">
					<div className="relative aspect-[16/10] overflow-hidden bg-zinc-900/50">
						{showImage ? (
							<Image
								src={card.imageUrl}
								alt={card.title}
								fill
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
								className="object-cover transition-transform duration-500 group-hover:scale-105"
								onError={() => setImgFailed(true)}
							/>
						) : (
							<div className="absolute inset-0 flex items-center justify-center">
								<Recycle className="h-10 w-10 text-zinc-700" />
							</div>
						)}
						<span
							className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-wider ${
								categoryColors[card.category] || "border-white/10 bg-white/5 text-zinc-300"
							}`}
						>
							{categoryLabel(t, card.category)}
						</span>
						{card.isProject && (
							<span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">
								{t("catalog.studiKasus")}
							</span>
						)}
					</div>
					<div className="p-5">
						{card.weightG != null && (
							<div className="mb-3 flex flex-wrap items-center gap-2">
								<span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400">
									<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />±{card.weightG} g ·
									PLA
								</span>
								{card.printTimeMin != null && (
									<span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-zinc-300">
										{formatMinutes(card.printTimeMin)}
									</span>
								)}
							</div>
						)}
						<h3 className="font-serif text-[17px] text-white transition-colors group-hover:text-emerald-400">
							{card.title}
						</h3>
						<p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-400">
							{card.description}
						</p>
					</div>
				</Link>
				<div className="mt-auto flex items-center justify-between gap-3 px-5 pb-5">
					<div className="min-w-0">
						{card.price != null ? (
							<span className="text-[11px] font-bold text-emerald-300">
								{t("products.dari")} {formatRupiah(card.price)}
							</span>
						) : card.isProject && card.materialLabel ? (
							<span className="block truncate text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
								{card.materialLabel}
							</span>
						) : card.totalKg > 0 ? (
							<span className="block truncate text-[10px] font-semibold text-emerald-400">
								{t("products.bahanTerselamatkan", { kg: card.totalKg })}
							</span>
						) : (
							<span className="block truncate text-[10px] font-semibold text-zinc-500">
								{card.isCustom ? "" : t("catalog.hargaTanyaFull")}
							</span>
						)}
					</div>
					<a
						href={waLink(message)}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold text-emerald-400 transition-all hover:bg-emerald-500 hover:text-black"
					>
						<MessageCircle className="h-3 w-3" />
						{ctaLabel}
					</a>
				</div>
			</div>
		</motion.div>
	);
}

function MiniCard({ card, index }: { card: CatalogCard; index: number }) {
	const { t } = useLanguage();
	const [imgFailed, setImgFailed] = useState(false);
	const showImage = Boolean(card.imageUrl) && !imgFailed;
	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.05 * index, ease: springEase }}
		>
			<Link
				href={card.href}
				className="group block overflow-hidden rounded-[1.25rem] border border-white/[0.07] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-1"
			>
				<div className="relative aspect-[4/3] overflow-hidden bg-zinc-900/50">
					{showImage ? (
						<Image
							src={card.imageUrl}
							alt={card.title}
							fill
							sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							onError={() => setImgFailed(true)}
						/>
					) : (
						<div className="absolute inset-0 flex items-center justify-center">
							<Recycle className="h-8 w-8 text-zinc-700" />
						</div>
					)}
				</div>
				<div className="p-4">
					<h3 className="font-serif text-[15px] leading-snug text-white transition-colors group-hover:text-emerald-400">
						{card.title}
					</h3>
					<p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-zinc-500">
						{card.description}
					</p>
					<p className="mt-2 text-[11px] font-bold text-emerald-300">
						{card.price != null
							? `${t("products.dari")} ${formatRupiah(card.price)}`
							: t("catalog.hargaTanyaFull")}
					</p>
				</div>
			</Link>
		</motion.div>
	);
}

function SectionHeading({
	titleKey,
	accentKey,
	subtitleKey,
	count,
}: {
	titleKey: string;
	accentKey: string;
	subtitleKey: string;
	count: number;
}) {
	const { t } = useLanguage();
	return (
		<div className="flex flex-wrap items-end justify-between gap-3">
			<div>
				<h2 className="text-[26px] leading-tight text-white sm:text-3xl">
					{t(titleKey)}{" "}
					<span className="font-serif italic text-emerald-400">{t(accentKey)}</span>
				</h2>
				<p className="mt-2 max-w-2xl text-sm text-zinc-400">{t(subtitleKey)}</p>
			</div>
			<span className="text-xs text-zinc-500">{t("products.jumlahProduk", { count })}</span>
		</div>
	);
}

function LoadMoreButton({ onClick, remaining }: { onClick: () => void; remaining: number }) {
	const { t } = useLanguage();
	if (remaining <= 0) return null;
	return (
		<div className="mt-8 flex justify-center">
			<button
				onClick={onClick}
				className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition-all hover:border-white/20 hover:bg-white/10"
			>
				{t("catalog.muatLebihBanyak")}
				<span className="text-zinc-500">+{remaining}</span>
			</button>
		</div>
	);
}

function SkeletonGrid({ cols }: { cols: string }) {
	return (
		<div className={`mt-10 grid gap-5 ${cols}`}>
			{Array.from({ length: 6 }).map((_, i) => (
				<div
					key={i}
					className="animate-pulse overflow-hidden rounded-[1.5rem] border border-white/5 bg-white/[0.02]"
				>
					<div className="aspect-[16/10] bg-white/5" />
					<div className="space-y-3 p-5">
						<div className="h-3 w-3/4 rounded-full bg-white/5" />
						<div className="h-3 w-1/2 rounded-full bg-white/5" />
					</div>
				</div>
			))}
		</div>
	);
}

export default function ProductsPage() {
	const { t } = useLanguage();
	const [products, setProducts] = useState<RawProduct[]>([]);
	const [activeCategory, setActiveCategory] = useState("all");
	const [query, setQuery] = useState("");
	const [sort, setSort] = useState<CatalogSort>("newest");
	const [priceRange, setPriceRange] = useState("all");
	const [loading, setLoading] = useState(true);
	const [visible3d, setVisible3d] = useState(12);
	const [visibleAll, setVisibleAll] = useState(24);
	const [featureImgFailed, setFeatureImgFailed] = useState(false);

	useEffect(() => {
		fetch("/api/products")
			.then((res) => res.json())
			.then((data) => setProducts(Array.isArray(data?.products) ? data.products : []))
			.catch(() => setProducts([]))
			.finally(() => setLoading(false));
	}, []);

	const cards = useMemo(() => buildCatalogCards(products), [products]);

	const stats = useMemo(() => {
		const categories = new Set(cards.map((c) => c.category));
		const totalKg = cards.reduce((sum, c) => sum + c.totalKg, 0);
		return { total: cards.length, categories: categories.size, totalKg };
	}, [cards]);

	const categoryCounts = useMemo(() => {
		const map = new Map<string, number>();
		cards.forEach((c) => map.set(c.category, (map.get(c.category) || 0) + 1));
		return map;
	}, [cards]);

	const categoryKeys = useMemo(() => {
		return [...categoryCounts.keys()].sort(
			(a, b) =>
				(categoryOrder.indexOf(a) === -1 ? 99 : categoryOrder.indexOf(a)) -
				(categoryOrder.indexOf(b) === -1 ? 99 : categoryOrder.indexOf(b))
		);
	}, [categoryCounts]);

	const filtered = useMemo(() => {
		let list = cards;
		if (activeCategory !== "all") list = list.filter((c) => c.category === activeCategory);
		if (query.trim()) {
			const q = query.trim().toLowerCase();
			list = list.filter(
				(c) =>
					c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
			);
		}
		if (priceRange !== "all") {
			const range = priceRanges.find((r) => r.key === priceRange) || priceRanges[0];
			list = list.filter((c) => {
				if (c.price == null) return true;
				return c.price >= range.min && c.price < range.max;
			});
		}
		return list;
	}, [cards, activeCategory, query, priceRange]);

	const sorted = useMemo(() => sortCatalogCards(filtered, sort), [filtered, sort]);

	const isDefaultView =
		activeCategory === "all" && !query.trim() && priceRange === "all" && sort === "newest";

	const craftList = useMemo(
		() => (isDefaultView ? sorted.filter((c) => c.category !== "3dprint") : []),
		[sorted, isDefaultView]
	);
	const threedList = useMemo(
		() => (isDefaultView ? sorted.filter((c) => c.category === "3dprint") : []),
		[sorted, isDefaultView]
	);

	const feature = useMemo(() => cards.find((c) => c.key === featureProjectKey), [cards]);
	const picks = useMemo(
		() =>
			featuredSlugs
				.map((slug) => cards.find((c) => c.slug === slug))
				.filter((c): c is CatalogCard => Boolean(c)),
		[cards]
	);

	const filterKey = `${activeCategory}|${query}|${priceRange}|${sort}`;
	const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
	if (prevFilterKey !== filterKey) {
		setPrevFilterKey(filterKey);
		setVisible3d(12);
		setVisibleAll(24);
	}

	const resetFilters = () => {
		setActiveCategory("all");
		setQuery("");
		setPriceRange("all");
		setSort("newest");
	};

	const scrollToCatalog = () => {
		document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<main className="relative min-h-screen overflow-hidden text-[#fafafa]">
			<div aria-hidden="true" className="page-bg" />
			<div className="relative z-[1]">
				<div className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.08]" />
				<Header subtitle={t("products.title")} />

				<div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
					{/* Hero */}
					<motion.div
						initial={{ opacity: 0, y: 32 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.9, ease: springEase }}
					>
						<p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400 backdrop-blur">
							<span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
							{t("products.title")}
						</p>
						<h1 className="mt-6 font-serif text-[clamp(40px,6vw,72px)] font-normal leading-[1.08] tracking-[-0.04em] text-white">
							{t("products.headline")}
							<br />
							<span className="italic text-emerald-400">{t("products.headlineHighlight")}</span>
						</h1>
						<p className="mt-4 max-w-[600px] text-[15px] leading-relaxed text-zinc-300">
							{t("products.subtitle")}
						</p>

						{!loading && (
							<div className="mt-6 flex flex-wrap gap-2">
								<span className="inline-flex items-baseline gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2">
									<span className="text-sm font-bold text-white">{stats.total}</span>
									<span className="text-[11px] uppercase tracking-wider text-zinc-400">
										{t("catalog.chipProduk")}
									</span>
								</span>
								<span className="inline-flex items-baseline gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2">
									<span className="text-sm font-bold text-white">{stats.categories}</span>
									<span className="text-[11px] uppercase tracking-wider text-zinc-400">
										{t("catalog.chipKategori")}
									</span>
								</span>
								{!loading && stats.totalKg > 0 && (
									<span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-[11px] font-semibold text-emerald-400">
										{t("products.bahanTerselamatkan", { kg: stats.totalKg })}
									</span>
								)}
							</div>
						)}

						<div className="mt-7 flex flex-wrap gap-3">
							<button
								onClick={scrollToCatalog}
								className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:bg-zinc-100"
							>
								{t("catalog.ctaJelajahi")}
								<ArrowRight className="h-4 w-4" />
							</button>
							<Link
								href="/products/print"
								className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10"
							>
								<Printer className="h-4 w-4" />
								{t("catalog.cetakKatalog")}
							</Link>
						</div>
					</motion.div>

					{/* Audience band */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.15, ease: springEase }}
						className="mt-12 grid gap-4 lg:grid-cols-2"
					>
						<div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 backdrop-blur sm:p-8">
							<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-300">
								<User className="h-3 w-3" />
								{t("catalog.kamuLabel")}
							</span>
							<h3 className="mt-4 font-serif text-2xl text-white">{t("catalog.kamuTitle")}</h3>
							<p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
								{t("catalog.kamuDesc")}
							</p>
							<button
								onClick={scrollToCatalog}
								className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold text-black transition-all hover:bg-zinc-100"
							>
								{t("catalog.kamuCta")}
								<ArrowRight className="h-3.5 w-3.5" />
							</button>
						</div>
						<div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/[0.03] p-6 backdrop-blur sm:p-8">
							<span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400">
								<Building2 className="h-3 w-3" />
								{t("catalog.korporatLabel")}
							</span>
							<h3 className="mt-4 font-serif text-2xl text-white">{t("catalog.korporatTitle")}</h3>
							<p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
								{t("catalog.korporatDesc")}
							</p>
							<Link
								href="/products/custom"
								className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-500 hover:text-black"
							>
								{t("catalog.korporatCta")}
								<ArrowRight className="h-3.5 w-3.5" />
							</Link>
						</div>
					</motion.div>

					{/* Featured collection */}
					{isDefaultView && !loading && feature && (
						<section className="mt-14">
							<div className="flex flex-wrap items-end justify-between gap-3">
								<div>
									<h2 className="text-[26px] leading-tight text-white sm:text-3xl">
										{t("catalog.kurasiTitle")}{" "}
										<span className="font-serif italic text-emerald-400">
											{t("catalog.kurasiAccent")}
										</span>
									</h2>
									<p className="mt-2 max-w-2xl text-sm text-zinc-400">
										{t("catalog.kurasiSubtitle")}
									</p>
								</div>
								<span className="text-xs text-zinc-500">
									{t("products.jumlahProduk", { count: picks.length + 1 })}
								</span>
							</div>

							<div className="mt-6 grid gap-4 lg:grid-cols-3">
								<Link
									href={feature.href}
									className={`group relative block aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] ${
										picks.length ? "lg:aspect-auto lg:col-span-1" : "lg:col-span-3"
									}`}
								>
									{featureImgFailed || !feature.imageUrl ? (
										<div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
											<Recycle className="h-12 w-12 text-zinc-700" />
										</div>
									) : (
										<Image
											src={feature.imageUrl}
											alt={feature.title}
											fill
											sizes="(max-width: 1024px) 100vw, 33vw"
											className="object-cover transition-transform duration-700 group-hover:scale-105"
											onError={() => setFeatureImgFailed(true)}
										/>
									)}
									<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
									<div className="absolute inset-x-0 bottom-0 p-6">
										<span className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400">
											{t("catalog.featureLabel")}
										</span>
										<h3 className="mt-2 font-serif text-2xl text-white">{feature.title}</h3>
										<p className="mt-2 line-clamp-3 max-w-md text-xs leading-relaxed text-zinc-300">
											{feature.description}
										</p>
										<span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
											{t("catalog.studiKasus")}
											<ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
										</span>
									</div>
								</Link>
								{picks.length > 0 && (
									<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-2">
										{picks.map((card, i) => (
											<MiniCard key={card.key} card={card} index={i} />
										))}
									</div>
								)}
							</div>
						</section>
					)}

					{/* Catalog */}
					<section id="katalog" className="mt-14 scroll-mt-24">
						{/* Category filters */}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2, ease: springEase }}
							className="flex flex-wrap gap-2"
						>
							<button
								onClick={() => setActiveCategory("all")}
								className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
									activeCategory === "all"
										? "bg-emerald-500 text-black"
										: "border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
								}`}
							>
								{t("products.semua")}
								<span
									className={
										activeCategory === "all" ? "text-black/60" : "text-zinc-600"
									}
								>
									({cards.length})
								</span>
							</button>
							{categoryKeys.map((key) => {
								const Icon = categoryIcons[key];
								const active = activeCategory === key;
								return (
									<button
										key={key}
										onClick={() => setActiveCategory(key)}
										className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
											active
												? "bg-emerald-500 text-black"
												: "border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
										}`}
									>
										{Icon && <Icon className="h-3.5 w-3.5" />}
										{categoryLabel(t, key)}
										<span className={active ? "text-black/60" : "text-zinc-600"}>
											({categoryCounts.get(key)})
										</span>
									</button>
								);
							})}
						</motion.div>

						{/* Search & sort */}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3, ease: springEase }}
							className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
						>
							<div className="relative max-w-md flex-1">
								<Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
								<input
									type="text"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder={t("products.cari")}
									className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 transition-all focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
								/>
							</div>
							<div className="flex items-center gap-2">
								<ArrowDownWideNarrow className="h-4 w-4 text-zinc-500" />
								<select
									value={sort}
									onChange={(e) => setSort(e.target.value as CatalogSort)}
									className="cursor-pointer appearance-none rounded-full border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-300 transition-all focus:border-emerald-500/40 focus:outline-none"
								>
									<option value="newest" className="bg-zinc-900 text-zinc-300">
										{t("products.sortTerbaru")}
									</option>
									<option value="oldest" className="bg-zinc-900 text-zinc-300">
										{t("products.sortTerlama")}
									</option>
									<option value="name" className="bg-zinc-900 text-zinc-300">
										{t("products.sortNama")}
									</option>
									<option value="kg" className="bg-zinc-900 text-zinc-300">
										{t("products.sortKg")}
									</option>
									<option value="price-asc" className="bg-zinc-900 text-zinc-300">
										{t("products.sortHargaTerendah")}
									</option>
									<option value="price-desc" className="bg-zinc-900 text-zinc-300">
										{t("products.sortHargaTertinggi")}
									</option>
								</select>
							</div>
						</motion.div>

						{/* Price filter */}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.35, ease: springEase }}
							className="mt-4 flex flex-wrap items-center gap-2"
						>
							<span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
								<Tags className="h-3 w-3" />
								{t("products.filterHarga")}
							</span>
							{priceRanges.map((r) => (
								<button
									key={r.key}
									onClick={() => setPriceRange(r.key)}
									className={`rounded-full px-4 py-2 text-[11px] font-bold transition-all ${
										priceRange === r.key
											? "bg-emerald-500 text-black"
											: "border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
									}`}
								>
									{priceRangeLabels[r.key]}
								</button>
							))}
						</motion.div>

						{!loading && (
							<p className="mt-4 text-xs text-zinc-500">
								{t("products.jumlahProduk", { count: filtered.length })}
							</p>
						)}

						{loading ? (
							<SkeletonGrid cols="sm:grid-cols-2 lg:grid-cols-3" />
						) : filtered.length === 0 ? (
							<div className="mt-10 rounded-[2rem] border border-white/5 bg-white/[0.02] p-10 text-center">
								<p className="text-sm text-zinc-400">{t("products.kosong")}</p>
								<p className="mt-1 text-xs text-zinc-500">{t("catalog.kosongHint")}</p>
								<button
									onClick={resetFilters}
									className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-semibold text-zinc-200 transition-all hover:bg-white/10"
								>
									<RotateCcw className="h-3.5 w-3.5" />
									{t("catalog.resetFilter")}
								</button>
							</div>
						) : isDefaultView ? (
							<>
							{/* Non-3D section */}
							{craftList.length > 0 && (
								<div className="mt-10">
									<SectionHeading
										titleKey="catalog.sectionCraftTitle"
										accentKey="catalog.sectionCraftAccent"
										subtitleKey="catalog.sectionCraftSubtitle"
										count={craftList.length}
									/>
									<div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
										{craftList.map((card, i) => (
											<ProductCard key={card.key} card={card} index={i} />
										))}
									</div>
								</div>
							)}

								{/* 3D print section */}
								{threedList.length > 0 && (
									<div className="mt-16 border-t border-white/5 pt-12">
										<SectionHeading
											titleKey="catalog.section3dTitle"
											accentKey="catalog.section3dAccent"
											subtitleKey="catalog.section3dSubtitle"
											count={threedList.length}
										/>
										<div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
											{threedList.slice(0, visible3d).map((card, i) => (
												<ProductCard key={card.key} card={card} index={i} />
											))}
										</div>
										<LoadMoreButton
											onClick={() => setVisible3d((v) => v + 12)}
											remaining={Math.max(0, threedList.length - visible3d)}
										/>
									</div>
								)}
							</>
						) : (
							<div className="mt-10">
								<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
									{sorted.slice(0, visibleAll).map((card, i) => (
										<ProductCard key={card.key} card={card} index={i} />
									))}
								</div>
								<LoadMoreButton
									onClick={() => setVisibleAll((v) => v + 24)}
									remaining={Math.max(0, sorted.length - visibleAll)}
								/>
							</div>
						)}
					</section>
				</div>

				<Footer />
			</div>
		</main>
	);
}
