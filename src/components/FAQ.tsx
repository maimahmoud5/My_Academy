import type { FAQItem } from "@/data/faq";

export function FAQ({
  items,
  title = "Frequently asked questions",
}: {
  items: FAQItem[];
  title?: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h2 className="text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-border bg-surface px-4 py-3 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none py-1 font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                {item.question}
                <span className="text-teal transition group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-2 pb-2 text-sm leading-relaxed text-ink-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
