import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createAdminClient } from "@/utils/supabase/admin";

const SECRET = process.env.JWT_SECRET || "baciraro-secret-dev";

function getUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET) as { id: number; username: string; name: string };
  } catch {
    return null;
  }
}

export async function GET() {
  const supabase = createAdminClient();
  const { data: buckets } = await supabase
    .from("compost_buckets")
    .select("*")
    .order("id", { ascending: false });
  return NextResponse.json({ buckets });
}

export async function POST(req: NextRequest) {
  const user = getUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code, start_date, estimated_harvest, status, type, material, notes } = await req.json();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("compost_buckets")
    .insert({
      code, start_date, estimated_harvest,
      status: status || "fermenting",
      type: type || "both",
      material: material || "",
      notes: notes || "",
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ id: data.id }, { status: 201 });
}
