import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import PageHero from "@/components/PageHero";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Guides IA, numérique et croissance en Afrique de l'Ouest",
  description: "Guides pratiques de Saharan Impact pour les institutions, les PME et les professionnels qui développent leurs compétences numériques.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", type: "website" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-pierre-froide">
      <Header />
      <main id="contenu-principal">
        <PageHero
          eyebrow="Blog · Expérience terrain"
          title="Comprendre, choisir et mettre le numérique au travail."
          description="Des guides pratiques pour prendre de meilleures décisions numériques au Niger et en Afrique de l'Ouest."
        />

        <section className="mx-auto max-w-7xl px-6 py-20 md:px-12">
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => <ArticleCard key={post.slug} post={post} />)}
          </div>
        </section>

        <section className="bg-terre py-16">
          <div className="mx-auto max-w-2xl px-6 md:px-12">
            <NewsletterForm source="hub-blog" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
