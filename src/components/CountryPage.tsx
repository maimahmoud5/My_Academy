import Link from "next/link";
import type { CountryPageData } from "@/data/countries";
import { countries } from "@/data/countries";
import { PageHeader } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { TrialCTA } from "@/components/TrialCTA";
import { ReviewList } from "@/components/ReviewList";
import { BookTrialButton, WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

export function CountryPage({ country }: { country: CountryPageData }) {
  const alternates = countries.map((c) => ({
    hreflang: c.hreflang,
    href: absoluteUrl(`/${c.slug}`),
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            {
              "@type": "ListItem",
              position: 2,
              name: `Online Quran Classes ${country.shortName}`,
              item: absoluteUrl(`/${country.slug}`),
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: country.commonQuestions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: { "@type": "Answer", text: q.answer },
          })),
        }}
      />
      {/* hreflang hint for when pages are published */}
      <div className="sr-only" aria-hidden="true">
        {alternates.map((a) => (
          <span key={a.hreflang}>
            {a.hreflang}:{a.href}
          </span>
        ))}
      </div>

      <PageHeader
        title={`Online Quran Classes in ${country.name}`}
        description={country.heroIntro}
        breadcrumb={[{ label: country.shortName, href: `/${country.slug}` }]}
      />

      {!country.published && (
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
          <p className="rounded-lg border border-gold bg-gold-soft/50 px-4 py-3 text-sm text-ink">
            This country page is marked <strong>unpublished</strong> (noindex) until you set{" "}
            <code>published: true</code> in <code>data/countries.ts</code>.
          </p>
        </div>
      )}

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-lg leading-relaxed text-ink-muted">{country.localContext}</p>

        <h2 className="mt-10 text-2xl font-bold text-ink">Class times for {country.shortName}</h2>
        <p className="mt-3 leading-relaxed text-ink-muted">{country.schedulingNotes}</p>
        <p className="mt-3 text-sm text-ink-muted">
          Example time zones we convert for: {country.timezoneExamples.join(", ")}. Teacher
          timezone: {siteConfig.teacherTimezone}.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-ink">Pricing in {country.currencyLabel}</h2>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Packages are shown in {country.currency} for {country.adjective} families. See{" "}
          <Link href="/pricing" className="font-semibold text-teal underline">
            pricing
          </Link>{" "}
          for placeholder rates, then book a free trial to confirm.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <BookTrialButton />
          <WhatsAppButton messageKey="home" />
        </div>

        <h2 className="mt-12 text-2xl font-bold text-ink">
          Reviews from {country.shortName} families
        </h2>
        <div className="mt-4">
          <ReviewList
            filterIds={country.localReviewIds}
            emptyMessage={`We do not show placeholder reviews. When we have real feedback from ${country.shortName} families, it will appear here.`}
          />
        </div>
      </article>

      <FAQ items={country.commonQuestions} title={`${country.shortName} — common questions`} />
      <TrialCTA whatsappKey="home" />
    </>
  );
}
