import { existsSync } from "node:fs";
import { join } from "node:path";

export const HERO_IMAGE_PUBLIC_PATH = "/hero/hero-main.png";

/**
 * Drop a file at `public/hero/hero-main.png` and the homepage hero will
 * automatically switch from the abstract brand art to that photo, framed
 * with the same overlay treatment as the reference design.
 */
export function getHeroImage(): string | null {
  const absolutePath = join(process.cwd(), "public", "hero", "hero-main.png");
  return existsSync(absolutePath) ? HERO_IMAGE_PUBLIC_PATH : null;
}
