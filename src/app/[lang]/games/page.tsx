import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { notFound } from "next/navigation";
import { games } from "@/lib/data/games";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { GameCard } from "@/components/GameCard";
import { GamesEmptyState } from "@/components/GamesEmptyState";
import { Reveal } from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.games.eyebrow, description: dict.games.genresBody };
}

export default async function GamesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <PageHero
        eyebrow={dict.games.eyebrow}
        title={
          <>
            {dict.games.heading[0]}
            <br />
            {dict.games.heading[1]}
          </>
        }
      />
      <section className="pb-28">
        <Container>
          {games.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((game, i) => (
                <Reveal key={game.slug} delay={i * 60}>
                  <GameCard game={game} lang={lang as Locale} dict={dict} />
                </Reveal>
              ))}
            </div>
          ) : (
            <GamesEmptyState dict={dict} />
          )}
        </Container>
      </section>
    </>
  );
}
