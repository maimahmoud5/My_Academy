import Link from "next/link";
import { getSubject } from "@/data/subjects";
import { SubjectPageView, subjectMetadata } from "@/components/SubjectPageView";
import { createMetadata } from "@/lib/seo";

const slug = "noorani-qaida";
const meta = subjectMetadata(slug);

export const metadata = createMetadata({
  title: "Online Noorani Qaida Classes for Beginners",
  description: meta.description,
  path: meta.path,
});

export default function Page() {
  return (
    <SubjectPageView
      subject={getSubject(slug)!}
      extraSections={
        <>
          <h2 className="mt-10 text-2xl font-bold text-ink">For parents starting Qaida</h2>
          <p className="mt-3 text-ink-muted">
            Noorani Qaida is often the first step before full Quran reading. See also our{" "}
            <Link href="/for-parents" className="font-semibold text-teal underline">
              parents guide
            </Link>{" "}
            and{" "}
            <Link href="/tajweed-classes" className="font-semibold text-teal underline">
              Tajweed classes
            </Link>{" "}
            for the next stage.
          </p>
        </>
      }
    />
  );
}
