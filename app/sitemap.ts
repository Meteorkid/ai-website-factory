import type { MetadataRoute } from "next";

const baseUrl = "https://ai-workshop.example.com";

const pages = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/pricing", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/process", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/cases", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/maintenance", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/about", changeFrequency: "yearly" as const, priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.9 },
];

const locales = ["zh", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${baseUrl}/${locale}${page.path}`;
    }
    languages["x-default"] = `${baseUrl}${page.path}`;

    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
