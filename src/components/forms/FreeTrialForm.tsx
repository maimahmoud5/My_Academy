"use client";

import { useEffect, useMemo, useState } from "react";
import { AGE_OPTIONS, type TrialFormInput } from "@/lib/validations/trial";
import { detectTimezone, getConvertedAvailability } from "@/lib/timezone";
import { readUtm } from "@/lib/utm";
import { trackEvent } from "@/lib/analytics";
import { dayNames } from "@/data/availability";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const SUBJECTS = [
  "Noorani Qaida",
  "Quran reading",
  "Tajweed",
  "Hifz",
  "Arabic",
  "Islamic Studies",
  "Not sure",
] as const;

const LEVELS = [
  "never read Quran",
  "can read slowly",
  "can read fluently",
  "memorizing",
] as const;

const COUNTRIES = ["UK", "USA", "Canada", "Australia", "Other"] as const;

type FormState = {
  studentName: string;
  studentAge: string;
  filledBy: "parent" | "student";
  country: (typeof COUNTRIES)[number] | "";
  city: string;
  subject: (typeof SUBJECTS)[number] | "";
  currentLevel: (typeof LEVELS)[number] | "";
  preferredDays: string[];
  preferredTimes: string;
  timezone: string;
  whatsapp: string;
  email: string;
  message: string;
  website: string;
};

const initial: FormState = {
  studentName: "",
  studentAge: "",
  filledBy: "parent",
  country: "",
  city: "",
  subject: "",
  currentLevel: "",
  preferredDays: [],
  preferredTimes: "",
  timezone: "UTC",
  whatsapp: "",
  email: "",
  message: "",
  website: "",
};

export function FreeTrialForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setForm((f) => ({ ...f, timezone: detectTimezone() }));
  }, []);

  const windows = useMemo(
    () => (form.timezone ? getConvertedAvailability(form.timezone) : []),
    [form.timezone],
  );

  function onFieldFocus() {
    if (!started) {
      setStarted(true);
      trackEvent("trial_form_start");
    }
  }

  function toggleDay(day: string) {
    setForm((f) => ({
      ...f,
      preferredDays: f.preferredDays.includes(day)
        ? f.preferredDays.filter((d) => d !== day)
        : [...f.preferredDays, day],
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setErrorMsg("");
    setStatus("submitting");

    const utm = readUtm();
    const studentType: "child" | "adult" =
      form.studentAge === "adult" ? "adult" : "child";

    const payload: TrialFormInput = {
      studentName: form.studentName.trim(),
      studentAge: form.studentAge,
      filledBy: form.filledBy,
      country: form.country as TrialFormInput["country"],
      city: form.city.trim(),
      subject: form.subject as TrialFormInput["subject"],
      currentLevel: form.currentLevel as TrialFormInput["currentLevel"],
      preferredDays: form.preferredDays,
      preferredTimes: form.preferredTimes.trim(),
      timezone: form.timezone,
      whatsapp: form.whatsapp.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      website: form.website,
      utmSource: utm.utmSource,
      utmMedium: utm.utmMedium,
      utmCampaign: utm.utmCampaign,
      landingPage: utm.landingPage,
      studentType,
    };

    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      trackEvent("trial_form_submit", { country: form.country, subject: form.subject });
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again or message us on WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-teal/30 bg-surface p-6 text-center sm:p-10">
        <h2 className="text-2xl font-bold text-ink">JazakAllahu khairan — request received</h2>
        <p className="mt-3 text-ink-muted">
          We will confirm a free trial time on WhatsApp in your time zone ({form.timezone}).
          Check your email for a confirmation as well.
        </p>
        <div className="mt-6 flex justify-center">
          <WhatsAppButton messageKey="default" label="Message us on WhatsApp now" />
        </div>
      </div>
    );
  }

  const field =
    "mt-1 w-full min-h-11 rounded-lg border border-border bg-surface px-3 text-sm text-ink";
  const labelCls = "block text-sm font-medium text-ink";

  return (
    <form onSubmit={onSubmit} onFocus={onFieldFocus} className="relative space-y-4" noValidate>
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="studentName">
            Student name
          </label>
          <input
            id="studentName"
            className={field}
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
            required
          />
          {errors.studentName && <p className="mt-1 text-xs text-danger">{errors.studentName}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="studentAge">
            Student age
          </label>
          <select
            id="studentAge"
            className={field}
            value={form.studentAge}
            onChange={(e) => setForm({ ...form, studentAge: e.target.value })}
            required
          >
            <option value="">Select…</option>
            {AGE_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a === "adult" ? "Adult" : a}
              </option>
            ))}
          </select>
          {errors.studentAge && <p className="mt-1 text-xs text-danger">{errors.studentAge}</p>}
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>Who is filling this form?</legend>
        <div className="mt-2 flex gap-4">
          {(["parent", "student"] as const).map((v) => (
            <label key={v} className="inline-flex min-h-11 items-center gap-2 text-sm capitalize">
              <input
                type="radio"
                name="filledBy"
                checked={form.filledBy === v}
                onChange={() => setForm({ ...form, filledBy: v })}
              />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="country">
            Country
          </label>
          <select
            id="country"
            className={field}
            value={form.country}
            onChange={(e) =>
              setForm({ ...form, country: e.target.value as FormState["country"] })
            }
            required
          >
            <option value="">Select…</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.country && <p className="mt-1 text-xs text-danger">{errors.country}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="city">
            City <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input
            id="city"
            className={field}
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="subject">
            Subject
          </label>
          <select
            id="subject"
            className={field}
            value={form.subject}
            onChange={(e) =>
              setForm({ ...form, subject: e.target.value as FormState["subject"] })
            }
            required
          >
            <option value="">Select…</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="currentLevel">
            Current level
          </label>
          <select
            id="currentLevel"
            className={field}
            value={form.currentLevel}
            onChange={(e) =>
              setForm({ ...form, currentLevel: e.target.value as FormState["currentLevel"] })
            }
            required
          >
            <option value="">Select…</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="timezone">
          Your time zone
        </label>
        <input
          id="timezone"
          className={field}
          value={form.timezone}
          onChange={(e) => setForm({ ...form, timezone: e.target.value })}
          list="tz-list"
          required
        />
        <datalist id="tz-list">
          {[
            "Europe/London",
            "America/New_York",
            "America/Chicago",
            "America/Denver",
            "America/Los_Angeles",
            "America/Toronto",
            "America/Vancouver",
            "Australia/Sydney",
            "Australia/Melbourne",
            "Australia/Perth",
            "Africa/Cairo",
          ].map((tz) => (
            <option key={tz} value={tz} />
          ))}
        </datalist>
        <p className="mt-1 text-xs text-ink-muted">
          Auto-detected. Change if incorrect. Availability below is converted from Cairo time
          with daylight saving handled.
        </p>
      </div>

      {windows.length > 0 && (
        <div className="rounded-xl border border-border bg-cream-dark/50 p-4">
          <p className="text-sm font-semibold text-ink">Available windows in your time zone</p>
          <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto text-xs text-ink-muted">
            {windows.map((w) => (
              <li key={w.id}>
                <span className="font-medium text-ink">{w.localRange}</span>
                <span className="text-ink-muted"> — {w.cairoRange}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-ink-muted">
            [TODO: replace sample windows in data/availability.ts with real teaching hours]
          </p>
        </div>
      )}

      <fieldset>
        <legend className={labelCls}>Preferred days</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {dayNames.map((day) => (
            <label
              key={day}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-lg border px-3 text-sm ${
                form.preferredDays.includes(day)
                  ? "border-teal bg-teal/10 text-teal"
                  : "border-border bg-surface"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={form.preferredDays.includes(day)}
                onChange={() => toggleDay(day)}
              />
              {day.slice(0, 3)}
            </label>
          ))}
        </div>
        {errors.preferredDays && (
          <p className="mt-1 text-xs text-danger">{errors.preferredDays}</p>
        )}
      </fieldset>

      <div>
        <label className={labelCls} htmlFor="preferredTimes">
          Preferred times
        </label>
        <input
          id="preferredTimes"
          className={field}
          placeholder="e.g. after 6pm weekdays, Saturday morning"
          value={form.preferredTimes}
          onChange={(e) => setForm({ ...form, preferredTimes: e.target.value })}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="whatsapp">
            WhatsApp (with country code)
          </label>
          <input
            id="whatsapp"
            className={field}
            placeholder="+44 …"
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            required
          />
          {errors.whatsapp && <p className="mt-1 text-xs text-danger">{errors.whatsapp}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={field}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="message">
          Message <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <textarea
          id="message"
          className={`${field} min-h-24 py-2`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="min-h-11 w-full rounded-lg bg-teal px-5 text-sm font-semibold text-white hover:bg-teal-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Book Free Trial"}
      </button>
    </form>
  );
}
