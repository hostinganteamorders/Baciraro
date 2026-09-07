import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import crypto from "crypto";

export async function POST(req: Request) {
  const { product_slug } = await req.json();
  if (!product_slug) {
    return NextResponse.json({ error: "product_slug required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const code = crypto.randomUUID();

  const { error } = await supabase.from("qr_codes").insert({
    code,
    product_slug,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    code,
    claimUrl: `https://baciraro.net/claim/${product_slug}/${code}`,
  });
}
