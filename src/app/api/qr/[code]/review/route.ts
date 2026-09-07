import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createAdminClient } from "@/utils/supabase/admin";

const SECRET = process.env.JWT_SECRET || "baciraro-secret-dev";

function getCustomer(req: NextRequest) {
  const token = req.cookies.get("customer_token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET) as { id: number; email: string; name: string; role: string };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const customer = getCustomer(req);
  if (!customer) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code } = await params;
  const { review_text, review_rating } = await req.json();
  const supabase = createAdminClient();

  const { data: qr, error: fetchError } = await supabase
    .from("qr_codes")
    .select("customer_id")
    .eq("code", code)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!qr || !qr.customer_id || qr.customer_id !== customer.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error } = await supabase
    .from("qr_codes")
    .update({
      review_text: review_text || "",
      review_rating: review_rating || 0,
      reviewed_at: new Date().toISOString(),
    })
    .eq("code", code);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
