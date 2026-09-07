import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("qr_codes")
    .select("code, buyer_name, review_text, review_rating, reviewed_at")
    .eq("product_slug", slug)
    .not("review_text", "eq", "")
    .not("review_rating", "eq", 0)
    .order("reviewed_at", { ascending: false });

  if (error) {
    return NextResponse.json({ reviews: [] });
  }

  return NextResponse.json({ reviews: data || [] });
}
