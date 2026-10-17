import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { TrialCTA } from "@/components/TrialCTA";
import { parentsFaq } from "@/data/faq";
import { BookTrialButton, WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = createMetadata({
  title: "For Kids and Parents — Quran Classes",
  description:
    "Online Quran classes for kids with parent involvement, progress reports and clear safeguarding. Beginners welcome.",
  path: "/for-parents",
});

export default function ForParentsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: parentsFaq.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: { "@type": "Answer", text: q.answer },
          })),
        }}
      />
      <PageHeader
        title="Quran classes for kids and parents"
        description="Progress you can see, lessons you can sit in on, and a calm start for beginners."
        breadcrumb={[{ label: "For Parents", href: "/for-parents" }]}
      />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-lg text-ink-muted">
          Looking for online Quran classes for your child? We teach Noorani Qaida, Quran reading,
          Tajweed, memorization, Arabic and Islamic Studies in live one-to-one lessons — explained
          in English.
        </p>
        <h2 className="mt-10 text-2xl font-bold">Progress reports</h2>
        <p className="mt-3 text-ink-muted">
          Families receive a monthly progress report covering what was learned and what to
          practise next. [TODO: confirm report format]
        </p>
        <h2 className="mt-10 text-2xl font-bold">Safety</h2>
        <p className="mt-3 text-ink-muted">
          Parents can sit in. Teachers do not privately message children outside the platform.
          Read our{" "}
          <Link href="/safeguarding" className="font-semibold text-teal underline">
            safeguarding page
          </Link>
          .
        </p>
        <h2 className="mt-10 text-2xl font-bold">Age guidance</h2>
        <p className="mt-3 text-ink-muted">
          [TODO: confirm minimum age]. Many children start when they can sit for a short lesson
          and follow simple instructions. We will advise after the free trial.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <BookTrialButton />
          <WhatsAppButton messageKey="parents" />
        </div>
      </article>
      <FAQ items={parentsFaq} />
      <TrialCTA whatsappKey="parents" />
    </>
  );
}
