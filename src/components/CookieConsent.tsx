"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { siteConfig } from "@/config/site";

const CONSENT_KEY = "nqa_cookie_consent";

export function CookieConsent() {
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as "accepted" | "rejected" | null;
    setConsent(stored);
    window.__nqaConsent = stored ?? undefined;
    setReady(true);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    window.__nqaConsent = "accepted";
    setConsent("accepted");
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    window.__nqaConsent = "rejected";
    setConsent("rejected");
  }

  const gaId = siteConfig.analytics.ga4MeasurementId;
  const pixelId = siteConfig.analytics.metaPixelId;
  const loadTracking = ready && consent === "accepted";

  return (
    <>
      {loadTracking && gaId && !gaId.includes("TODO") && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', { anonymize_ip: true });
          `}</Script>
        </>
      )}
      {loadTracking && pixelId && !pixelId.includes("TODO") && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}</Script>
      )}

      {ready && consent === null && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-20 z-50 mx-auto max-w-lg px-4 lg:bottom-6"
        >
          <div className="rounded-2xl border border-border bg-surface p-4 shadow-xl">
            <p className="text-sm text-ink">
              We use cookies for analytics (Google Analytics and Meta Pixel) only after you
              accept — to understand which countries and channels help families find us. Essential
              site functions always work.
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={accept}
                className="min-h-11 flex-1 rounded-lg bg-teal px-4 text-sm font-semibold text-white hover:bg-teal-dark"
              >
                Accept analytics
              </button>
              <button
                type="button"
                onClick={reject}
                className="min-h-11 flex-1 rounded-lg border border-border px-4 text-sm font-semibold text-ink hover:bg-cream-dark"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
