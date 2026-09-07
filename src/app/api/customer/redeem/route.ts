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

export async function POST(req: NextRequest) {
  const customer = getCustomer(req);
  if (!customer) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reward_id } = await req.json();
  if (!reward_id) {
    return NextResponse.json({ error: "reward_id required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: reward, error: rewardError } = await supabase
    .from("rewards")
    .select("*")
    .eq("id", reward_id)
    .single();

  if (rewardError || !reward) {
    return NextResponse.json({ error: "Reward not found" }, { status: 404 });
  }

  const { data: customerData, error: customerError } = await supabase
    .from("customers")
    .select("total_points")
    .eq("id", customer.id)
    .single();

  if (customerError || !customerData) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  if (customerData.total_points < reward.cost_points) {
    return NextResponse.json({ error: "Insufficient points" }, { status: 400 });
  }

  const { data: redemption, error: redeemError } = await supabase
    .from("redemptions")
    .insert({
      customer_id: customer.id,
      reward_id: reward_id,
      cost_points: reward.cost_points,
      status: "pending",
    })
    .select("*")
    .single();

  if (redeemError) {
    return NextResponse.json({ error: redeemError.message }, { status: 400 });
  }

  await supabase
    .from("customers")
    .update({ total_points: customerData.total_points - reward.cost_points })
    .eq("id", customer.id);

  return NextResponse.json({ redemption }, { status: 201 });
}
