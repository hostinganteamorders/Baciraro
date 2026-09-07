import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createAdminClient } from "@/utils/supabase/admin";

const SECRET = process.env.JWT_SECRET || "baciraro-secret-dev";

function getToken(req: NextRequest) {
  return req.cookies.get("customer_token")?.value;
}

function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as { id: number; email: string; name: string; role: string };
}

export async function GET(req: NextRequest) {
  const token = getToken(req);
  if (!token) {
    return NextResponse.json({ customer: null });
  }

  try {
    const decoded = verifyToken(token);
    const supabase = createAdminClient();
    const { data: customer } = await supabase
      .from("customers")
      .select("id, email, name, phone, photo_url, total_points")
      .eq("id", decoded.id)
      .single();

    if (!customer) {
      return NextResponse.json({ customer: null });
    }
    return NextResponse.json({ customer });
  } catch {
    return NextResponse.json({ customer: null });
  }
}

export async function PUT(req: NextRequest) {
  const token = getToken(req);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const { name, phone, photo_url } = await req.json();

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("customers")
      .update({ name, phone, photo_url })
      .eq("id", decoded.id)
      .select("id, email, name, phone, photo_url, total_points")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ customer: data });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
