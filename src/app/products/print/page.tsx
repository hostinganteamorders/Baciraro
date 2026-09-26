"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { Printer, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { formatRupiah } from "@/lib/pricing";
import {
	buildCatalogCards,
	sortCatalogCards,
	featuredSlugs,
	featureProjectKey,
	type CatalogCard,
	type RawProduct,
} from "@/lib/product-curation";

const WA_NUMBER = "6288212835350";

type Scope = "all" | "kurasi" | "kriya" | "3dprint";

function categoryLabel(t: (key: string) => string, category: string): string {
	const label = t("products." + category);
	return label.startsWith("products.") ? category : label;
}

function PrintCard({ card, t }: { card: CatalogCard; t: (key: string, params?: Record<string, string | number>) => string }) {
	const [imgFailed, setImgFailed] = useState(false);
	const showImage = Boolean(card.imageUrl) && !imgFailed;
	return (
		<div className="print-card overflow-hidden rounded-xl border border-zinc-200 bg-white">
			<div className="relative aspect-[4/3] bg-zinc-100">
				{showImage ? (
					<Image
						src={card.imageUrl}
						alt={card.title}
						fill
						sizes="(max-width: 640px) 50vw, 33vw"
						className="object-cover"
						onError={() => setImgFailed(true)}
					/>
				) : (
					<div className="absolute inset-0 flex items-center justify-center text-zinc-400">
						Baciraro
					</div>
				)}
				<span className="absolute left-2 top-2 rounded-full border border-zinc-300 bg-white/95 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-black">
					{categoryLabel(t, card.category)}
				</span>
			</div>
			<div className="p-3">
				<h4 className="font-serif text-[13px] leading-snug text-black">{card.title}</h4>
				<p className="mt-1 line-clamp-3 text-[9px] leading-snug text-neutral-600">
					{card.description}
				</p>
				<div className="mt-2 flex items-center justify-between gap-2 border-t border-zinc-100 pt-2">
					<span className="text-[9px] font-bold text-black">
						{card.price != null
							? `${t("products.dari")} ${formatRupiah(card.price)}`
							: t("catalog.hargaTanyaFull")}
					</span>
					{card.materialLabel && (
						<span className="truncate text-[8px] uppercase tracking-wider text-neutral-500">
							{card.materialLabel}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default function PrintCatalogPage() {
	const { t } = useLanguage();
	const [products, setProducts] = useState<RawProduct[]>([]);
	const [scope, setScope] = useState<Scope>("all");
	const [qrSvg, setQrSvg] = useState("");
	const [loaded, setLoaded] = useState(false);
	const [year] = useState(() => new Date().getFullYear());

	useEffect(() => {
		fetch("/api/products")
			.then((res) => res.json())
			.then((data) => setProducts(Array.isArray(data?.products) ? data.products : []))
			.catch(() => setProducts([]))
			.finally(() => setLoaded(true));
	}, []);

	useEffect(() => {
		QRCode.toString(`https://wa.me/${WA_NUMBER}`, {
			type: "svg",
			margin: 1,
			width: 240,
			color: { dark: "#000000", light: "#ffffff" },
		})
			.then((svg) => setQrSvg(svg))
			.catch(() => setQrSvg(""));
	}, []);

	const cards = useMemo(() => buildCatalogCards(products), [products]);

	const scoped = useMemo(() => {
		if (scope === "kurasi") {
			const keys = [featureProjectKey, ...featuredSlugs];
			const ordered = keys
				.map((k) => cards.find((c) => c.key === k || c.slug === k))
				.filter((c): c is CatalogCard => Boolean(c));
			return ordered;
		}
		if (scope === "kriya") return sortCatalogCards(cards.filter((c) => c.category !== "3dprint"), "name");
		if (scope === "3dprint") return sortCatalogCards(cards.filter((c) => c.category === "3dprint"), "name");
		return cards;
	}, [cards, scope]);

	const sections = useMemo(() => {
		if (scope === "kurasi") {
			return [{ id: "kurasi", title: `${t("catalog.kurasiTitle")} ${t("catalog.kurasiAccent")}`, items: scoped }];
		}
		const non3d = scoped.filter((c) => c.category !== "3dprint");
		const threed = scoped.filter((c) => c.category === "3dprint");
		const list: { id: string; title: string; items: CatalogCard[] }[] = [];
		if (non3d.length)
			list.push({
				id: "kriya",
				title: `${t("catalog.sectionCraftTitle")} ${t("catalog.sectionCraftAccent")}`,
				items: non3d,
			});
		if (threed.length)
			list.push({
				id: "3dprint",
				title: `${t("catalog.section3dTitle")} ${t("catalog.section3dAccent")}`,
				items: threed,
			});
		return list;
	}, [scoped, scope, t]);

	return (
		<main className="relative min-h-screen text-[#fafafa]">
			<div aria-hidden="true" className="page-bg no-print" />
			<div className="relative z-[1]">
				<div className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.08] no-print" />
				<div className="no-print">
					<Header subtitle={t("catalog.cetakKatalog")} />
				</div>

				<div className="print-shell relative z-10 mx-auto max-w-[210mm] px-4 pb-16 pt-8">
					{/* Toolbar */}
					<div className="no-print sticky top-20 z-20 mb-6 rounded-[1.5rem] border border-white/10 bg-black/80 p-4 backdrop-blur-xl">
						<div className="flex flex-wrap items-center gap-3">
							<Link
								href="/products"
								className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition-all hover:bg-white/10"
							>
								<ArrowLeft className="h-3.5 w-3.5" />
								{t("products.kembali")}
							</Link>
							<div className="flex items-center gap-2">
								<FileText className="h-4 w-4 text-zinc-500" />
								<select
									value={scope}
									onChange={(e) => setScope(e.target.value as Scope)}
									className="cursor-pointer appearance-none rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300 transition-all focus:border-emerald-500/40 focus:outline-none"
								>
									<option value="all" className="bg-zinc-900 text-zinc-300">
										{t("catalog.print.isiSemua")}
									</option>
									<option value="kurasi" className="bg-zinc-900 text-zinc-300">
										{t("catalog.print.isiKurasi")}
									</option>
									<option value="kriya" className="bg-zinc-900 text-zinc-300">
										{`${t("catalog.sectionCraftTitle")} ${t("catalog.sectionCraftAccent")}`}
									</option>
									<option value="3dprint" className="bg-zinc-900 text-zinc-300">
										{`${t("catalog.section3dTitle")} ${t("catalog.section3dAccent")}`}
									</option>
								</select>
							</div>
							<span className="text-xs text-zinc-500">
								{!loaded
									? t("products.memuat")
									: t("catalog.print.jumlah", { count: scoped.length })}
							</span>
							<button
								onClick={() => window.print()}
								disabled={!loaded}
								className={`ml-auto inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black transition-all ${
									loaded ? "hover:bg-zinc-100" : "cursor-not-allowed opacity-50"
								}`}
							>
								<Printer className="h-4 w-4" />
								{t("catalog.print.cetak")}
							</button>
						</div>
						<p className="mt-2 text-[11px] text-zinc-500">{t("catalog.print.previewNote")}</p>
					</div>

					{/* Document */}
					<div className="print-doc bg-white p-8 text-black shadow-2xl sm:p-12">
						{/* Cover */}
						<section className="print-cover page-break flex min-h-[560px] flex-col justify-between rounded-[1.25rem] border border-zinc-200 bg-white p-8 sm:p-12">
							<div className="flex items-center gap-3">
								<Image src="/Baciraro cap.png" alt="Baciraro" width={44} height={44} />
								<span className="text-xs font-bold uppercase tracking-[0.3em] text-black">
									Baciraro
								</span>
							</div>

							<div>
								<p className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-500">
									{t("products.title")}
								</p>
								<h1 className="mt-4 font-serif text-[clamp(40px,9vw,72px)] leading-[1.05] tracking-[-0.03em] text-black">
									{t("catalog.print.judul")}
									<br />
									<span className="italic">{t("catalog.print.judulAccent")}</span>
								</h1>
								<p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-600">
									{t("catalog.print.tagline")}
								</p>
							</div>

							<div className="flex flex-wrap items-end justify-between gap-4 border-t border-zinc-200 pt-6">
								<div>
									<p className="text-lg font-bold text-black">{t("catalog.print.edisi", { year })}</p>
									<p className="mt-1 text-xs text-neutral-500">{t("catalog.print.terbit")}</p>
								</div>
								<p className="text-xs text-neutral-500">
									{t("catalog.print.jumlah", { count: cards.length })}
								</p>
							</div>
						</section>

						{/* Contents */}
						<section className="page-break mt-8 rounded-[1.25rem] border border-zinc-200 p-8">
							<h2 className="font-serif text-2xl text-black">{t("catalog.print.daftarIsi")}</h2>
							<ul className="mt-5 space-y-3">
								{sections.map((section, i) => (
									<li
										key={section.id}
										className="flex items-baseline justify-between gap-3 border-b border-zinc-100 pb-3 text-sm"
									>
										<span className="font-semibold text-black">
											<span className="mr-3 text-neutral-400">
												{String(i + 1).padStart(2, "0")}
											</span>
											{section.title}
										</span>
										<span className="text-xs text-neutral-500">
											{t("products.jumlahProduk", { count: section.items.length })}
										</span>
									</li>
								))}
							</ul>
						</section>

						{/* Sections */}
						{sections.map((section) => (
							<section key={section.id} className="page-break mt-8">
								<div className="flex items-end justify-between gap-3 border-b border-zinc-200 pb-4">
									<h2 className="font-serif text-[26px] leading-tight text-black">
										{section.title}
									</h2>
									<span className="text-xs text-neutral-500">
										{t("products.jumlahProduk", { count: section.items.length })}
									</span>
								</div>
								<div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
									{section.items.map((card) => (
										<PrintCard key={card.key} card={card} t={t} />
									))}
								</div>
							</section>
						))}

						{/* Closing */}
						<section className="mt-8 rounded-[1.25rem] border border-zinc-200 bg-zinc-50 p-8 sm:p-12">
							<h2 className="font-serif text-[clamp(28px,5vw,44px)] leading-tight text-black">
								{t("catalog.print.tutupJudul")}
							</h2>
							<p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600">
								{t("catalog.print.tutupDesc")}
							</p>
							<div className="mt-8 flex flex-wrap items-center gap-6">
								{qrSvg && (
									<div
										className="h-28 w-28 overflow-hidden rounded-lg border border-zinc-200 bg-white [&>svg]:h-full [&>svg]:w-full"
										dangerouslySetInnerHTML={{ __html: qrSvg }}
									/>
								)}
								<div className="text-sm">
									<p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
										{t("catalog.print.scanDesc")}
									</p>
									<p className="mt-2 text-lg font-bold text-black">+62 882 128 35350</p>
									<p className="mt-1 text-xs text-neutral-500">
										{t("catalog.print.website")}: {t("catalog.print.terbit")}
									</p>
								</div>
							</div>
							<div className="mt-8 flex items-center gap-3 border-t border-zinc-200 pt-6">
								<Image src="/Baciraro cap.png" alt="Baciraro" width={28} height={28} />
								<span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
									Baciraro · {t("catalog.print.edisi", { year })}
								</span>
							</div>
						</section>
					</div>
				</div>

				<div className="no-print">
					<Footer />
				</div>
			</div>

			<style jsx global>{`
				@page {
					size: A4 portrait;
					margin: 12mm;
				}
				.print-card {
					break-inside: avoid;
					page-break-inside: avoid;
				}
				.page-break {
					break-after: page;
					page-break-after: always;
				}
				@media print {
					.no-print {
						display: none !important;
					}
					.print-shell {
						max-width: none !important;
						padding: 0 !important;
						margin: 0 !important;
					}
					.print-doc {
						box-shadow: none !important;
						border: none !important;
						padding: 0 !important;
						margin: 0 !important;
						max-width: none !important;
						width: 100% !important;
						background: #ffffff !important;
					}
					.print-cover {
						border: none !important;
						border-radius: 0 !important;
						min-height: 240mm !important;
						padding: 0 !important;
					}
					.print-card,
					.print-doc * {
						-webkit-print-color-adjust: exact;
						print-color-adjust: exact;
					}
				}
			`}</style>
		</main>
	);
}
