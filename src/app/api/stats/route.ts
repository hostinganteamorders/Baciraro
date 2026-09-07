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
  const { data } = await supabase
    .from("waste_stats")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single();

  return NextResponse.json({
    stats: data || { organic_kg: 0, inorganic_kg: 0, products_count: 0 },
  });
}

export async function PUT(req: NextRequest) {
  const user = getUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { organic_kg, inorganic_kg, products_count } = await req.json();
  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("waste_stats")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .single();

  if (existing) {
    await supabase
      .from("waste_stats")
      .update({ organic_kg, inorganic_kg, products_count, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    await supabase
      .from("waste_stats")
      .insert({ organic_kg, inorganic_kg, products_count });
  }

  return NextResponse.json({ ok: true });
}
