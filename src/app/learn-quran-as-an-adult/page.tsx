import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { TrialCTA } from "@/components/TrialCTA";
import { adultFaq } from "@/data/faq";
import { BookTrialButton, WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = createMetadata({
  title: "Learn Quran Online as an Adult — Beginners Welcome",
  description:
    "Online Quran classes for adults and new Muslims. No Arabic needed. Start from the letters with patient one-to-one lessons.",
  path: "/learn-quran-as-an-adult",
});

export default function AdultsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: adultFaq.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: { "@type": "Answer", text: q.answer },
          })),
        }}
      />
      <PageHeader
        title="Online Quran classes for adults"
        description="No experience needed. No judgment. Start from the letters."
        breadcrumb={[{ label: "For Adults", href: "/learn-quran-as-an-adult" }]}
      />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-lg text-ink-muted">
          Want to learn Quran online for beginners as an adult? You are in the right place. Many
          adults and new Muslims start with Noorani Qaida or the Arabic letters. Lessons are in
          English, one-to-one, and paced for working schedules across UK, US, Canadian and
          Australian time zones.
        </p>
        <h2 className="mt-10 text-2xl font-bold">What adults often start with</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
          <li>Arabic letters and Noorani Qaida</li>
          <li>Slow, accurate Quran reading</li>
          <li>Basic Tajweed explained simply</li>
          <li>Islamic Studies: prayer, wudu and everyday duas</li>
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <BookTrialButton />
          <WhatsAppButton messageKey="adults" />
        </div>
      </article>
      <FAQ items={adultFaq} />
      <TrialCTA whatsappKey="adults" />
    </>
  );
}
