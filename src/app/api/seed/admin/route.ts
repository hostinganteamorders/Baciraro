import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST() {
  const supabase = createAdminClient();
  const password = bcrypt.hashSync("baciraro", 10);

  const { data, error } = await supabase
    .from("team_members")
    .upsert(
      {
        username: "baciraro@gmail.com",
        email: "baciraro@gmail.com",
        password,
        name: "Admin",
        role: "Founder",
        division: "founder",
        is_admin: true,
        status: "active",
      },
      { onConflict: "username" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message: "Admin user created/updated",
    user: { id: data.id, username: data.username, name: data.name },
  });
}
