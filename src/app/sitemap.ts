import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { subjects } from "@/data/subjects";
import { countries } from "@/data/countries";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPaths = [
    "/",
    "/about",
    "/for-parents",
    "/learn-quran-as-an-adult",
    "/teachers",
    "/reviews",
    "/pricing",
    "/free-trial",
    "/contact",
    "/safeguarding",
    "/privacy",
    "/terms",
    "/refund-policy",
    "/blog",
  ];

  const subjectPaths = subjects.map((s) => s.href);
  const countryPaths = countries.filter((c) => c.published).map((c) => `/${c.slug}`);
  const blogPaths = getAllPosts(false).map((p) => `/blog/${p.slug}`);

  return [...staticPaths, ...subjectPaths, ...countryPaths, ...blogPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" || path === "/free-trial" ? 1 : 0.7,
  }));
}
