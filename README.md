# Noor Quran Academy Website

Next.js (App Router) site for **Noor Quran Academy** — live one-to-one online Quran, Tajweed, Arabic and Islamic Studies for kids and adults in the UK, USA, Canada and Australia.

Primary goal of every page: **Book a free trial** or **WhatsApp**.

## Stack

- Next.js 16 + TypeScript + Tailwind CSS v4
- MDX blog in `content/blog`
- Form API → Supabase (`leads` table) + Resend email
- Deploy: Vercel

## Run locally

```bash
npm install
cp .env.example .env.local
# fill in keys (or leave TODO — form still works and logs leads to the server console)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Scripts:

- `npm run dev` — development
- `npm run build` / `npm start` — production
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (no trailing slash) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for inserting/reading leads |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | Verified sender (e.g. `Noor Quran Academy <hello@yourdomain.com>`) |
| `ACADEMY_INBOX_EMAIL` | Where new trial emails go |
| `ADMIN_PASSWORD` | Password for `/admin/leads` |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | GA4 (loads only after cookie consent) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel (loads only after consent) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console meta verification |

See `.env.example`.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Paste URL + service role key into `.env.local`.
3. Run this SQL in the SQL editor:

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  student_name text not null,
  student_age text not null,
  student_type text not null check (student_type in ('child', 'adult')),
  filled_by text not null,
  country text not null,
  city text,
  subject text not null,
  current_level text not null,
  preferred_days text[] not null default '{}',
  preferred_times text not null,
  timezone text not null,
  whatsapp text not null,
  email text not null,
  message text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  landing_page text,
  status text not null default 'new'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_country_idx on public.leads (country);

alter table public.leads enable row level security;
-- No public policies: only service role (server) should access this table.
```

Until Supabase is configured, trial submissions log to the server console and still return success (so you can develop the UI).

## Resend setup

1. Create an account at [resend.com](https://resend.com).
2. Verify your domain (or use their onboarding sender for tests).
3. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `ACADEMY_INBOX_EMAIL`.

On each successful trial submit the app:

- Emails the academy with lead details
- Sends an auto-reply to the family

If Resend is not configured, emails are skipped with a console warning.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Add the same env vars from `.env.example`.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Deploy.

## Editable content (no component surgery)

| File | What it controls |
| --- | --- |
| `src/config/site.ts` | Name, contact, WhatsApp number/messages, social links, analytics IDs |
| `src/config/safeguarding.ts` | Safeguarding page copy |
| `src/data/subjects.ts` | Class pages content |
| `src/data/faq.ts` | FAQ sets |
| `src/data/teachers.ts` | Teacher profiles (credentials only if present) |
| `src/data/reviews.json` | Reviews (empty = friendly empty state) |
| `src/data/pricing.ts` | Packages + TODO prices per currency |
| `src/data/availability.ts` | Weekly windows in `Africa/Cairo` |
| `src/data/countries.ts` | Country landing pages + `published` flag |
| `src/data/keywords.ts` | SEO target keywords |

## Add a blog post

1. Create `content/blog/your-slug.mdx` with frontmatter (`title`, `description`, `date`, `tags`, `draft`).
2. Set `draft: false` to publish (drafts are excluded from `/blog`, sitemap and static paths).
3. Redeploy / refresh.

## Add a real review

Edit `src/data/reviews.json` with real entries only. Never invent reviews. AggregateRating JSON-LD appears only when ratings exist.

For country pages, put the review `id` in that country’s `localReviewIds` array.

## Publish a country page

In `src/data/countries.ts`, set `published: true` for that country. Until then the page is `noindex` and excluded from the sitemap.

## Admin leads

Visit `/admin/leads` and enter `ADMIN_PASSWORD`. Table + CSV export. Keep the URL private.

## Image slots

Replace these with real photos (no stock people inventing a classroom):

- `public/images/placeholder-teacher.jpg`
- `public/images/placeholder-hero.jpg`
- `public/images/placeholder-class.jpg`

(Current files are marked SVG placeholders — swap for real JPG/WebP.)

## Assumptions made

- Soft cream background (`#FBF8F3`), deep teal (`#0F5C4C`), muted gold (`#C4A35A`)
- Inter (English) + Amiri (Arabic)
- Sample Cairo availability windows (evenings + weekend mornings) — marked TODO
- Site URL default `https://noorquranacademy.com` until you set `NEXT_PUBLIC_SITE_URL`
- WhatsApp / email / social links are TODO placeholders in `config/site.ts`
- Without Supabase/Resend, form still validates and “succeeds” while logging locally

## `[TODO]` checklist before launch

### Contact and brand

- [ ] WhatsApp number (digits + display) in `src/config/site.ts`
- [ ] Academy email
- [ ] Facebook / Instagram / TikTok URLs
- [ ] Final production domain in `NEXT_PUBLIC_SITE_URL`
- [ ] Teacher full name + real bio (no invented credentials)
- [ ] Verified credentials array on teacher (only if true)
- [ ] Real teacher / class photos in `/public/images`

### Pricing and operations

- [ ] Real package prices for GBP, USD, CAD, AUD in `src/data/pricing.ts`
- [ ] Confirm whether prices are per month / per class / per package
- [ ] Sibling discounts (if any)
- [ ] Class length in minutes
- [ ] Payment method per currency
- [ ] Cancellation / reschedule notice period
- [ ] Refund response time
- [ ] Real weekly availability in `src/data/availability.ts`
- [ ] Minimum student age
- [ ] Progress report format / frequency
- [ ] Free trial length / limits

### Legal and trust

- [ ] Have privacy, terms, refund drafts legally reviewed
- [ ] Set “last updated” dates on legal pages
- [ ] Publish country pages only when content + reviews are ready (`published: true`)
- [ ] Add real reviews to `reviews.json` when you have them
- [ ] Publish blog drafts (`draft: false`) after editing

### Integrations

- [ ] Supabase project + SQL above
- [ ] Resend domain + keys
- [ ] GA4 + Meta Pixel IDs
- [ ] Google Search Console verification
- [ ] Strong `ADMIN_PASSWORD`
- [ ] Vercel deploy + env vars
