# Cursor prompt: Noor Quran Academy website

Paste everything below the line into Cursor (Agent mode). If you want it to stick across the whole project, also save it as `.cursor/rules/project.md`.

---

## Role and goal

You are a senior full-stack developer. Build the website for **Noor Quran Academy**, an online academy that teaches Quran (Noorani Qaida, reading, Tajweed, memorization/Hifz), Arabic, and Islamic Studies through live one-to-one classes.

Students are children, teenagers and adults living in the **UK, USA, Canada and Australia**. Families are mostly Pakistani, Indian and white (including new Muslims), so the site is in **English only**, and beginners with no Arabic must feel welcome from the first screen.

The teacher works from Egypt, so time zones matter. The site's one job is to get visitors to **book a free trial class** or **message on WhatsApp**. Everything else supports that and supports SEO.

Work in phases (listed at the end). Finish and check each phase before starting the next. Ask me only if something blocks you. Otherwise pick sensible defaults and tell me what you chose.

## Tech stack

- Next.js (App Router) with TypeScript and Tailwind CSS. Use server components and static generation wherever possible, since SEO and speed matter.
- Blog in MDX files inside the repo (no CMS).
- Form backend: Next.js route handlers. Send an email to the academy with Resend, and store each lead in Supabase (Postgres). Put all keys in `.env.local` and provide `.env.example`.
- Deploy target: Vercel.
- No heavy UI libraries. Use `next/image`, `next/font`, and Lucide icons only.

## Design

- Mobile-first. Most parents will open the site from a phone. Test at 360px first.
- Calm and warm, not busy. Soft cream or white background, a deep green or teal as the main color, a muted gold accent. Put colors in Tailwind theme tokens so I can change them in one place.
- Fonts: a clean sans-serif for English (Inter or similar) and **Amiri or Noto Naskh Arabic** for any Arabic text. Every Arabic snippet must use `lang="ar" dir="rtl"`.
- Avoid stereotypes and clip-art. Use simple geometric patterns sparingly. Leave clearly marked image slots (`/public/images/placeholder-*.jpg`) for real teacher and class photos. Never add fake people or fake classroom photos.
- Accessible: proper heading order, alt text, visible focus states, color contrast AA, buttons at least 44px tall.
- Every page has a sticky mobile bar with two buttons: **Book Free Trial** and **WhatsApp**.

## Pages and routes

Create these pages, each with its own title, meta description, one H1, and useful content. Use the copy below, and placeholders where I must fill in real facts.

1. `/` Home. Hero, who we teach (kids and adults), the five subjects, how a trial works (3 steps), why families choose us, teacher preview, FAQ, final call to action.
2. `/about` About Us.
3. `/quran-classes` Online Quran Classes.
4. `/noorani-qaida` Online Noorani Qaida Classes for Beginners.
5. `/tajweed-classes` Online Tajweed Classes.
6. `/quran-memorization` Online Quran Memorization (Hifz) Classes.
7. `/arabic-classes` Online Arabic Classes for Kids and Adults.
8. `/islamic-studies` Islamic Studies (prayer, wudu, duas, seerah, basics of faith).
9. `/for-parents` For Kids and Parents. Progress reports, safety, age guidance.
10. `/learn-quran-as-an-adult` For adults, beginners and new Muslims. No experience needed, no judgment, start from the letters.
11. `/teachers` Teacher profiles. Data comes from `data/teachers.ts`. Show credentials only if they exist in the data.
12. `/reviews` Reviews. Data comes from `data/reviews.json`. **If the file is empty, show a friendly empty state ("Our first reviews are coming soon"). Never generate or hardcode fake reviews.**
13. `/pricing` Pricing. Read prices from `data/pricing.ts` for GBP, USD, CAD, AUD. Show the visitor's currency, with a small selector to change it. Use `TODO` placeholder numbers and mark them clearly. Do not invent real prices.
14. `/free-trial` The booking form (details below).
15. `/contact` Contact page with WhatsApp, email, and the same form.
16. `/safeguarding` "Safe and Trusted Learning" page. Parents can sit in on lessons, no private chats with children outside the platform, communication goes through parents, monthly progress report, lessons run on Zoom or Google Meet. Keep the wording in a config file so I can edit it.
17. `/privacy`, `/terms`, `/refund-policy`. Generate clear plain-English drafts and add a visible note at the top of each that I must have them reviewed before launch.
18. `/blog` and `/blog/[slug]`. MDX posts with title, description, date, and tags. Add the 5 starter posts listed below as short drafts marked `draft: true` so they don't publish.
19. Country pages: `/online-quran-classes-uk`, `/online-quran-classes-usa`, `/online-quran-classes-canada`, `/online-quran-classes-australia`. Build one template that takes country data from `data/countries.ts`: local currency, class times in that country's time zone, common questions, and a slot for real local reviews. Set `noindex` on each page until its `published: true` flag is turned on, so thin pages don't hurt SEO. Each page needs content that is actually different, not just a swapped country name.

Navigation: Home, Classes (dropdown with the five subjects), For Parents, For Adults, Teachers, Pricing, Reviews, Blog, and a **Book Free Trial** button. Footer: all main pages, legal pages, WhatsApp, Facebook, Instagram and TikTok links (config-driven), and a short line about the countries served.

## Copy to use

- Site title pattern: `Noor Quran Academy | Online Quran Classes`
- Hero H1: "Online Quran, Tajweed & Arabic classes for kids and adults"
- Hero subtext: "Live one-to-one lessons with a qualified teacher. Beginners welcome. No Arabic needed."
- Bio: "Online Quran, Tajweed, Arabic & Islamic Studies classes for kids and adults in the UK, USA, Canada & Australia. Beginners welcome. Book your free trial class."
- About: "Noor Quran Academy offers live one-to-one online classes in Quran reading, Noorani Qaida, Tajweed, Quran memorization, Arabic and Islamic Studies. We teach children, teenagers and adults living in the UK, USA, Canada and Australia. You do not need any Arabic to start. Classes are in English, at times that fit your time zone. Book a free trial class and meet your teacher."
- Main call to action: "Book a Free Trial Class". Secondary: "Message us on WhatsApp".
- Trial steps: 1) Tell us about the student. 2) Pick a time in your own time zone. 3) Meet your teacher on Zoom or Google Meet.
- FAQ (write short, honest answers): Do you teach beginners? Can adults join? Do I need to know Arabic? Are classes one-to-one? How long is a class? What if we are in a different time zone? Can a parent sit in? How do payments work? Can we cancel?

Where you need a fact I haven't given (credentials, years of experience, prices, class length), insert a visible `[TODO: ...]` placeholder and list it in the README. Never invent credentials, numbers or testimonials.

## Free trial form (the most important feature)

Fields: student name, student age (or "adult"), who is filling the form (parent or student), country (UK, USA, Canada, Australia, Other), city (optional), subject (Noorani Qaida, Quran reading, Tajweed, Hifz, Arabic, Islamic Studies, Not sure), current level (never read Quran / can read slowly / can read fluently / memorizing), preferred days and times, WhatsApp number (with country code), email, and an optional message.

Behavior:
- Auto-detect the time zone with `Intl.DateTimeFormat().resolvedOptions().timeZone`. Show it and let the user change it.
- Show available windows from `data/availability.ts` (defined in `Africa/Cairo`) converted to the visitor's time zone. Handle daylight saving correctly by using IANA time zones, not fixed offsets.
- Validate on client and server (zod). Add a honeypot field and basic rate limiting against spam.
- On submit: save to Supabase, email the academy via Resend, and send an auto-reply email to the family confirming the request. Then show a thank-you state with a WhatsApp button and a `trial_form_submit` analytics event.
- Save extra tracking fields with every lead: country, time zone, UTM source, medium, campaign (captured on first visit into a cookie or localStorage), landing page, and whether the student is a child or adult. I will use this to see which country and channel bring students.
- Keep the form to one screen on mobile and make it fast to fill.

## WhatsApp

- A reusable `WhatsAppButton` that opens `https://wa.me/<number>?text=<prefilled message>`. The number and default message live in `config/site.ts`.
- Different prefilled messages per page (for example the adults page says "Hi, I'm an adult beginner and I'd like to start learning Quran").
- Fire a `whatsapp_click` analytics event on click.

## SEO requirements

- Unique title and meta description per page, canonical URLs, Open Graph and Twitter cards, and a generated default OG image.
- `sitemap.xml` and `robots.txt` generated by Next.js. Exclude `noindex` and draft pages.
- JSON-LD structured data: `EducationalOrganization` (site-wide), `Course` (on each subject page), `FAQPage` (on pages with FAQs), `BreadcrumbList`. Add `Review` or `AggregateRating` markup **only** when real reviews exist in `data/reviews.json`.
- Use `lang="en"` and, for country pages that become published, `en-GB`, `en-US`, `en-CA`, `en-AU` hreflang alternates.
- Clean URLs, internal links between related pages (for example Noorani Qaida links to Tajweed and the parents page), image `alt` text, and lazy loading below the fold.
- Target Lighthouse scores of 90+ on mobile for Performance, SEO, Accessibility and Best Practices.
- Put each page's target keyword in the H1, title and first paragraph naturally. Do not stuff keywords. Target keywords are in `data/keywords.ts`: online Quran classes, Noorani Qaida online, online Tajweed classes, Quran memorization online, learn Quran online for beginners, online Quran classes for adults, online Arabic classes for kids.

## Analytics and tracking

- Google Analytics 4 and Meta Pixel, loaded only after the visitor accepts cookies. Add a simple cookie consent banner (UK and EU rules apply to UK visitors). Do not load tracking scripts before consent.
- Events: `trial_form_start`, `trial_form_submit`, `whatsapp_click`, `pricing_view`, `blog_read`.
- Add a Google Search Console verification meta tag field in config.
- Add a small `/admin/leads` page protected by a password from an environment variable, showing leads in a table with country, source, subject, status and date, and a CSV export. Keep it minimal.

## Blog starter posts (short drafts, marked draft)

1. How to Teach Quran to Kids at Home
2. Best Age to Start Quran Memorization
3. How to Learn to Read Quran as an Adult
4. Noorani Qaida Explained for Parents
5. Learn Arabic Letters: A Beginner Guide

## Code quality

- Strict TypeScript, ESLint, and Prettier. Small reusable components (`Hero`, `SubjectCard`, `FAQ`, `TrialCTA`, `WhatsAppButton`, `PricingTable`, `ReviewList`, `CountryPage`).
- All editable content (site name, contact details, social links, subjects, FAQ, safeguarding text, pricing, availability) lives in `config/` and `data/` files, so I can change it without touching components.
- Write a `README.md` explaining: how to run locally, every environment variable, how to set up Supabase (with the SQL for the `leads` table), how to set up Resend, how to deploy to Vercel, how to add a blog post, how to add a real review, how to publish a country page, and a checklist of every `[TODO]` I need to fill.

## Do not

- Do not add fake testimonials, fake reviews, fake ratings, fake teacher credentials, fake student counts, or stock photos of real-looking people.
- Do not write claims like "certified" or "ijazah" unless the data file says so.
- Do not load tracking before consent.
- Do not copy the same text across country pages.
- Do not add features I did not ask for (no login system for students, no payment integration yet, no chat widget).

## Phases

1. **Setup and design system.** Project scaffold, Tailwind theme, fonts, layout, header, footer, sticky mobile bar, config and data files.
2. **Pages.** All pages in the list above with real structure and the copy provided, plus placeholders.
3. **Free trial form and WhatsApp.** Full form, time zone logic, Supabase, Resend, auto-reply, tracking fields, thank-you state.
4. **SEO and analytics.** Metadata, structured data, sitemap, robots, cookie banner, GA4, Meta Pixel, events, admin leads page.
5. **Polish and handover.** Lighthouse check, accessibility pass, mobile check at 360px, README, and the `[TODO]` checklist.

After each phase, tell me what you built, what you assumed, and what I need to do next. Start with phase 1.
