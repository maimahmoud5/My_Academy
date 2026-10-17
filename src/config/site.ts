export const siteConfig = {
  name: "Noor Quran Academy",
  legalName: "Noor Quran Academy",
  tagline: "Online Quran, Tajweed & Arabic classes for kids and adults",
  description:
    "Online Quran, Tajweed, Arabic & Islamic Studies classes for kids and adults in the UK, USA, Canada & Australia. Beginners welcome. Book your free trial class.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://noorquranacademy.com",
  locale: "en",
  teacherLocation: "Egypt",
  teacherTimezone: "Africa/Cairo",
  countriesServed: ["UK", "USA", "Canada", "Australia"] as const,
  contact: {
    email: "[TODO: academy email]",
    whatsappNumber: "[TODO: WhatsApp number with country code, digits only e.g. 201055733112]",
    whatsappDisplay: "[TODO: WhatsApp display number e.g. +201055733112]",
  },
  social: {
    facebook: "[TODO: Facebook URL]",
    instagram: "[TODO: Instagram URL]",
    tiktok: "[TODO: TikTok URL]",
  },
  defaultWhatsAppMessage:
    "Hi, I'd like to book a free trial class with Noor Quran Academy.",
  classPlatforms: ["Zoom", "Google Meet"] as const,
  /** Visible placeholder until real class length is confirmed */
  classLengthMinutes: "[TODO: class length in minutes]",
  googleSearchConsoleVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  analytics: {
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const whatsappMessages: Record<string, string> = {
  default: siteConfig.defaultWhatsAppMessage,
  home: "Hi, I'd like to book a free trial class with Noor Quran Academy.",
  adults:
    "Hi, I'm an adult beginner and I'd like to start learning Quran with Noor Quran Academy.",
  parents:
    "Hi, I'm a parent and I'd like to book a free trial class for my child.",
  pricing: "Hi, I have a question about pricing for Quran classes.",
  contact: "Hi, I'd like to get in touch about Quran classes.",
  tajweed: "Hi, I'd like to book a free Tajweed trial class.",
  hifz: "Hi, I'd like to book a free Quran memorization (Hifz) trial class.",
  qaida: "Hi, I'd like to book a free Noorani Qaida trial class for a beginner.",
  arabic: "Hi, I'd like to book a free Arabic trial class.",
  islamic: "Hi, I'd like to book a free Islamic Studies trial class.",
  quran: "Hi, I'd like to book a free Quran reading trial class.",
};
