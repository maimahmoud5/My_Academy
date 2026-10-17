export type SubjectSlug =
  | "quran-classes"
  | "noorani-qaida"
  | "tajweed-classes"
  | "quran-memorization"
  | "arabic-classes"
  | "islamic-studies";

export type Subject = {
  slug: SubjectSlug;
  name: string;
  shortName: string;
  href: string;
  keyword: string;
  summary: string;
  description: string;
  whoFor: string;
  outcomes: string[];
  related: SubjectSlug[];
};

export const subjects: Subject[] = [
  {
    slug: "quran-classes",
    name: "Online Quran Classes",
    shortName: "Quran Reading",
    href: "/quran-classes",
    keyword: "online Quran classes",
    summary:
      "Live one-to-one Quran reading lessons for kids and adults, at your pace.",
    description:
      "Build fluent, accurate Quran reading with a patient teacher. Suitable for beginners who know the letters and for students who want to improve fluency.",
    whoFor: "Children, teenagers and adults who want to read the Quran clearly.",
    outcomes: [
      "Steady reading practice with live feedback",
      "Correction of common mistakes",
      "Confidence reading familiar and new passages",
    ],
    related: ["noorani-qaida", "tajweed-classes", "quran-memorization"],
  },
  {
    slug: "noorani-qaida",
    name: "Online Noorani Qaida Classes",
    shortName: "Noorani Qaida",
    href: "/noorani-qaida",
    keyword: "Noorani Qaida online",
    summary:
      "Start from the Arabic letters. Ideal for absolute beginners and young children.",
    description:
      "Noorani Qaida teaches the Arabic alphabet, letter forms, joining letters, and the first steps of reading. No prior Arabic is needed.",
    whoFor: "Absolute beginners, young children, and adults starting from zero.",
    outcomes: [
      "Recognise Arabic letters and sounds",
      "Read joined letters and short words",
      "Build a base for Quran reading and Tajweed",
    ],
    related: ["quran-classes", "tajweed-classes", "arabic-classes"],
  },
  {
    slug: "tajweed-classes",
    name: "Online Tajweed Classes",
    shortName: "Tajweed",
    href: "/tajweed-classes",
    keyword: "online Tajweed classes",
    summary:
      "Learn the rules of correct pronunciation so your reading is clear and beautiful.",
    description:
      "Tajweed lessons focus on articulation points, elongation, stopping and starting, and applying rules while reading — explained in plain English.",
    whoFor: "Students who can already read and want correct pronunciation.",
    outcomes: [
      "Understand core Tajweed rules in simple language",
      "Apply rules while reading aloud",
      "Reduce common pronunciation mistakes",
    ],
    related: ["quran-classes", "quran-memorization", "noorani-qaida"],
  },
  {
    slug: "quran-memorization",
    name: "Online Quran Memorization (Hifz)",
    shortName: "Hifz / Memorization",
    href: "/quran-memorization",
    keyword: "Quran memorization online",
    summary:
      "Structured memorization with revision plans that fit school and family life.",
    description:
      "Hifz lessons combine new memorization with revision (muraja'ah). We set a realistic pace based on age, schedule and goals — whether a few surahs or a longer journey.",
    whoFor: "Kids, teens and adults who want to memorise with a clear plan.",
    outcomes: [
      "A memorization and revision schedule that fits your life",
      "Regular listening and correction",
      "Steady retention through structured muraja'ah",
    ],
    related: ["tajweed-classes", "quran-classes", "noorani-qaida"],
  },
  {
    slug: "arabic-classes",
    name: "Online Arabic Classes",
    shortName: "Arabic",
    href: "/arabic-classes",
    keyword: "online Arabic classes for kids",
    summary:
      "Arabic language lessons for kids and adults — reading, vocabulary and conversation basics.",
    description:
      "Learn Modern Standard Arabic foundations: letters, reading, everyday vocabulary and simple sentences. Classes are in English with Arabic taught step by step.",
    whoFor: "Children and adults who want Arabic language skills beyond Quran reading.",
    outcomes: [
      "Arabic letter recognition and reading",
      "Useful vocabulary and phrases",
      "Confidence forming simple sentences",
    ],
    related: ["noorani-qaida", "islamic-studies", "quran-classes"],
  },
  {
    slug: "islamic-studies",
    name: "Islamic Studies",
    shortName: "Islamic Studies",
    href: "/islamic-studies",
    keyword: "Islamic Studies online",
    summary:
      "Prayer, wudu, duas, seerah and basics of faith — taught gently in English.",
    description:
      "Age-appropriate Islamic Studies covering how to pray, wudu, everyday duas, stories from the Seerah, and core beliefs. Suitable for children and adults, including new Muslims.",
    whoFor: "Families who want faith basics explained clearly in English.",
    outcomes: [
      "Practical knowledge of prayer and purification",
      "Everyday duas with meaning",
      "Age-appropriate Seerah and aqeedah foundations",
    ],
    related: ["arabic-classes", "quran-classes", "noorani-qaida"],
  },
];

export function getSubject(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}
