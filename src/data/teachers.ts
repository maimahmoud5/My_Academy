export type Teacher = {
  id: string;
  name: string;
  role: string;
  bio: string;
  subjects: string[];
  languages: string[];
  /** Only show credentials that exist here — never invent */
  credentials?: string[];
  image?: string;
  timezone: string;
};

/**
 * Teacher profiles. Add real credentials only when verified.
 * Leave credentials undefined or empty if not confirmed.
 */
export const teachers: Teacher[] = [
  {
    id: "teacher-1",
    name: "[TODO: Teacher full name]",
    role: "Quran & Tajweed Teacher",
    bio: "[TODO: Short teacher bio — background, teaching approach, who they enjoy teaching. Do not invent credentials or years of experience.]",
    subjects: [
      "Noorani Qaida",
      "Quran Reading",
      "Tajweed",
      "Hifz",
      "Arabic",
      "Islamic Studies",
    ],
    languages: ["English", "Arabic"],
    // credentials: [], // Add only verified items, e.g. "Ijazah in …"
    image: "/images/placeholder-teacher.jpg",
    timezone: "Africa/Cairo",
  },
];
