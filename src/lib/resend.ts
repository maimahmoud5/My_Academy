import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import type { TrialFormInput } from "@/lib/validations/trial";

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.includes("TODO")) return null;
  return new Resend(key);
}

export async function sendLeadNotification(data: TrialFormInput) {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.ACADEMY_INBOX_EMAIL ?? siteConfig.contact.email;

  if (!resend || !from || from.includes("TODO") || String(to).includes("TODO")) {
    console.warn("[resend] Skipping academy notification — email not configured");
    return { skipped: true as const };
  }

  await resend.emails.send({
    from,
    to,
    subject: `New free trial request: ${data.studentName} (${data.country})`,
    text: [
      `New free trial request from Noor Quran Academy website`,
      ``,
      `Student: ${data.studentName}`,
      `Age: ${data.studentAge}`,
      `Filled by: ${data.filledBy}`,
      `Country: ${data.country}`,
      `City: ${data.city || "—"}`,
      `Subject: ${data.subject}`,
      `Level: ${data.currentLevel}`,
      `Preferred days: ${data.preferredDays.join(", ")}`,
      `Preferred times: ${data.preferredTimes}`,
      `Timezone: ${data.timezone}`,
      `WhatsApp: ${data.whatsapp}`,
      `Email: ${data.email}`,
      `Message: ${data.message || "—"}`,
      ``,
      `UTM source: ${data.utmSource || "—"}`,
      `UTM medium: ${data.utmMedium || "—"}`,
      `UTM campaign: ${data.utmCampaign || "—"}`,
      `Landing page: ${data.landingPage || "—"}`,
    ].join("\n"),
  });

  return { skipped: false as const };
}

export async function sendAutoReply(data: TrialFormInput) {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL;

  if (!resend || !from || from.includes("TODO")) {
    console.warn("[resend] Skipping auto-reply — email not configured");
    return { skipped: true as const };
  }

  await resend.emails.send({
    from,
    to: data.email,
    subject: `We received your free trial request — ${siteConfig.name}`,
    text: [
      `Assalamu alaikum ${data.filledBy === "parent" ? "" : data.studentName + ","}`.trim(),
      ``,
      `Thank you for requesting a free trial class with ${siteConfig.name}.`,
      ``,
      `We have received your details for ${data.studentName} (${data.subject}) and will message you on WhatsApp (${data.whatsapp}) to confirm a time in your time zone (${data.timezone}).`,
      ``,
      `If you need a faster reply, WhatsApp us anytime.`,
      ``,
      `JazakAllahu khairan,`,
      siteConfig.name,
    ].join("\n"),
  });

  return { skipped: false as const };
}
