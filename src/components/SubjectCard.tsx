import Link from "next/link";
import type { Subject } from "@/data/subjects";
import { BookOpen, Languages, Sparkles, BookMarked, GraduationCap, Heart } from "lucide-react";

const icons = {
  "quran-classes": BookOpen,
  "noorani-qaida": Sparkles,
  "tajweed-classes": BookMarked,
  "quran-memorization": GraduationCap,
  "arabic-classes": Languages,
  "islamic-studies": Heart,
} as const;

export function SubjectCard({ subject }: { subject: Subject }) {
  const Icon = icons[subject.slug] ?? BookOpen;
  return (
    <Link
      href={subject.href}
      className="group block rounded-2xl border border-border bg-surface p-5 transition hover:border-teal/40 hover:shadow-md focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition group-hover:bg-teal group-hover:text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{subject.shortName}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{subject.summary}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-teal">Learn more →</span>
    </Link>
  );
}
