import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { CookieConsent } from "@/components/CookieConsent";
import { AttributionCapture } from "@/components/AttributionCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Online Quran Classes`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  verification: siteConfig.googleSearchConsoleVerification
    ? { google: siteConfig.googleSearchConsoleVerification }
    : undefined,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Online Quran Classes`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Online Quran Classes`,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${amiri.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            description: siteConfig.description,
            areaServed: siteConfig.countriesServed.map((c) => ({
              "@type": "Country",
              name: c,
            })),
            email: siteConfig.contact.email.includes("TODO")
              ? undefined
              : siteConfig.contact.email,
          }}
        />
        <AttributionCapture />
        <Header />
        <main className="flex-1 pb-24 lg:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
        <CookieConsent />
      </body>
    </html>
  );
}
