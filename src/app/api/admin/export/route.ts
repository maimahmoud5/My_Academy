import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  const pw = req.nextUrl.searchParams.get("pw");
  if (!expected || expected.includes("TODO") || pw !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return new NextResponse("id,created_at,student_name,country,subject,status\n", {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="leads.csv"',
      },
    });
  }

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2000);

  if (error) {
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }

  const rows = data ?? [];
  const headers = [
    "id",
    "created_at",
    "student_name",
    "student_age",
    "student_type",
    "country",
    "subject",
    "status",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "email",
    "whatsapp",
  ];
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape((r as Record<string, unknown>)[h])).join(",")),
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="leads.csv"',
    },
  });
}
