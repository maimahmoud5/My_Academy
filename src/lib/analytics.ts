"use client";

export type AnalyticsEvent =
  | "trial_form_start"
  | "trial_form_submit"
  | "whatsapp_click"
  | "pricing_view"
  | "blog_read";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    __nqaConsent?: "accepted" | "rejected";
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;
  if (window.__nqaConsent !== "accepted") return;

  const clean = Object.fromEntries(
    Object.entries(params ?? {}).filter(([, v]) => v !== undefined),
  );

  if (typeof window.gtag === "function") {
    window.gtag("event", event, clean);
  }
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event, clean);
  }
}
