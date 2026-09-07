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

export async function GET(req: NextRequest) {
  const customer = getCustomer(req);
  if (!customer) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data: transactions, error } = await supabase
    .from("points_transactions")
    .select("*, qr_codes(code, product_slug)")
    .eq("customer_id", customer.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ transactions: [], error: error.message });
  }

  return NextResponse.json({ transactions: transactions || [] });
}
