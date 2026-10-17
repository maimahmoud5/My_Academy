const UTM_KEY = "nqa_utm";
const LANDING_KEY = "nqa_landing";

export type UtmData = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPage?: string;
};

export function captureAttribution() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const existing = readUtm();

  const next: UtmData = {
    utmSource: params.get("utm_source") || existing.utmSource,
    utmMedium: params.get("utm_medium") || existing.utmMedium,
    utmCampaign: params.get("utm_campaign") || existing.utmCampaign,
    landingPage: existing.landingPage || window.location.pathname,
  };

  try {
    localStorage.setItem(UTM_KEY, JSON.stringify(next));
    if (!localStorage.getItem(LANDING_KEY)) {
      localStorage.setItem(LANDING_KEY, window.location.pathname);
    }
    // Mirror to cookie for server forms if needed (30 days)
    document.cookie = `${UTM_KEY}=${encodeURIComponent(JSON.stringify(next))};path=/;max-age=${60 * 60 * 24 * 30};samesite=lax`;
  } catch {
    // ignore storage errors
  }
}

export function readUtm(): UtmData {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(UTM_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmData;
  } catch {
    return {};
  }
}
