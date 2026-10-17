export type FAQItem = {
  question: string;
  answer: string;
};

export const homeFaq: FAQItem[] = [
  {
    question: "Do you teach beginners?",
    answer:
      "Yes. Many students start with Noorani Qaida or from the Arabic letters. You do not need any Arabic to begin.",
  },
  {
    question: "Can adults join?",
    answer:
      "Absolutely. We teach adults and new Muslims at a comfortable pace, with no judgment if you are starting from scratch.",
  },
  {
    question: "Do I need to know Arabic?",
    answer:
      "No. Lessons are explained in English. Arabic is introduced step by step only as needed for reading.",
  },
  {
    question: "Are classes one-to-one?",
    answer:
      "Yes. All lessons are live one-to-one so the teacher can focus on one student at a time.",
  },
  {
    question: "How long is a class?",
    answer:
      "[TODO: confirm class length]. Typical online lessons are often around 30–45 minutes — we will confirm the exact length before you start.",
  },
  {
    question: "What if we are in a different time zone?",
    answer:
      "The teacher works from Egypt. We schedule lessons in your local time and show available slots converted to your time zone when you book a free trial.",
  },
  {
    question: "Can a parent sit in?",
    answer:
      "Yes. Parents are welcome to sit in on lessons, especially for children. We encourage it.",
  },
  {
    question: "How do payments work?",
    answer:
      "[TODO: confirm payment method and billing cycle]. After your free trial, we will explain packages and how to pay in your local currency.",
  },
  {
    question: "Can we cancel?",
    answer:
      "[TODO: confirm cancellation and reschedule policy]. We aim to be flexible for families — see our refund policy page for the draft terms.",
  },
];

export const adultFaq: FAQItem[] = [
  {
    question: "I have never read Arabic. Can I still start?",
    answer:
      "Yes. Adult beginners often start with the letters and Noorani Qaida. We go at your pace.",
  },
  {
    question: "I am a new Muslim. Will I feel comfortable?",
    answer:
      "You are welcome. Classes are in English, patient, and focused on learning — not on judging what you already know.",
  },
  {
    question: "Can I learn after work?",
    answer:
      "We try to find times that fit evening and weekend schedules in UK, US, Canadian and Australian time zones. Share your availability on the trial form.",
  },
];

export const parentsFaq: FAQItem[] = [
  {
    question: "What age can my child start?",
    answer:
      "[TODO: confirm minimum age]. Many children begin when they can sit for a short lesson and follow simple instructions. We will advise after hearing about your child.",
  },
  {
    question: "How do I know my child is progressing?",
    answer:
      "You can sit in on lessons, and we provide a monthly progress report covering what was learned and what to practise.",
  },
  {
    question: "Is it safe for my child online?",
    answer:
      "Parents can join lessons. Teachers do not privately message children outside the platform. See our Safeguarding page for full details.",
  },
];
