import Link from "next/link";
import type { Subject } from "@/data/subjects";
import { getSubject, subjects } from "@/data/subjects";
import { PageHeader } from "@/components/Hero";
import { TrialCTA } from "@/components/TrialCTA";
import { FAQ } from "@/components/FAQ";
import { homeFaq } from "@/data/faq";
import { BookTrialButton, WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";

const whatsappBySlug: Record<string, string> = {
  "quran-classes": "quran",
  "noorani-qaida": "qaida",
  "tajweed-classes": "tajweed",
  "quran-memorization": "hifz",
  "arabic-classes": "arabic",
  "islamic-studies": "islamic",
};

export function SubjectPageView({
  subject,
  extraFaq,
  extraSections,
}: {
  subject: Subject;
  extraFaq?: { question: string; answer: string }[];
  extraSections?: React.ReactNode;
}) {
  const related = subject.related
    .map((slug) => getSubject(slug))
    .filter(Boolean) as Subject[];
  const wa = whatsappBySlug[subject.slug] ?? "default";
  const faq = extraFaq ?? homeFaq.slice(0, 5);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: subject.name,
          description: subject.description,
          provider: {
            "@type": "EducationalOrganization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
          },
          url: absoluteUrl(subject.href),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            {
              "@type": "ListItem",
              position: 2,
              name: subject.name,
              item: absoluteUrl(subject.href),
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: { "@type": "Answer", text: q.answer },
          })),
        }}
      />

      <PageHeader
        title={subject.name}
        description={subject.summary}
        breadcrumb={[{ label: subject.shortName, href: subject.href }]}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-lg leading-relaxed text-ink-muted">
          Looking for <strong>{subject.keyword}</strong>? {subject.description} Classes are live
          one-to-one, taught in English, for students in the UK, USA, Canada and Australia.
          Beginners are welcome.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-ink">Who this is for</h2>
        <p className="mt-3 text-ink-muted">{subject.whoFor}</p>

        <h2 className="mt-10 text-2xl font-bold text-ink">What you can expect</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
          {subject.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>

        <h2 className="mt-10 text-2xl font-bold text-ink">How a free trial works</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-muted">
          <li>Tell us about the student.</li>
          <li>Pick a time in your own time zone.</li>
          <li>Meet your teacher on Zoom or Google Meet.</li>
        </ol>

        {extraSections}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <BookTrialButton />
          <WhatsAppButton messageKey={wa} />
        </div>

        {related.length > 0 && (
          <>
            <h2 className="mt-12 text-2xl font-bold text-ink">Related classes</h2>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={r.href} className="font-medium text-teal underline">
                    {r.name}
                  </Link>
                  <span className="text-ink-muted"> — {r.summary}</span>
                </li>
              ))}
              <li>
                <Link href="/for-parents" className="font-medium text-teal underline">
                  For kids & parents
                </Link>
              </li>
            </ul>
          </>
        )}
      </article>

      <FAQ items={faq} />
      <TrialCTA whatsappKey={wa} />
    </>
  );
}

export function subjectMetadata(slug: string) {
  const subject = subjects.find((s) => s.slug === slug)!;
  return {
    title: subject.name,
    description: `${subject.summary} Live one-to-one classes with ${siteConfig.name}. Beginners welcome.`,
    path: subject.href,
  };
}
