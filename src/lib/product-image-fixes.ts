import { mediaUrl } from "@/lib/media";

export type ProductImageRow = {
  slug: string;
  image_url?: string | null;
  gallery?: unknown;
};

type ImageFix = {
  image_url?: string;
  gallery?: string[];
};

const IMAGE_FIXES: Record<string, ImageFix> = {
  "3d-keychain-nama": { image_url: "/produk/3d/mw-b2/3d-name-keychain-1.png" },
  "3d-initial-name": { image_url: "/produk/3d/mw-b2/3d-name-tag-1.webp" },
  "3d-nativity-3kings": { image_url: "/produk/3d/mw-b2/3d-nativity-illuminated-1.jpg" },
  "3d-frog": { gallery: [] },
  "3d-whale-shark": { gallery: ["/produk/3d/mw-b2/3d-whale-shark-2.png"] },
  "3d-flexi-fox": { image_url: "", gallery: [] },
  "3d-classic-clicker": { image_url: "" },
  "3d-digivice-clicker": { image_url: "" },
  "3d-modular-clicker": { image_url: "" },
  "3d-pencil-topper": { image_url: "" },
  "3d-switch-clicker": { image_url: "" },
};

export function hasImageFix(slug: string): boolean {
  return slug in IMAGE_FIXES;
}

export function applyProductImageFixes<T extends ProductImageRow>(product: T): T {
  const fix = IMAGE_FIXES[product.slug];
  const out = (fix ? { ...product, ...fix } : product) as T;
  if (!process.env.NEXT_PUBLIC_MEDIA_BASE_URL) return out;
  return {
    ...out,
    image_url: mediaUrl(out.image_url),
    gallery: Array.isArray(out.gallery) ? out.gallery.map((g) => (typeof g === "string" ? mediaUrl(g) : g)) : out.gallery,
  } as T;
}
