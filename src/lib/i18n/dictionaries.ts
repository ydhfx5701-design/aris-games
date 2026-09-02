import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/ko";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  ko: () => import("./dictionaries/ko").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = loaders[locale] ?? loaders.ko;
  return loader();
}

export type { Dictionary };
