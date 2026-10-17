import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SubjectCard } from "@/components/SubjectCard";
import { FAQ } from "@/components/FAQ";
import { TrialCTA } from "@/components/TrialCTA";
import { subjects } from "@/data/subjects";
import { homeFaq } from "@/data/faq";
import { teachers } from "@/data/teachers";
import { BookTrialButton, WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Noor Quran Academy | Online Quran Classes",
  description: siteConfig.description,
  path: "/",
});

const steps = [
  {
    n: "1",
    title: "Tell us about the student",
    body: "Share age, level and which subject you want — Quran, Qaida, Tajweed, Hifz, Arabic or Islamic Studies.",
  },
  {
    n: "2",
    title: "Pick a time in your time zone",
    body: "We show available windows converted from Cairo time to yours, including daylight saving.",
  },
  {
    n: "3",
    title: "Meet your teacher",
    body: "Join a live one-to-one lesson on Zoom or Google Meet. Parents are welcome to sit in.",
  },
];

const whyUs = [
  {
    title: "Beginners welcome",
    body: "No Arabic needed. Many students start from the letters with Noorani Qaida.",
  },
  {
    title: "Kids and adults",
    body: "Children, teenagers, adult beginners and new Muslims all learn one-to-one.",
  },
  {
    title: "Your time zone",
    body: "Teacher based in Egypt — lessons scheduled to fit UK, USA, Canada and Australia.",
  },
  {
    title: "Parent-friendly",
    body: "Sit in on lessons, no private chats with children, monthly progress updates.",
  },
];

export default function HomePage() {
  const teacher = teachers[0];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaq.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: { "@type": "Answer", text: q.answer },
          })),
        }}
      />

      <Hero
        brandAsH1
        title="Online Quran, Tajweed & Arabic classes for kids and adults"
        subtitle="Live one-to-one lessons with a qualified teacher. Beginners welcome. No Arabic needed."
        whatsappKey="home"
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">Who we teach</h2>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Online Quran classes for children, teenagers and adults living in the UK, USA, Canada
          and Australia. Families from Pakistani, Indian and Western backgrounds — including new
          Muslims — are all welcome.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-lg font-semibold text-ink">Kids & parents</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Short, focused lessons with room for a parent to sit in. Progress you can see.
            </p>
            <Link href="/for-parents" className="mt-4 inline-block text-sm font-semibold text-teal">
              For kids & parents →
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-lg font-semibold text-ink">Adults & new Muslims</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Start from the letters at your pace. No judgment if you have never read Arabic.
            </p>
            <Link
              href="/learn-quran-as-an-adult"
              className="mt-4 inline-block text-sm font-semibold text-teal"
            >
              For adult beginners →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream-dark/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">Five subjects, one teacher</h2>
          <p className="mt-3 max-w-2xl text-ink-muted">
            Choose the path that fits — or tell us you are not sure and we will advise on the free
            trial.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((s) => (
              <SubjectCard key={s.slug} subject={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">How a free trial works</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n} className="rounded-2xl border border-border bg-surface p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                {step.n}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <BookTrialButton />
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">Why families choose us</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {whyUs.map((item) => (
              <div key={item.title} className="border-l-4 border-gold pl-4">
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">Meet your teacher</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr] md:items-start">
          <div className="flex aspect-[3/4] items-end rounded-2xl border border-dashed border-border bg-cream-dark p-4 text-xs text-ink-muted">
            Image slot: {teacher.image}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-ink">{teacher.name}</h3>
            <p className="text-sm text-teal">{teacher.role}</p>
            <p className="mt-3 text-ink-muted">{teacher.bio}</p>
            <p className="mt-3 text-sm text-ink-muted">
              Languages: {teacher.languages.join(", ")}
            </p>
            <Link href="/teachers" className="mt-4 inline-block text-sm font-semibold text-teal">
              Teacher profile →
            </Link>
          </div>
        </div>
      </section>

      <FAQ items={homeFaq} />

      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-cream-dark/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-muted">Prefer to chat first?</p>
          <WhatsAppButton messageKey="home" />
        </div>
      </section>

      <TrialCTA whatsappKey="home" />
    </>
  );
}
