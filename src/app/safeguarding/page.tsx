import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/Hero";
import { TrialCTA } from "@/components/TrialCTA";
import { safeguardingContent } from "@/config/safeguarding";

export const metadata = createMetadata({
  title: "Safe and Trusted Learning",
  description:
    "How Noor Quran Academy keeps online Quran lessons safe for children — parent sit-ins, no private chats, monthly progress reports.",
  path: "/safeguarding",
});

export default function SafeguardingPage() {
  return (
    <>
      <PageHeader
        title={safeguardingContent.title}
        description={safeguardingContent.intro}
        breadcrumb={[{ label: "Safeguarding", href: "/safeguarding" }]}
      />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <ul className="space-y-6">
          {safeguardingContent.points.map((p) => (
            <li key={p.title} className="border-l-4 border-teal pl-4">
              <h2 className="text-lg font-semibold text-ink">{p.title}</h2>
              <p className="mt-2 text-ink-muted">{p.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-ink-muted">{safeguardingContent.closing}</p>
        <p className="mt-4 text-xs text-ink-muted">
          Edit this page via <code>src/config/safeguarding.ts</code>.
        </p>
      </article>
      <TrialCTA whatsappKey="parents" />
    </>
  );
}
