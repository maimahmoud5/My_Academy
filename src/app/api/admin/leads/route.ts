import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function authorized(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.includes("TODO")) return false;
  return req.headers.get("x-admin-password") === expected;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ leads: [] });
  }

  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, created_at, student_name, country, subject, status, utm_source, student_type, email",
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 });
  }

  return NextResponse.json({ leads: data ?? [] });
}
