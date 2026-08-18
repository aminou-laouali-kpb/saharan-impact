import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPostMetadata } from "@/lib/blog";

export default function ArticleCard({ post }: { post: BlogPostMetadata }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-black/5 bg-white/40 p-6">
      <div className="flex items-center justify-between gap-4 font-mono text-[10px] font-bold uppercase tracking-wider text-bleu-horizon">
        <span>{post.pillar}</span>
        <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(post.publishedAt))}</time>
      </div>
      <h2 className="mt-4 font-display text-xl font-bold leading-snug text-terre">
        <Link href={`/blog/${post.slug}`} className="hover:text-bleu-horizon">{post.title}</Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-terre/70">{post.description}</p>
      <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-bleu-horizon">
        Lire l&apos;article <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </article>
  );
}
