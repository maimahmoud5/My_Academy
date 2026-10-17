import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createMetadata } from "@/lib/seo";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { PageHeader } from "@/components/Hero";
import { TrialCTA } from "@/components/TrialCTA";
import { BlogReadTracker } from "@/components/BlogReadTracker";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts(false).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug, false);
  if (!post) return {};
  return createMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug, false);
  if (!post) notFound();

  return (
    <>
      <BlogReadTracker slug={slug} />
      <PageHeader
        title={post.meta.title}
        description={post.meta.description}
        breadcrumb={[
          { label: "Blog", href: "/blog" },
          { label: post.meta.title, href: `/blog/${slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-ink-muted sm:px-6 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        <p className="text-xs text-ink-muted">
          {post.meta.date}
          {post.meta.tags.length > 0 ? ` · ${post.meta.tags.join(", ")}` : ""}
        </p>
        <MDXRemote source={post.content} />
      </article>
      <TrialCTA />
    </>
  );
}
