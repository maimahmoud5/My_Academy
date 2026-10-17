import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/Hero";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Privacy policy draft for Noor Quran Academy.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="How we handle personal information from trial requests and contact forms."
        breadcrumb={[{ label: "Privacy", href: "/privacy" }]}
      />
      <article className="prose-nqa mx-auto max-w-3xl space-y-4 px-4 py-10 text-ink-muted sm:px-6">
        <p className="rounded-lg border border-gold bg-gold-soft/50 px-4 py-3 text-sm text-ink">
          <strong>Draft — have this reviewed by a qualified professional before launch.</strong>
        </p>
        <p>Last updated: [TODO: date]</p>
        <h2 className="text-xl font-bold text-ink">Who we are</h2>
        <p>
          {siteConfig.name} (&quot;we&quot;) provides online educational classes. Contact:{" "}
          {siteConfig.contact.email}.
        </p>
        <h2 className="text-xl font-bold text-ink">What we collect</h2>
        <p>
          When you book a free trial or contact us, we may collect student name, age band, parent
          or student contact details, country, city, subject interest, preferred times, time zone,
          WhatsApp number, email, message content, and marketing attribution (UTM parameters and
          landing page).
        </p>
        <h2 className="text-xl font-bold text-ink">Why we collect it</h2>
        <p>
          To schedule lessons, reply to enquiries, improve our service, and understand which
          countries and channels bring families to us.
        </p>
        <h2 className="text-xl font-bold text-ink">Cookies and analytics</h2>
        <p>
          Analytics cookies (Google Analytics 4 and Meta Pixel) load only after you accept our
          cookie banner. You can reject analytics and still use the site.
        </p>
        <h2 className="text-xl font-bold text-ink">Sharing</h2>
        <p>
          We use processors such as email (Resend) and database hosting (Supabase) to operate the
          site. We do not sell your personal data.
        </p>
        <h2 className="text-xl font-bold text-ink">Your rights</h2>
        <p>
          Depending on where you live (including UK GDPR), you may have rights to access, correct,
          delete or restrict processing of your data. Contact us to exercise these rights.
        </p>
        <h2 className="text-xl font-bold text-ink">Children</h2>
        <p>
          We collect information about child students only as provided by a parent or guardian for
          educational purposes. Communication about minors goes through parents.
        </p>
      </article>
    </>
  );
}
