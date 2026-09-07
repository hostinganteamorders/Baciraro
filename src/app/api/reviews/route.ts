import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();

  const { data: reviews, error } = await supabase
    .from("qr_codes")
    .select(`code, buyer_name, review_text, review_rating, reviewed_at, product_slug`)
    .not("review_text", "eq", "")
    .not("review_rating", "eq", 0)
    .order("reviewed_at", { ascending: false });

  if (error || !reviews?.length) {
    return NextResponse.json({ reviews: [] });
  }

  const slugs = [...new Set(reviews.map((r) => r.product_slug))];

  const { data: products } = await supabase
    .from("products")
    .select("slug, title, image_url")
    .in("slug", slugs);

  const productMap: Record<string, { title: string; image_url: string }> = {};
  if (products) {
    for (const p of products) {
      productMap[p.slug] = { title: p.title, image_url: p.image_url };
    }
  }

  const enriched = reviews.map((r) => ({
    ...r,
    product_title: productMap[r.product_slug]?.title || "",
    product_image: productMap[r.product_slug]?.image_url || "",
  }));

  return NextResponse.json({ reviews: enriched });
}
