// Alamat dasar foto produk di Supabase Storage, mis.
//   https://<project>.supabase.co/storage/v1/object/public/product-images
// Jika NEXT_PUBLIC_MEDIA_BASE_URL belum diisi, foto tetap dilayani dari folder public/ (perilaku lama).
const BASE = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.replace(/\/$/, "");

export function mediaUrl<T extends string | null | undefined>(src: T): T | string {
  if (!BASE || !src || !src.startsWith("/produk/")) return src;
  return BASE + src.split("/").map(encodeURIComponent).join("/");
}

// Foto halaman /creative (hasil kompresi WebP) disimpan di bucket yang sama, folder creative/<slug>/.
// Alamat bucket bersifat publik, jadi aman dijadikan nilai bawaan bila env belum diisi.
const CREATIVE_BASE =
  BASE ?? "https://zkotqpszynvfunhenysp.supabase.co/storage/v1/object/public/product-images";

export function creativeMedia(slug: string, file: string): string {
  return `${CREATIVE_BASE}/creative/${slug}/${file}`;
}
