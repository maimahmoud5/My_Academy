import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || url.includes("TODO") || key.includes("TODO")) {
    return null;
  }
  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

export type LeadRow = {
  id?: string;
  created_at?: string;
  student_name: string;
  student_age: string;
  student_type: "child" | "adult";
  filled_by: string;
  country: string;
  city: string | null;
  subject: string;
  current_level: string;
  preferred_days: string[];
  preferred_times: string;
  timezone: string;
  whatsapp: string;
  email: string;
  message: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  landing_page: string | null;
  status: string;
};
