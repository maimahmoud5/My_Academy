import reviews from "@/data/reviews.json";

export type Review = {
  id: string;
  name: string;
  country?: string;
  rating?: number;
  text: string;
  date?: string;
};

export function ReviewList({
  filterIds,
  emptyMessage = "Our first reviews are coming soon. Book a free trial and you could be among the first families we serve.",
}: {
  filterIds?: string[];
  emptyMessage?: string;
}) {
  const all = reviews as Review[];
  const list = filterIds?.length
    ? all.filter((r) => filterIds.includes(r.id))
    : all;

  if (list.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-cream-dark/40 px-6 py-12 text-center">
        <p className="text-ink-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {list.map((review) => (
        <li key={review.id} className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-semibold text-ink">{review.name}</p>
            {review.country && (
              <span className="text-xs text-ink-muted">{review.country}</span>
            )}
          </div>
          {typeof review.rating === "number" && (
            <p className="mt-1 text-sm text-gold" aria-label={`${review.rating} out of 5`}>
              {"★".repeat(Math.round(review.rating))}
              {"☆".repeat(5 - Math.round(review.rating))}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{review.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function hasReviews() {
  return (reviews as Review[]).length > 0;
}
