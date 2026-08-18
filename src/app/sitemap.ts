import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/institutions", "/pme", "/academy", "/blog", "/a-propos", "/contact"];
  const staticEntries: MetadataRoute.Sitemap = pages.map((path) => ({
    url: new URL(path || "/", SITE_URL).toString(),
    lastModified: new Date("2026-07-13"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/blog" ? 0.8 : 0.9,
  }));

  const articleEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}
