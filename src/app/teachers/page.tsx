import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/Hero";
import { TrialCTA } from "@/components/TrialCTA";
import { teachers } from "@/data/teachers";

export const metadata = createMetadata({
  title: "Teachers",
  description:
    "Meet the Noor Quran Academy teacher. Credentials are shown only when verified in our data.",
  path: "/teachers",
});

export default function TeachersPage() {
  return (
    <>
      <PageHeader
        title="Our teachers"
        description="Profiles are kept honest — we only list credentials that exist in our data."
        breadcrumb={[{ label: "Teachers", href: "/teachers" }]}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <ul className="grid gap-8 md:grid-cols-2">
          {teachers.map((t) => (
            <li key={t.id} className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-4 flex aspect-[4/3] items-end rounded-xl border border-dashed border-border bg-cream-dark p-3 text-xs text-ink-muted">
                Image slot: {t.image ?? "/images/placeholder-teacher.jpg"}
              </div>
              <h2 className="text-xl font-bold text-ink">{t.name}</h2>
              <p className="text-sm text-teal">{t.role}</p>
              <p className="mt-3 text-sm text-ink-muted">{t.bio}</p>
              <p className="mt-4 text-sm">
                <span className="font-semibold">Subjects:</span> {t.subjects.join(", ")}
              </p>
              <p className="mt-1 text-sm">
                <span className="font-semibold">Languages:</span> {t.languages.join(", ")}
              </p>
              {t.credentials && t.credentials.length > 0 ? (
                <ul className="mt-3 list-disc pl-5 text-sm text-ink-muted">
                  {t.credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-ink-muted">
                  [TODO: add verified credentials only — none listed yet]
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <TrialCTA />
    </>
  );
}
