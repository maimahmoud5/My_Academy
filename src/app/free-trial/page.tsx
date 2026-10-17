import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/Hero";
import { FreeTrialForm } from "@/components/forms/FreeTrialForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata = createMetadata({
  title: "Book a Free Trial Class",
  description:
    "Book a free one-to-one trial Quran class. Tell us about the student, pick a time in your time zone, and meet your teacher.",
  path: "/free-trial",
});

export default function FreeTrialPage() {
  return (
    <>
      <PageHeader
        title="Book a free trial class"
        description="Tell us about the student, pick a time in your time zone, and meet your teacher on Zoom or Google Meet."
        breadcrumb={[{ label: "Free Trial", href: "/free-trial" }]}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_280px]">
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <FreeTrialForm />
        </div>
        <aside className="h-fit rounded-2xl border border-border bg-cream-dark/50 p-5">
          <h2 className="font-semibold text-ink">Prefer WhatsApp?</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Message us and we will help you choose a subject and time.
          </p>
          <div className="mt-4">
            <WhatsAppButton messageKey="default" className="w-full" />
          </div>
          <ol className="mt-6 list-decimal space-y-2 pl-4 text-sm text-ink-muted">
            <li>Tell us about the student.</li>
            <li>Pick a time in your own time zone.</li>
            <li>Meet your teacher on Zoom or Google Meet.</li>
          </ol>
        </aside>
      </div>
    </>
  );
}
