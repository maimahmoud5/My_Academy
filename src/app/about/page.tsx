import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/Hero";
import { TrialCTA } from "@/components/TrialCTA";
import { BookTrialButton, WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata = createMetadata({
  title: "About Us",
  description: siteConfig.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Noor Quran Academy"
        description="Live one-to-one online classes for families who want calm, clear Quran learning."
        breadcrumb={[{ label: "About", href: "/about" }]}
      />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-lg leading-relaxed text-ink-muted">
          Noor Quran Academy offers live one-to-one online classes in Quran reading, Noorani
          Qaida, Tajweed, Quran memorization, Arabic and Islamic Studies. We teach children,
          teenagers and adults living in the UK, USA, Canada and Australia. You do not need any
          Arabic to start. Classes are in English, at times that fit your time zone. Book a free
          trial class and meet your teacher.
        </p>
        <h2 className="mt-10 text-2xl font-bold text-ink">Our approach</h2>
        <p className="mt-3 text-ink-muted">
          Lessons are patient and practical. We explain rules in plain English, keep parents in
          the loop for children, and never assume prior knowledge. The teacher works from Egypt —
          we schedule around your local clock.
        </p>
        <h2 className="mt-10 text-2xl font-bold text-ink">What we do not claim</h2>
        <p className="mt-3 text-ink-muted">
          We do not invent credentials, student counts or testimonials. Teacher qualifications
          appear only when listed in our data files.{" "}
          <span className="font-medium text-ink">
            [TODO: add verified teacher credentials and years of experience]
          </span>
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <BookTrialButton />
          <WhatsAppButton messageKey="home" />
        </div>
      </article>
      <TrialCTA />
    </>
  );
}
