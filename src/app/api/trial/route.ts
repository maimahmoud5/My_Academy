import { NextRequest, NextResponse } from "next/server";
import { trialFormSchema } from "@/lib/validations/trial";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendAutoReply, sendLeadNotification } from "@/lib/resend";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const limited = rateLimit(`trial:${ip}`, 5, 60_000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." },
        { status: 429 },
      );
    }

    const body = await req.json();

    // Honeypot
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const parsed = trialFormSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      return NextResponse.json(
        { error: "Please check the form fields.", fieldErrors },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const studentType =
      data.studentType ?? (data.studentAge === "adult" ? "adult" : "child");

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("leads").insert({
        student_name: data.studentName,
        student_age: data.studentAge,
        student_type: studentType,
        filled_by: data.filledBy,
        country: data.country,
        city: data.city || null,
        subject: data.subject,
        current_level: data.currentLevel,
        preferred_days: data.preferredDays,
        preferred_times: data.preferredTimes,
        timezone: data.timezone,
        whatsapp: data.whatsapp,
        email: data.email,
        message: data.message || null,
        utm_source: data.utmSource || null,
        utm_medium: data.utmMedium || null,
        utm_campaign: data.utmCampaign || null,
        landing_page: data.landingPage || null,
        status: "new",
      });

      if (error) {
        console.error("[supabase] insert failed", error);
        return NextResponse.json(
          { error: "Could not save your request. Please try WhatsApp instead." },
          { status: 500 },
        );
      }
    } else {
      console.warn("[supabase] Not configured — lead logged to console only");
      console.info("[lead]", JSON.stringify(data));
    }

    await Promise.allSettled([sendLeadNotification(data), sendAutoReply(data)]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/trial]", err);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
