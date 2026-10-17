export type CurrencyCode = "GBP" | "USD" | "CAD" | "AUD";

export type PricingPackage = {
  id: string;
  name: string;
  classesPerMonth: number | string;
  description: string;
  prices: Record<CurrencyCode, string>;
};

export const currencyLabels: Record<CurrencyCode, { label: string; symbol: string }> = {
  GBP: { label: "UK (£)", symbol: "£" },
  USD: { label: "USA ($)", symbol: "$" },
  CAD: { label: "Canada (CA$)", symbol: "CA$" },
  AUD: { label: "Australia (A$)", symbol: "A$" },
};

export const countryToCurrency: Record<string, CurrencyCode> = {
  UK: "GBP",
  GB: "GBP",
  USA: "USD",
  US: "USD",
  Canada: "CAD",
  CA: "CAD",
  Australia: "AUD",
  AU: "AUD",
};

/**
 * Placeholder prices only. Replace TODO strings with real numbers before launch.
 */
export const pricingPackages: PricingPackage[] = [
  {
    id: "starter",
    name: "Starter",
    classesPerMonth: "[4 classes/month]",
    description: "A light schedule for beginners building a habit.",
    prices: {
      GBP: "20: GBP",
      USD: "28: USD",
      CAD: "40: CAD",
      AUD: "40: AUD",
    },
  },
  {
    id: "standard",
    name: "Standard",
    classesPerMonth: "[12 classes/month]",
    description: "Our most common package for steady weekly progress.",
    prices: {
      GBP: "55: GBP",
      USD: "75: USD",
      CAD: "107: CAD",
      AUD: "107: AUD",
    },
  },
  {
    id: "intensive",
    name: "Intensive",
    classesPerMonth: "[18: classes/month]",
    description: "More lessons per month for faster memorization or catch-up.",
    prices: {
      GBP: "70: GBP",
      USD: "90: USD",
      CAD: "130: CAD",
      AUD: "130: AUD",
    },
  },
];

export const pricingNotes = [
  "All prices below are placeholders marked TODO until confirmed.",
  "A free trial class is available before you commit to a package.",
  "[TODO: confirm whether prices are per month, per class, or per package]",
  "[TODO: confirm sibling discounts, if any]",
];
