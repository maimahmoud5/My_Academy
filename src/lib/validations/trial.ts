import { z } from "zod";

export const trialFormSchema = z.object({
  studentName: z.string().min(2, "Please enter the student's name").max(100),
  studentAge: z.string().min(1, "Please select an age or Adult"),
  filledBy: z.enum(["parent", "student"]),
  country: z.enum(["UK", "USA", "Canada", "Australia", "Other"]),
  city: z.string().max(100).optional().or(z.literal("")),
  subject: z.enum([
    "Noorani Qaida",
    "Quran reading",
    "Tajweed",
    "Hifz",
    "Arabic",
    "Islamic Studies",
    "Not sure",
  ]),
  currentLevel: z.enum([
    "never read Quran",
    "can read slowly",
    "can read fluently",
    "memorizing",
  ]),
  preferredDays: z.array(z.string()).min(1, "Select at least one preferred day"),
  preferredTimes: z.string().min(2, "Tell us preferred times").max(500),
  timezone: z.string().min(1, "Time zone is required"),
  whatsapp: z
    .string()
    .min(8, "Enter a WhatsApp number with country code")
    .max(20)
    .regex(/^\+?[\d\s-]+$/, "Use digits with an optional + country code"),
  email: z.string().email("Enter a valid email"),
  message: z.string().max(1000).optional().or(z.literal("")),
  /** Honeypot — must stay empty */
  website: z.string().max(0).optional().or(z.literal("")),
  // Tracking
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  landingPage: z.string().optional(),
  studentType: z.enum(["child", "adult"]).optional(),
});

export type TrialFormInput = z.infer<typeof trialFormSchema>;

export const AGE_OPTIONS = [
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "adult",
] as const;
