import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/Hero";

export const metadata = createMetadata({
  title: "Refund Policy",
  description: "Refund and cancellation policy draft for Noor Quran Academy.",
  path: "/refund-policy",
});

export default function RefundPage() {
  return (
    <>
      <PageHeader
        title="Refund Policy"
        description="How cancellations, reschedules and refunds work — draft wording."
        breadcrumb={[{ label: "Refund Policy", href: "/refund-policy" }]}
      />
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-ink-muted sm:px-6">
        <p className="rounded-lg border border-gold bg-gold-soft/50 px-4 py-3 text-sm text-ink">
          <strong>Draft — have this reviewed by a qualified professional before launch.</strong>
        </p>
        <p>Last updated: [TODO: date]</p>
        <h2 className="text-xl font-bold text-ink">Free trial</h2>
        <p>The free trial class is free of charge. No payment is required to book it.</p>
        <h2 className="text-xl font-bold text-ink">Paid packages</h2>
        <p>
          [TODO: confirm billing cycle — monthly packages vs pay-per-class]. Refund rules will
          depend on whether lessons in a package have already been delivered.
        </p>
        <h2 className="text-xl font-bold text-ink">Cancellations & reschedules</h2>
        <p>
          [TODO: confirm notice period, e.g. 24 hours]. We aim to be flexible for families when
          given reasonable notice.
        </p>
        <h2 className="text-xl font-bold text-ink">How to request a refund</h2>
        <p>
          Contact us by WhatsApp or email with your name, package details and reason. We will
          respond within [TODO: response time].
        </p>
      </article>
    </>
  );
}
