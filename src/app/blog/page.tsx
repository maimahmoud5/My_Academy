import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/Hero";
import { getAllPosts } from "@/lib/blog";
import { TrialCTA } from "@/components/TrialCTA";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Guides on teaching Quran at home, Noorani Qaida, adult beginners, memorization and Arabic letters.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts(false);

  return (
    <>
      <PageHeader
        title="Blog"
        description="Short guides for parents and adult beginners. Draft posts stay unpublished until you turn draft off."
        breadcrumb={[{ label: "Blog", href: "/blog" }]}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-cream-dark/40 px-6 py-12 text-center text-ink-muted">
            Published articles will appear here. Five starter drafts are in{" "}
            <code>content/blog</code> with <code>draft: true</code>.
          </p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border pb-6">
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-xl font-bold text-ink group-hover:text-teal">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-muted">{post.description}</p>
                  <p className="mt-2 text-xs text-ink-muted">{post.date}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <TrialCTA />
    </>
  );
}
