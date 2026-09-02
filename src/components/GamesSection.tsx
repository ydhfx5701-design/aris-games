import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { games } from "@/lib/data/games";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { GameCard } from "@/components/GameCard";
import { GamesEmptyState } from "@/components/GamesEmptyState";
import { Reveal } from "@/components/Reveal";

export function GamesSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const featured = games.slice(0, 4);

  return (
    <section className="border-t border-border bg-bg py-24 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={dict.games.eyebrow}
            title={
              <>
                {dict.games.heading[0]}
                <br />
                {dict.games.heading[1]}
              </>
            }
          />
          {featured.length > 0 && (
            <Reveal delay={80}>
              <Link
                href={`/${lang}/games`}
                className="group flex items-center gap-2 text-sm font-semibold text-fg-muted transition-colors duration-300 hover:text-fg"
              >
                {dict.games.viewAll}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}
        </div>

        <div className="mt-12">
          {featured.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((game, i) => (
                <Reveal key={game.slug} delay={i * 70}>
                  <GameCard game={game} lang={lang} dict={dict} />
                </Reveal>
              ))}
            </div>
          ) : (
            <GamesEmptyState dict={dict} />
          )}
        </div>
      </Container>
    </section>
  );
}
