import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllPosts, getPillarHref, getPost } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const canonical = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await post.load();
  const canonicalUrl = new URL(`/blog/${post.slug}`, SITE_URL).toString();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL.toString() },
    mainEntityOfPage: canonicalUrl,
    image: new URL("/opengraph-image", SITE_URL).toString(),
  };

  return (
    <div className="min-h-screen bg-pierre-froide text-terre">
      <Header />
      <main id="contenu-principal">
        <article>
          <header className="border-b border-black/5 bg-pierre-froide">
            <div className="mx-auto max-w-4xl px-6 py-16 md:px-12 md:py-24">
              <Link href="/blog" className="text-xs font-semibold uppercase tracking-wider text-bleu-horizon">← Tous les articles</Link>
              <p className="mt-8 font-mono text-xs font-bold uppercase tracking-wider text-bleu-horizon">{post.pillar} · {post.readTime}</p>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">{post.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-terre/70">{post.description}</p>
              <div className="mt-8 flex flex-wrap gap-4 text-xs text-terre/60">
                <span>{post.author}</span>
                <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(post.publishedAt))}</time>
              </div>
            </div>
            <div className="horizon-gradient-line" aria-hidden="true" />
          </header>

          <div className="article-prose mx-auto max-w-3xl px-6 py-16 md:px-12">
            <Content />
          </div>

          <div className="mx-auto max-w-3xl px-6 pb-20 md:px-12">
            <div className="rounded-2xl bg-terre p-6 text-pierre-froide md:p-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-or-de-l-aube">Prochaine étape</p>
              <h2 className="mt-3 font-display text-2xl font-bold">Passer du guide à un projet concret.</h2>
              <Link href={getPillarHref(post.pillar)} className="mt-5 inline-flex rounded-lg bg-or-de-l-aube px-5 py-3 text-xs font-bold uppercase tracking-wider text-nuit-sahara">
                Découvrir l&apos;offre {post.pillar}
              </Link>
              <div className="mt-8 border-t border-white/10 pt-6">
                <NewsletterForm source={`article:${post.slug}`} />
              </div>
            </div>
          </div>
        </article>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
      </main>
      <Footer />
    </div>
  );
}
