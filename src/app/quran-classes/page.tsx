import { getSubject } from "@/data/subjects";
import { SubjectPageView, subjectMetadata } from "@/components/SubjectPageView";
import { createMetadata } from "@/lib/seo";

const slug = "quran-classes";
const meta = subjectMetadata(slug);

export const metadata = createMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.path,
});

export default function Page() {
  return <SubjectPageView subject={getSubject(slug)!} />;
}
