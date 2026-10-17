"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { subjects } from "@/data/subjects";
import { BookTrialButton } from "@/components/WhatsAppButton";

const classLinks = subjects.map((s) => ({ href: s.href, label: s.shortName }));

const nav = [
  { href: "/", label: "Home" },
  {
    label: "Classes",
    children: classLinks,
  },
  { href: "/for-parents", label: "For Parents" },
  { href: "/learn-quran-as-an-adult", label: "For Adults" },
  { href: "/teachers", label: "Teachers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex flex-col">
          <span className="text-lg font-bold tracking-tight text-teal sm:text-xl">
            {siteConfig.name}
          </span>
          <span className="text-[10px] text-ink-muted sm:text-xs">Online Quran Academy</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) =>
            "children" in item && item.children ? (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center gap-1 rounded-lg px-3 text-sm font-medium text-ink hover:text-teal"
                  aria-expanded={classesOpen}
                  onClick={() => setClassesOpen((v) => !v)}
                  onBlur={() => setTimeout(() => setClassesOpen(false), 150)}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>
                {classesOpen && (
                  <div className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-border bg-surface p-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-cream-dark hover:text-teal"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-ink hover:text-teal"
              >
                {item.label}
              </Link>
            ),
          )}
          <BookTrialButton className="ml-2" />
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-cream px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) =>
              "children" in item && item.children ? (
                <div key={item.label} className="py-1">
                  <p className="px-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block min-h-11 rounded-lg px-3 py-2.5 text-sm font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="block min-h-11 rounded-lg px-3 py-2.5 text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="pt-2" onClick={() => setOpen(false)}>
              <BookTrialButton className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
