import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createAdminClient } from "@/utils/supabase/admin";

const SECRET = process.env.JWT_SECRET || "baciraro-secret-dev";

function getUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try { return jwt.verify(token, SECRET) as { id: number; username: string; name: string }; }
  catch { return null; }
}

export async function GET(req: NextRequest) {
  const user = getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("qr_codes")
    .select("*, products!inner(slug, title, image_url)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ qrCodes: [] });
  return NextResponse.json({ qrCodes: data || [] });
}
