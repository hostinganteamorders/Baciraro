import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import crypto from "crypto";

export async function POST(req: Request) {
  const { product_slug, count = 50 } = await req.json();
  if (!product_slug) {
    return NextResponse.json({ error: "product_slug required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    codes.push(crypto.randomUUID());
  }

  const rows = codes.map((code) => ({ code, product_slug }));
  const { error } = await supabase.from("qr_codes").insert(rows);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    codes: codes.map((code) => ({
      code,
      claimUrl: `https://baciraro.net/claim/${product_slug}/${code}`,
    })),
  });
}
