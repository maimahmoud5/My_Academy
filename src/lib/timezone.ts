import { addDays } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import {
  availabilityWindows,
  dayNames,
  teacherTimezone,
  type AvailabilityWindow,
} from "@/data/availability";

export type ConvertedWindow = {
  id: string;
  dayOfWeekCairo: number;
  label: string;
  cairoRange: string;
  localDayName: string;
  localRange: string;
  timezone: string;
};

/**
 * Convert a Cairo-based weekly window into a human-readable range
 * in the visitor's IANA time zone. Uses a reference occurrence so DST
 * is applied correctly via IANA zones (not fixed offsets).
 */
export function convertWindowToTimezone(
  window: AvailabilityWindow,
  visitorTimezone: string,
  referenceDate = new Date(),
): ConvertedWindow {
  const cairoStart = buildNextOccurrence(
    referenceDate,
    window.dayOfWeek,
    window.startCairo,
    teacherTimezone,
  );
  const cairoEnd = buildNextOccurrence(
    referenceDate,
    window.dayOfWeek,
    window.endCairo,
    teacherTimezone,
  );

  const localStartDay = formatInTimeZone(cairoStart, visitorTimezone, "EEEE");
  const localStartTime = formatInTimeZone(cairoStart, visitorTimezone, "HH:mm");
  const localEndTime = formatInTimeZone(cairoEnd, visitorTimezone, "HH:mm");
  const localEndDay = formatInTimeZone(cairoEnd, visitorTimezone, "EEEE");

  const localRange =
    localStartDay === localEndDay
      ? `${localStartDay} ${localStartTime}–${localEndTime}`
      : `${localStartDay} ${localStartTime} → ${localEndDay} ${localEndTime}`;

  return {
    id: window.id,
    dayOfWeekCairo: window.dayOfWeek,
    label: window.label ?? dayNames[window.dayOfWeek],
    cairoRange: `${dayNames[window.dayOfWeek]} ${window.startCairo}–${window.endCairo} (Cairo)`,
    localDayName: localStartDay,
    localRange,
    timezone: visitorTimezone,
  };
}

function buildNextOccurrence(
  from: Date,
  dayOfWeek: number,
  timeHmm: string,
  zone: string,
): Date {
  const [h, m] = timeHmm.split(":").map(Number);

  for (let i = 0; i < 8; i++) {
    const candidateDate = addDays(from, i);
    const name = formatInTimeZone(candidateDate, zone, "EEEE");
    if (dayNames.indexOf(name as (typeof dayNames)[number]) === dayOfWeek) {
      const dateStr = formatInTimeZone(candidateDate, zone, "yyyy-MM-dd");
      const [yy, mm, dd] = dateStr.split("-").map(Number);
      return fromZonedTime(new Date(yy, mm - 1, dd, h, m, 0, 0), zone);
    }
  }

  const fallback = formatInTimeZone(from, zone, "yyyy-MM-dd");
  const [yy, mm, dd] = fallback.split("-").map(Number);
  return fromZonedTime(new Date(yy, mm - 1, dd, h, m, 0, 0), zone);
}

export function getConvertedAvailability(visitorTimezone: string): ConvertedWindow[] {
  return availabilityWindows.map((w) => convertWindowToTimezone(w, visitorTimezone));
}

export function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}
