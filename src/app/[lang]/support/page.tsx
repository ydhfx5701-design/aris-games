import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LifeBuoy } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { games } from "@/lib/data/games";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.support.eyebrow, description: dict.support.body };
}

export default async function SupportPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <PageHero eyebrow={dict.support.eyebrow} title={dict.support.heading} description={dict.support.body} />

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle">
              {dict.support.selectGameLabel}
            </p>
          </Reveal>

          {games.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((game, i) => (
                <Reveal key={game.slug} delay={i * 60}>
                  <Link
                    href={`/${lang}/support/${game.slug}`}
                    className="flex items-center justify-between rounded-xl border border-border bg-surface px-6 py-5 transition-colors duration-300 hover:border-accent-purple-strong/50"
                  >
                    <span className="font-display text-sm font-bold text-fg">{game.title}</span>
                    <span className="text-xs text-fg-subtle">{game.genre}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={60} className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-8 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-elevated">
                <LifeBuoy className="h-5 w-5 text-accent-purple-strong" strokeWidth={1.5} />
              </span>
              <h3 className="font-display text-lg font-bold text-fg">{dict.support.noGamesTitle}</h3>
              <p className="max-w-md text-sm leading-relaxed text-fg-muted">{dict.support.noGamesBody}</p>
            </Reveal>
          )}

          <div className="mt-16">
            <h2 className="font-display text-xl font-bold tracking-tight text-fg">{dict.support.generalHeading}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dict.support.categories.map((category, i) => (
                <Reveal key={category.title} delay={i * 60}>
                  <div className="h-full rounded-xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent-purple-strong/40">
                    <h3 className="text-sm font-bold tracking-wide text-fg">{category.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-fg-muted">{category.body}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={dict.support.categories.length * 60}>
                <Link
                  href={`/${lang}/contact`}
                  className="flex h-full min-h-[104px] flex-col items-start justify-center gap-2 rounded-xl border border-dashed border-border-strong bg-transparent p-6 text-sm font-semibold text-accent-purple-strong transition-colors duration-300 hover:border-accent-purple-strong"
                >
                  {dict.support.contactCta} →
                </Link>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
