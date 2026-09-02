import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { games } from "@/lib/data/games";
import { news } from "@/lib/data/news";

const BASE_URL = "https://arisgames.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/games", "/about", "/news", "/support", "/contact", "/privacy", "/terms"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({ url: `${BASE_URL}/${locale}${path}`, lastModified: new Date() });
    }
    for (const game of games) {
      entries.push({ url: `${BASE_URL}/${locale}/games/${game.slug}`, lastModified: new Date() });
    }
    for (const item of news) {
      entries.push({ url: `${BASE_URL}/${locale}/news/${item.slug}`, lastModified: new Date(item.date) });
    }
  }

  return entries;
}
