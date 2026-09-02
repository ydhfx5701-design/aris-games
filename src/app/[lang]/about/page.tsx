import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lightbulb, Flame, Users, Globe } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { genreTags } from "@/lib/data/genres";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

const valueIcons = [Lightbulb, Flame, Users, Globe];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.about.eyebrow, description: dict.about.pageBody };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <PageHero
        eyebrow={dict.about.pageIntroLabel}
        title={
          <>
            {dict.about.pageHeading[0]}
            <br />
            {dict.about.pageHeading[1]}
          </>
        }
        description={dict.about.pageBody}
      />

      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                {dict.about.missionHeading}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted">{dict.about.missionBody}</p>
            </Reveal>

            <Reveal delay={80} className="rounded-2xl border border-border bg-surface p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle">
                {dict.games.genresHeading}
              </p>
              <div className="mt-6 grid grid-cols-4 gap-3">
                {genreTags.map((genre) => (
                  <div
                    key={genre.key}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border bg-bg-elevated py-4 transition-colors duration-300 hover:border-accent-purple-strong/50"
                  >
                    <genre.icon className="h-4 w-4 text-accent-purple-strong" strokeWidth={1.5} />
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-fg-muted">
                      {genre.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-bg-elevated py-24 sm:py-28">
        <Container>
          <Reveal className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.28em] text-accent-purple-strong uppercase">
              {dict.about.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              {dict.about.heading.join(" ")}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.about.values.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <Reveal key={value.title} delay={i * 70}>
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent-purple-strong/40">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-elevated">
                      <Icon className="h-5 w-5 text-accent-purple-strong" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-wide text-fg">{value.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">{value.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
