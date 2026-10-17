/**
 * Weekly availability windows defined in Africa/Cairo (IANA).
 * Convert to the visitor's time zone at runtime — never use fixed UTC offsets.
 */
export type AvailabilityWindow = {
  id: string;
  /** 0 = Sunday … 6 = Saturday (JS Date.getDay) */
  dayOfWeek: number;
  /** "HH:mm" 24h in Africa/Cairo */
  startCairo: string;
  /** "HH:mm" 24h in Africa/Cairo */
  endCairo: string;
  label?: string;
};

export const teacherTimezone = "Africa/Cairo";

export const availabilityWindows: AvailabilityWindow[] = [
  // [TODO: replace with real teaching windows]
  { id: "sun-am", dayOfWeek: 0, startCairo: "10:00", endCairo: "13:00", label: "Sunday morning" },
  { id: "sun-eve", dayOfWeek: 0, startCairo: "18:00", endCairo: "21:00", label: "Sunday evening" },
  { id: "mon-eve", dayOfWeek: 1, startCairo: "18:00", endCairo: "21:00", label: "Monday evening" },
  { id: "tue-eve", dayOfWeek: 2, startCairo: "18:00", endCairo: "21:00", label: "Tuesday evening" },
  { id: "wed-eve", dayOfWeek: 3, startCairo: "18:00", endCairo: "21:00", label: "Wednesday evening" },
  { id: "thu-eve", dayOfWeek: 4, startCairo: "18:00", endCairo: "21:00", label: "Thursday evening" },
  { id: "fri-eve", dayOfWeek: 5, startCairo: "18:00", endCairo: "21:00", label: "Friday evening" },
  { id: "sat-am", dayOfWeek: 6, startCairo: "10:00", endCairo: "13:00", label: "Saturday morning" },
  { id: "sat-eve", dayOfWeek: 6, startCairo: "18:00", endCairo: "21:00", label: "Saturday evening" },
];

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
