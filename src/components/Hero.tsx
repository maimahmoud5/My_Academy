import Link from "next/link";
import { BookTrialButton, WhatsAppButton } from "@/components/WhatsAppButton";

type HeroProps = {
  title: string;
  subtitle: string;
  brandAsH1?: boolean;
  whatsappKey?: string;
  showCtas?: boolean;
  children?: React.ReactNode;
};

export function Hero({
  title,
  subtitle,
  brandAsH1 = false,
  whatsappKey = "home",
  showCtas = true,
  children,
}: HeroProps) {
  return (
    <section className="pattern-subtle relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal/5 via-transparent to-gold/10" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
        <div>
          {brandAsH1 ? (
            <>
              <p className="animate-fade-up font-semibold tracking-wide text-teal">
                Noor Quran Academy
              </p>
              <h1 className="animate-fade-up-delay mt-3 max-w-2xl text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
                {title}
              </h1>
            </>
          ) : (
            <h1 className="animate-fade-up max-w-2xl text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          )}
          <p className="animate-fade-up-delay mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {subtitle}
          </p>
          {showCtas && (
            <div className="animate-fade-up-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <BookTrialButton />
              <WhatsAppButton messageKey={whatsappKey} />
            </div>
          )}
          {children}
        </div>
        <div className="animate-fade-up-delay relative min-h-[220px] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-teal-dark via-teal to-teal-light shadow-lg lg:min-h-[320px]">
          <div className="absolute inset-0 opacity-30 pattern-subtle" />
          <div className="relative flex h-full min-h-[220px] flex-col justify-end p-6 text-white lg:min-h-[320px]">
            <p
              lang="ar"
              dir="rtl"
              className="font-[family-name:var(--font-amiri)] text-3xl leading-relaxed sm:text-4xl"
            >
              ٱقْرَأْ بِٱسْمِ رَبِّكَ
            </p>
            <p className="mt-3 text-sm text-white/80">
              Beginners welcome. No Arabic needed. Live one-to-one classes.
            </p>
            {/* Image slot for real class/teacher photo */}
            <p className="mt-4 text-xs text-white/50">
              [Image slot: replace with /public/images/placeholder-hero.jpg]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHeader({
  title,
  description,
  breadcrumb,
}: {
  title: string;
  description: string;
  breadcrumb?: { label: string; href: string }[];
}) {
  return (
    <header className="border-b border-border bg-cream-dark/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-muted">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:text-teal">
                  Home
                </Link>
              </li>
              {breadcrumb.map((item) => (
                <li key={item.href} className="flex items-center gap-1">
                  <span aria-hidden="true">/</span>
                  <Link href={item.href} className="hover:text-teal">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">{description}</p>
      </div>
    </header>
  );
}
