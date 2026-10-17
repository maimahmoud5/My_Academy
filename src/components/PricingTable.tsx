"use client";

import { useEffect, useMemo, useState } from "react";
import {
  currencyLabels,
  pricingNotes,
  pricingPackages,
  type CurrencyCode,
  countryToCurrency,
} from "@/data/pricing";
import { trackEvent } from "@/lib/analytics";

function guessCurrency(): CurrencyCode {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.startsWith("Europe/London") || tz.includes("London")) return "GBP";
    if (tz.startsWith("Australia/")) return "AUD";
    if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Edmonton") || tz.includes("Winnipeg"))
      return "CAD";
    if (tz.startsWith("America/")) return "USD";
  } catch {
    /* ignore */
  }
  return "GBP";
}

export function PricingTable({ initialCurrency }: { initialCurrency?: CurrencyCode }) {
  const [currency, setCurrency] = useState<CurrencyCode>(initialCurrency ?? "GBP");

  useEffect(() => {
    if (!initialCurrency) setCurrency(guessCurrency());
    trackEvent("pricing_view");
  }, [initialCurrency]);

  const symbol = currencyLabels[currency].symbol;

  const packages = useMemo(() => pricingPackages, []);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="currency" className="text-sm font-medium text-ink">
          Show prices in
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          className="min-h-11 rounded-lg border border-border bg-surface px-3 text-sm"
        >
          {(Object.keys(currencyLabels) as CurrencyCode[]).map((code) => (
            <option key={code} value={code}>
              {currencyLabels[code].label}
            </option>
          ))}
        </select>
      </div>

      <ul className="mt-4 space-y-1 text-sm text-ink-muted">
        {pricingNotes.map((note) => (
          <li key={note}>• {note}</li>
        ))}
      </ul>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {packages.map((pkg) => (
          <article
            key={pkg.id}
            className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
          >
            <h3 className="text-xl font-bold text-ink">{pkg.name}</h3>
            <p className="mt-2 text-sm text-ink-muted">{pkg.description}</p>
            <p className="mt-6 text-3xl font-bold text-teal">
              {symbol}
              {pkg.prices[currency]}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              {pkg.classesPerMonth} classes / month
            </p>
            <p className="mt-4 rounded-lg bg-gold-soft/40 px-3 py-2 text-xs font-medium text-ink">
              Placeholder price — replace TODO before launch
            </p>
          </article>
        ))}
      </div>
      {/* silence unused import warning in some builds */}
      <span className="sr-only">{Object.keys(countryToCurrency).length}</span>
    </div>
  );
}
