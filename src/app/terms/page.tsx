import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/Hero";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "Terms of service draft for Noor Quran Academy.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        description="Plain-English draft terms for using this website and booking classes."
        breadcrumb={[{ label: "Terms", href: "/terms" }]}
      />
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-ink-muted sm:px-6">
        <p className="rounded-lg border border-gold bg-gold-soft/50 px-4 py-3 text-sm text-ink">
          <strong>Draft — have this reviewed by a qualified professional before launch.</strong>
        </p>
        <p>Last updated: [TODO: date]</p>
        <h2 className="text-xl font-bold text-ink">Website use</h2>
        <p>
          By using {siteConfig.name}&apos;s website you agree to these terms. Content is for
          general information about our classes.
        </p>
        <h2 className="text-xl font-bold text-ink">Free trial</h2>
        <p>
          A free trial is an introductory lesson. It does not create an ongoing contract until you
          agree to a paid package. [TODO: confirm trial length and any limits]
        </p>
        <h2 className="text-xl font-bold text-ink">Lessons</h2>
        <p>
          Classes are live one-to-one via Zoom or Google Meet. You are responsible for a stable
          internet connection and a suitable device.
        </p>
        <h2 className="text-xl font-bold text-ink">Conduct</h2>
        <p>
          We expect respectful behaviour from students and families. We may pause lessons if
          safeguarding or conduct issues arise.
        </p>
        <h2 className="text-xl font-bold text-ink">Liability</h2>
        <p>
          [TODO: legal review]. To the extent permitted by law, we are not liable for indirect
          losses arising from use of the website or scheduling conflicts caused by time-zone or
          technical issues outside our control.
        </p>
      </article>
    </>
  );
}
