import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/Hero";
import { FreeTrialForm } from "@/components/forms/FreeTrialForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact Noor Quran Academy by WhatsApp, email, or the free trial form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact us"
        description="WhatsApp is usually fastest. Email and the trial form work too."
        breadcrumb={[{ label: "Contact", href: "/contact" }]}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-ink">Ways to reach us</h2>
          <ul className="mt-4 space-y-3 text-ink-muted">
            <li>
              <span className="font-semibold text-ink">WhatsApp:</span>{" "}
              {siteConfig.contact.whatsappDisplay}
            </li>
            <li>
              <span className="font-semibold text-ink">Email:</span> {siteConfig.contact.email}
            </li>
            <li>
              <span className="font-semibold text-ink">Teacher location:</span>{" "}
              {siteConfig.teacherLocation} ({siteConfig.teacherTimezone})
            </li>
          </ul>
          <div className="mt-6">
            <WhatsAppButton messageKey="contact" />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
          <h2 className="text-xl font-bold text-ink">Request a free trial</h2>
          <p className="mt-2 text-sm text-ink-muted">Same form as our booking page.</p>
          <div className="mt-6">
            <FreeTrialForm />
          </div>
        </div>
      </div>
    </>
  );
}
