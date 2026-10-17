import { getSubject } from "@/data/subjects";
import { SubjectPageView, subjectMetadata } from "@/components/SubjectPageView";
import { createMetadata } from "@/lib/seo";

const slug = "quran-memorization";
const meta = subjectMetadata(slug);

export const metadata = createMetadata({
  title: "Online Quran Memorization (Hifz) Classes",
  description: meta.description,
  path: meta.path,
});

export default function Page() {
  return <SubjectPageView subject={getSubject(slug)!} />;
}
