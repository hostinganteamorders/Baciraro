import { variantPrice } from "@/lib/pricing";
import { projectImages as pialaImages } from "@/lib/creative-projects/piala-aer-tembaga";
import { projectImages as mataluntungImages } from "@/lib/creative-projects/mataluntung";

export type ProjectProduct = {
	key: string;
	title: string;
	category: "craft";
	description: string;
	material: string;
	client: string;
	image: string;
	gallery: string[];
	href: string;
};

export type RawProduct = {
	id: number;
	slug: string;
	title: string;
	description?: string | null;
	category?: string | null;
	materials?: unknown;
	total_plastic_kg?: number | null;
	image_url?: string | null;
	weight_g?: number | null;
	print_time_min?: number | null;
	variants?: unknown;
};

export type CatalogCard = {
	key: string;
	sortId: number;
	slug: string;
	title: string;
	description: string;
	category: string;
	imageUrl: string;
	href: string;
	price: number | null;
	totalKg: number;
	weightG: number | null;
	printTimeMin: number | null;
	isCustom: boolean;
	isProject: boolean;
	materialLabel?: string;
	gallery?: string[];
};

export type CatalogSort = "newest" | "oldest" | "name" | "kg" | "price-asc" | "price-desc";

export const projectProducts: ProjectProduct[] = [
	{
		key: "piala-aer-tembaga",
		title: "Piala Aer Tembaga",
		category: "craft",
		description:
			"Piala penghargaan dari tutup botol daur ulang untuk Bank Indonesia — simbol pencapaian yang membawa cerita sirkular.",
		material: "Tutup Botol Daur Ulang",
		client: "Bank Indonesia",
		image: pialaImages.hero,
		gallery: [pialaImages.trophyInHand, pialaImages.finalGroup, pialaImages.emblemDetail],
		href: "/creative/projects/piala-aer-tembaga",
	},
	{
		key: "ganci-mataluntung",
		title: "Ganci Mataluntung",
		category: "craft",
		description:
			"Gantungan kunci bermerek dari material plastik daur ulang — identitas brand yang bisa dibawa ke mana saja.",
		material: "Plastik Daur Ulang",
		client: "Mataluntung",
		image: mataluntungImages.ganciDetail,
		gallery: [mataluntungImages.ganciCollection, mataluntungImages.hero],
		href: "/creative/projects/mataluntung",
	},
	{
		key: "coaster-mataluntung",
		title: "Coaster",
		category: "craft",
		description:
			"Coaster lingkaran yang sederhana pada bentuk, kuat pada material — ketebalan dan serpihan warna jadi bahasa visualnya.",
		material: "Plastik Daur Ulang",
		client: "Mataluntung",
		image: mataluntungImages.coasterBlueStack,
		gallery: [mataluntungImages.coasterOrange, mataluntungImages.coasterInUse],
		href: "/creative/projects/mataluntung",
	},
	{
		key: "asbak-mataluntung",
		title: "Asbak",
		category: "craft",
		description:
			"Eksplorasi bentuk — bulat, poligonal, hingga kotak — dari material daur ulang yang menyatukan seluruh koleksi.",
		material: "Plastik Daur Ulang",
		client: "Mataluntung",
		image: mataluntungImages.ashtrayCollection,
		gallery: [mataluntungImages.ashtraySquare],
		href: "/creative/projects/mataluntung",
	},
];

export const featuredSlugs = [
	"sofa-puff-ecobrick",
	"rangkong",
	"yaki",
	"lukisan-penjaga-tradisi",
	"medali",
	"biodigester",
];

export const featureProjectKey = "piala-aer-tembaga";

export const craftCategories = ["plastic", "craft", "art", "organic", "custom"];

export function isCraftCategory(category: string): boolean {
	return craftCategories.includes(category);
}

export type NormalizedMaterial = { name: string; amount: number; unit: string };

function roundKg(value: number): number {
	return Math.round(value * 10000) / 10000;
}

export function parseMaterials(
	raw: unknown,
	totalPlasticKg?: number | null
): NormalizedMaterial[] {
	try {
		const parsed = typeof raw === "string" ? JSON.parse(raw || "[]") : raw;
		if (!Array.isArray(parsed)) return [];
		const total = Number(totalPlasticKg) || 0;
		const out: NormalizedMaterial[] = [];
		for (const item of parsed) {
			if (!item || typeof item !== "object") continue;
			const m = item as {
				name?: unknown;
				amount?: unknown;
				unit?: unknown;
				material?: unknown;
				percentage?: unknown;
			};
			if (typeof m.name === "string" && Number.isFinite(Number(m.amount))) {
				out.push({
					name: m.name,
					amount: Number(m.amount),
					unit: typeof m.unit === "string" && m.unit ? m.unit : "kg",
				});
			} else if (typeof m.material === "string" && Number.isFinite(Number(m.percentage)) && total > 0) {
				out.push({
					name: m.material,
					amount: roundKg((total * Number(m.percentage)) / 100),
					unit: "kg",
				});
			}
		}
		return out;
	} catch {
		return [];
	}
}

export function priceFromVariants(raw: unknown): number | null {
	const variants: { weight_g?: number }[] =
		typeof raw === "string" ? safeParse(raw) : Array.isArray(raw) ? raw : [];
	if (!variants.length) return null;
	const weights = variants
		.map((v) => v.weight_g)
		.filter((w): w is number => typeof w === "number" && w > 0);
	return weights.length ? variantPrice(Math.min(...weights)) : null;
}

function safeParse(raw: string): { weight_g?: number }[] {
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

export function buildCatalogCards(products: RawProduct[]): CatalogCard[] {
	const dbCards: CatalogCard[] = (products || []).map((p) => {
		const materials = parseMaterials(p.materials, p.total_plastic_kg);
		const totalKg =
			materials.reduce((sum, m) => sum + m.amount, 0) ||
			Number(p.total_plastic_kg) ||
			0;
		const price =
			p.variants != null
				? priceFromVariants(p.variants)
				: p.weight_g != null
					? variantPrice(p.weight_g)
					: null;
		return {
			key: p.slug,
			sortId: p.id,
			slug: p.slug,
			title: p.title,
			description: p.description || "",
			category: p.category || "craft",
			imageUrl: p.image_url || "",
			href: p.slug === "custom" ? "/products/custom" : `/products/${p.slug}`,
			price,
			totalKg,
			weightG: p.weight_g ?? null,
			printTimeMin: p.print_time_min ?? null,
			isCustom: p.slug === "custom",
			isProject: false,
		};
	});

	const projectCards: CatalogCard[] = projectProducts.map((p) => ({
		key: p.key,
		sortId: Number.MAX_SAFE_INTEGER,
		slug: p.key,
		title: p.title,
		description: p.description,
		category: p.category,
		imageUrl: p.image,
		href: p.href,
		price: null,
		totalKg: 0,
		weightG: null,
		printTimeMin: null,
		isCustom: false,
		isProject: true,
		materialLabel: p.material,
		gallery: p.gallery,
	}));

	return [...dbCards, ...projectCards];
}

export function sortCatalogCards(list: CatalogCard[], sort: CatalogSort): CatalogCard[] {
	const arr = [...list];
	arr.sort((a, b) => {
		if (a.isCustom && !b.isCustom) return -1;
		if (b.isCustom && !a.isCustom) return 1;
		switch (sort) {
			case "name":
				return a.title.localeCompare(b.title);
			case "kg":
				return b.totalKg - a.totalKg;
			case "oldest":
				return a.sortId - b.sortId;
			case "price-asc":
			case "price-desc": {
				const pa = a.price;
				const pb = b.price;
				if (pa == null && pb == null) return 0;
				if (pa == null) return 1;
				if (pb == null) return -1;
				return sort === "price-asc" ? pa - pb : pb - pa;
			}
			default:
				return b.sortId - a.sortId;
		}
	});
	return arr;
}
