export type NewsItem = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string; // ISO date, e.g. "2026-01-15"
  coverImage?: string;
};

/**
 * No announcements have been published yet. Add entries here once there
 * is a real update to share — the news list and detail pages read from
 * this array automatically.
 */
export const news: NewsItem[] = [];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find((item) => item.slug === slug);
}

export function getSortedNews(): NewsItem[] {
  return [...news].sort((a, b) => (a.date < b.date ? 1 : -1));
}
