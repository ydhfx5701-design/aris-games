import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { games, getGameBySlug } from "@/lib/data/games";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
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
  const dict = await getDictionary(lang);
  return { title: `${game.title} ${dict.support.eyebrow}` };
}

export default async function GameSupportPage({
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
      <PageHero eyebrow={`${game.title} · ${dict.support.eyebrow}`} title={dict.support.heading} />
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <Link
              href={`/${lang}/support`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {dict.support.selectGameLabel}
            </Link>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dict.support.categories.map((category, i) => (
              <Reveal key={category.title} delay={i * 60}>
                <div className="h-full rounded-xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent-purple-strong/40">
                  <h3 className="text-sm font-bold tracking-wide text-fg">{category.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-fg-muted">{category.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
