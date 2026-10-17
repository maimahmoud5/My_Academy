import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/Hero";
import { ReviewList, hasReviews } from "@/components/ReviewList";
import { TrialCTA } from "@/components/TrialCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import reviews from "@/data/reviews.json";
import type { Review } from "@/components/ReviewList";

export const metadata = createMetadata({
  title: "Reviews",
  description: "Real family reviews of Noor Quran Academy. We never publish fake testimonials.",
  path: "/reviews",
});

export default function ReviewsPage() {
  const list = reviews as Review[];
  const avg =
    list.length > 0
      ? list.reduce((s, r) => s + (r.rating ?? 0), 0) / list.filter((r) => r.rating).length
      : 0;

  return (
    <>
      {hasReviews() && list.some((r) => r.rating) && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Noor Quran Academy",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: avg.toFixed(1),
              reviewCount: list.filter((r) => r.rating).length,
            },
          }}
        />
      )}
      <PageHeader
        title="Reviews from families"
        description="Only real feedback appears here. If this page looks quiet, we are still early — and honest about it."
        breadcrumb={[{ label: "Reviews", href: "/reviews" }]}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <ReviewList />
      </div>
      <TrialCTA />
    </>
  );
}
