"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  created_at: string;
  student_name: string;
  country: string;
  subject: string;
  status: string;
  utm_source: string | null;
  student_type: string;
  email: string;
};

export default function AdminLeadsPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(pw: string) {
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/leads", {
      headers: { "x-admin-password": pw },
    });
    setLoading(false);
    if (!res.ok) {
      setError("Unauthorized or server error");
      setAuthed(false);
      return;
    }
    const data = await res.json();
    setLeads(data.leads ?? []);
    setAuthed(true);
    sessionStorage.setItem("nqa_admin_pw", pw);
  }

  useEffect(() => {
    const saved = sessionStorage.getItem("nqa_admin_pw");
    if (saved) {
      setPassword(saved);
      void load(saved);
    }
  }, []);

  function exportCsv() {
    window.open(`/api/admin/export?pw=${encodeURIComponent(password)}`, "_blank");
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <h1 className="text-2xl font-bold text-ink">Admin — Leads</h1>
        <p className="mt-2 text-sm text-ink-muted">Password protected. Not linked in the public nav.</p>
        <input
          type="password"
          className="mt-6 w-full min-h-11 rounded-lg border border-border px-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
        />
        {error && <p className="mt-2 text-sm text-danger">{error}</p>}
        <button
          type="button"
          className="mt-4 min-h-11 w-full rounded-lg bg-teal font-semibold text-white"
          onClick={() => load(password)}
          disabled={loading}
        >
          {loading ? "Checking…" : "Open"}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ink">Leads</h1>
        <button
          type="button"
          onClick={exportCsv}
          className="min-h-11 rounded-lg border border-border px-4 text-sm font-semibold"
        >
          Export CSV
        </button>
      </div>
      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-cream-dark text-ink">
            <tr>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Student</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Country</th>
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-ink-muted">
                  No leads yet (or Supabase not configured).
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="border-t border-border">
                  <td className="px-3 py-2 whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                  <td className="px-3 py-2">{lead.student_name}</td>
                  <td className="px-3 py-2">{lead.student_type}</td>
                  <td className="px-3 py-2">{lead.country}</td>
                  <td className="px-3 py-2">{lead.subject}</td>
                  <td className="px-3 py-2">{lead.utm_source || "—"}</td>
                  <td className="px-3 py-2">{lead.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
