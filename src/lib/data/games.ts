export type Platform = "PC" | "Mobile" | "Console";

export type Game = {
  slug: string;
  genre: string;
  title: string;
  tagline: string;
  description: string;
  platforms: Platform[];
  coverImage: string;
  heroImage: string;
  screenshots: string[];
  trailerUrl?: string;
  releaseInfo?: string;
  storeLinks?: {
    steam?: string;
    googlePlay?: string;
    appStore?: string;
  };
};

/**
 * No titles have been announced yet. Add entries here once a game is
 * ready to be revealed — every page that lists games reads from this
 * array and will render real cards automatically.
 */
export const games: Game[] = [];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}
