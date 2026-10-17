import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/Hero";
import { PricingTable } from "@/components/PricingTable";
import { TrialCTA } from "@/components/TrialCTA";

export const metadata = createMetadata({
  title: "Pricing",
  description:
    "Package pricing for online Quran classes in GBP, USD, CAD and AUD. Free trial available before you commit.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Pricing"
        description="Placeholder rates until confirmed. Book a free trial first — no commitment."
        breadcrumb={[{ label: "Pricing", href: "/pricing" }]}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <PricingTable />
      </div>
      <TrialCTA whatsappKey="pricing" />
    </>
  );
}
