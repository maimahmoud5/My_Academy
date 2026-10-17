import { getSubject } from "@/data/subjects";
import { SubjectPageView, subjectMetadata } from "@/components/SubjectPageView";
import { createMetadata } from "@/lib/seo";

const slug = "arabic-classes";
const meta = subjectMetadata(slug);

export const metadata = createMetadata({
  title: "Online Arabic Classes for Kids and Adults",
  description: meta.description,
  path: meta.path,
});

export default function Page() {
  return <SubjectPageView subject={getSubject(slug)!} />;
}
