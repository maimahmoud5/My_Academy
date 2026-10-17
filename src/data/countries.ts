export type CountryPageData = {
  slug: string;
  name: string;
  shortName: string;
  adjective: string;
  currency: "GBP" | "USD" | "CAD" | "AUD";
  currencyLabel: string;
  timezoneExamples: string[];
  hreflang: string;
  keyword: string;
  published: boolean;
  heroIntro: string;
  localContext: string;
  schedulingNotes: string;
  commonQuestions: { question: string; answer: string }[];
  /** Slot for real local reviews — leave empty until you have them */
  localReviewIds: string[];
};

export const countries: CountryPageData[] = [
  {
    slug: "online-quran-classes-uk",
    name: "United Kingdom",
    shortName: "UK",
    adjective: "British",
    currency: "GBP",
    currencyLabel: "British Pounds (GBP)",
    timezoneExamples: ["Europe/London"],
    hreflang: "en-GB",
    keyword: "online Quran classes UK",
    published: false,
    heroIntro:
      "Live one-to-one online Quran classes for families across England, Scotland, Wales and Northern Ireland — scheduled around UK school evenings and weekends.",
    localContext:
      "Many UK families balance madrasah-style learning with busy school weeks. Our lessons fit after school and on weekends in UK time, with English-medium teaching that works well for British-Pakistani, British-Indian and new Muslim households.",
    schedulingNotes:
      "The teacher is based in Egypt (Africa/Cairo). UK evenings often align well with Cairo evenings outside of extreme daylight-saving shifts. When you book a free trial, available windows are shown in Europe/London time.",
    commonQuestions: [
      {
        question: "Do you teach to UK time zones?",
        answer:
          "Yes. You pick times in UK local time. We convert from the teacher's Cairo schedule automatically, including daylight saving.",
      },
      {
        question: "Can we pay in pounds?",
        answer:
          "Pricing is listed in GBP for UK families. Exact package prices are confirmed after your free trial. [TODO: confirm GBP payment method]",
      },
      {
        question: "Are classes suitable for UK school children?",
        answer:
          "Yes. Sessions are one-to-one and can be kept short enough for after-school focus. Parents may sit in.",
      },
    ],
    localReviewIds: [],
  },
  {
    slug: "online-quran-classes-usa",
    name: "United States",
    shortName: "USA",
    adjective: "American",
    currency: "USD",
    currencyLabel: "US Dollars (USD)",
    timezoneExamples: [
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
    ],
    hreflang: "en-US",
    keyword: "online Quran classes USA",
    published: false,
    heroIntro:
      "One-to-one online Quran, Tajweed and Arabic classes for students across US time zones — from the East Coast to the West Coast.",
    localContext:
      "US families span multiple time zones. We schedule around your local clock, whether you are in EST, CST, MST or PST. Lessons suit weekend mornings for some households and weekday evenings for others, depending on your zone relative to Cairo.",
    schedulingNotes:
      "Because the US spans several zones, the same Cairo evening slot becomes afternoon on the East Coast and morning on the West Coast. The free trial form detects your time zone and shows converted availability.",
    commonQuestions: [
      {
        question: "Which US time zones do you cover?",
        answer:
          "We work with families in Eastern, Central, Mountain and Pacific time (and others). Share your city on the trial form so we can confirm a realistic slot.",
      },
      {
        question: "Is pricing in US dollars?",
        answer:
          "Yes — packages are shown in USD for US visitors. [TODO: confirm USD payment method]",
      },
      {
        question: "Can adults who work full-time join?",
        answer:
          "Yes. Many adult beginners book early morning or evening slots in their local time. Tell us your constraints and we will look for a match.",
      },
    ],
    localReviewIds: [],
  },
  {
    slug: "online-quran-classes-canada",
    name: "Canada",
    shortName: "Canada",
    adjective: "Canadian",
    currency: "CAD",
    currencyLabel: "Canadian Dollars (CAD)",
    timezoneExamples: [
      "America/Toronto",
      "America/Winnipeg",
      "America/Edmonton",
      "America/Vancouver",
    ],
    hreflang: "en-CA",
    keyword: "online Quran classes Canada",
    published: false,
    heroIntro:
      "Online Quran classes for Canadian families — live, one-to-one, and timed for Eastern, Central, Mountain and Pacific Canada.",
    localContext:
      "From Toronto and Montreal to Calgary and Vancouver, Canadian Muslim families often want English-friendly Quran teaching that fits long winters and packed extracurricular calendars. We keep lessons focused and parent-visible.",
    schedulingNotes:
      "Canada's time zones sit close to US zones. Eastern Canada often finds after-school/evening options; Pacific Canada may prefer morning weekend slots relative to Cairo evenings. Availability is always shown in your detected Canadian time zone.",
    commonQuestions: [
      {
        question: "Do you teach students in both Eastern and Western Canada?",
        answer:
          "Yes. Tell us your province or city so we can propose times that actually work for your zone.",
      },
      {
        question: "Can we pay in CAD?",
        answer:
          "Canadian pricing is listed in CAD. [TODO: confirm CAD payment method]",
      },
      {
        question: "Do you welcome new Muslims in Canada?",
        answer:
          "Yes. Adult and new Muslim beginners are welcome. Classes are in English with no expectation that you already know Arabic.",
      },
    ],
    localReviewIds: [],
  },
  {
    slug: "online-quran-classes-australia",
    name: "Australia",
    shortName: "Australia",
    adjective: "Australian",
    currency: "AUD",
    currencyLabel: "Australian Dollars (AUD)",
    timezoneExamples: [
      "Australia/Sydney",
      "Australia/Melbourne",
      "Australia/Brisbane",
      "Australia/Perth",
    ],
    hreflang: "en-AU",
    keyword: "online Quran classes Australia",
    published: false,
    heroIntro:
      "Live online Quran and Arabic classes for Australian families — scheduled with AEST/AEDT, AWST and other local times in mind.",
    localContext:
      "Australia's day runs ahead of Egypt, so Cairo evenings often become Australian late evenings or next-morning windows depending on the state. We are upfront about this and help you find a sustainable slot rather than an exhausting one.",
    schedulingNotes:
      "Sydney/Melbourne mornings can align with Cairo late evening of the previous calendar day. Perth differs again. Use the free trial form — it converts Africa/Cairo windows into your Australian time zone with daylight saving handled correctly.",
    commonQuestions: [
      {
        question: "Is the time difference too large for Australian students?",
        answer:
          "It depends on your state and routine. Some families prefer weekend mornings; others manage a late slot. We only confirm a time that you are happy to keep weekly.",
      },
      {
        question: "Do you show prices in AUD?",
        answer:
          "Yes. Australian visitors see AUD pricing placeholders until final rates are confirmed. [TODO: confirm AUD payment method]",
      },
      {
        question: "Can both kids and adults in Australia join?",
        answer:
          "Yes. We teach children, teenagers and adult beginners across Australia, with English instruction and parent participation welcome.",
      },
    ],
    localReviewIds: [],
  },
];

export function getCountryBySlug(slug: string): CountryPageData | undefined {
  return countries.find((c) => c.slug === slug);
}
