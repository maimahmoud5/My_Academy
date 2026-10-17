import Link from "next/link";
import { siteConfig } from "@/config/site";
import { subjects } from "@/data/subjects";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/safeguarding", label: "Safeguarding" },
];

const main = [
  { href: "/about", label: "About" },
  { href: "/teachers", label: "Teachers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/free-trial", label: "Free Trial" },
  { href: "/for-parents", label: "For Parents" },
  { href: "/learn-quran-as-an-adult", label: "For Adults" },
];

const countries = [
  { href: "/online-quran-classes-uk", label: "UK" },
  { href: "/online-quran-classes-usa", label: "USA" },
  { href: "/online-quran-classes-canada", label: "Canada" },
  { href: "/online-quran-classes-australia", label: "Australia" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-teal-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Live one-to-one Quran, Tajweed, Arabic & Islamic Studies for kids and adults in the{" "}
            {siteConfig.countriesServed.join(", ")}.
          </p>
          <div className="mt-4">
            <WhatsAppButton messageKey="contact" label="WhatsApp us" className="!text-sm" />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-soft">Classes</p>
          <ul className="mt-3 space-y-2">
            {subjects.map((s) => (
              <li key={s.slug}>
                <Link href={s.href} className="text-sm text-white/80 hover:text-white">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-soft">Explore</p>
          <ul className="mt-3 space-y-2">
            {main.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/80 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-soft">Countries</p>
          <ul className="mt-3 space-y-2">
            {countries.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/80 hover:text-white">
                  Online Quran classes — {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-gold-soft">
            Social
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <a href={siteConfig.social.facebook} className="hover:text-white">
                Facebook
              </a>
            </li>
            <li>
              <a href={siteConfig.social.instagram} className="hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href={siteConfig.social.tiktok} className="hover:text-white">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Serving families in the UK, USA,
            Canada & Australia.
          </p>
          <ul className="flex flex-wrap gap-3">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
