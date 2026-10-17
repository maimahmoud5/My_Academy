"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function BlogReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent("blog_read", { slug });
  }, [slug]);
  return null;
}
