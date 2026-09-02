import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Play } from "lucide-react";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { games, getGameBySlug } from "@/lib/data/games";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return locales.flatMap((lang) => games.map((game) => ({ lang, slug: game.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const game = getGameBySlug(slug);
  if (!game) return {};

  return {
    title: game.title,
    description: game.tagline,
    openGraph: {
      title: game.title,
      description: game.tagline,
      images: [{ url: game.heroImage }],
    },
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <section className="relative h-[56vh] min-h-[420px] w-full overflow-hidden">
        <Image src={game.heroImage} alt={game.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" />
        <Container className="absolute inset-x-0 bottom-0 pb-12">
          <Link
            href={`/${lang}/games`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {dict.games.backToList}
          </Link>
          <span className="mt-5 block w-fit rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
            {game.genre}
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">{game.title}</h1>
          <p className="mt-3 max-w-xl text-sm text-fg-muted sm:text-base">{game.tagline}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              <Reveal>
                <p className="max-w-2xl text-base leading-relaxed text-fg-muted">{game.description}</p>
              </Reveal>

              {game.trailerUrl && (
                <Reveal delay={80} className="mt-10">
                  <a
                    href={game.trailerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent-purple-strong hover:text-accent-purple-strong"
                  >
                    <Play className="h-4 w-4" /> Trailer
                  </a>
                </Reveal>
              )}

              {game.screenshots.length > 0 && (
                <Reveal delay={120} className="mt-12 grid grid-cols-2 gap-4">
                  {game.screenshots.map((src) => (
                    <div key={src} className="relative aspect-video overflow-hidden rounded-xl border border-border">
                      <Image src={src} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </Reveal>
              )}
            </div>

            <Reveal delay={100} className="h-fit rounded-2xl border border-border bg-surface p-6">
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">{dict.games.genreLabel}</dt>
                  <dd className="mt-1 text-fg">{game.genre}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">{dict.games.platformLabel}</dt>
                  <dd className="mt-1 text-fg">{game.platforms.join(" · ")}</dd>
                </div>
                {game.releaseInfo && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">Release</dt>
                    <dd className="mt-1 text-fg">{game.releaseInfo}</dd>
                  </div>
                )}
              </dl>

              {game.storeLinks && (game.storeLinks.steam || game.storeLinks.googlePlay || game.storeLinks.appStore) && (
                <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6">
                  {game.storeLinks.steam && (
                    <a href={game.storeLinks.steam} target="_blank" rel="noreferrer" className="rounded-full border border-border-strong px-4 py-2.5 text-center text-xs font-semibold transition-colors hover:border-accent-purple-strong">
                      Steam
                    </a>
                  )}
                  {game.storeLinks.googlePlay && (
                    <a href={game.storeLinks.googlePlay} target="_blank" rel="noreferrer" className="rounded-full border border-border-strong px-4 py-2.5 text-center text-xs font-semibold transition-colors hover:border-accent-purple-strong">
                      Google Play
                    </a>
                  )}
                  {game.storeLinks.appStore && (
                    <a href={game.storeLinks.appStore} target="_blank" rel="noreferrer" className="rounded-full border border-border-strong px-4 py-2.5 text-center text-xs font-semibold transition-colors hover:border-accent-purple-strong">
                      App Store
                    </a>
                  )}
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
