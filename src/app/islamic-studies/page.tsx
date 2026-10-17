import { getSubject } from "@/data/subjects";
import { SubjectPageView, subjectMetadata } from "@/components/SubjectPageView";
import { createMetadata } from "@/lib/seo";

const slug = "islamic-studies";
const meta = subjectMetadata(slug);

export const metadata = createMetadata({
  title: "Islamic Studies — Prayer, Wudu, Duas & Seerah",
  description: meta.description,
  path: meta.path,
});

export default function Page() {
  return <SubjectPageView subject={getSubject(slug)!} />;
}
