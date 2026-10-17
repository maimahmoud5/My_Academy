import { getCountryBySlug } from "@/data/countries";
import { CountryPage } from "@/components/CountryPage";
import { createMetadata } from "@/lib/seo";

const slug = "online-quran-classes-canada";
const country = getCountryBySlug(slug)!;

export const metadata = createMetadata({
  title: "Online Quran Classes Canada",
  description: country.heroIntro,
  path: `/${slug}`,
  noIndex: !country.published,
});

export default function Page() {
  return <CountryPage country={country} />;
}
