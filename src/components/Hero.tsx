import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/Container";
import { HeroArt } from "@/components/HeroArt";
import { HeroPhoto } from "@/components/HeroPhoto";
import { getHeroImage } from "@/lib/data/hero";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const heroImage = getHeroImage();

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-bg pt-20">
      {heroImage ? <HeroPhoto src={heroImage} /> : <HeroArt />}

      <Container className="relative z-10 w-full">
        <div className="max-w-2xl py-16">
          <p className="animate-fade-up text-xs font-semibold tracking-[0.32em] text-accent-purple-strong uppercase [animation-delay:0ms]">
            {dict.hero.eyebrow}
          </p>

          <h1 className="mt-6 font-display text-[13vw] font-black leading-[0.98] tracking-tight text-fg sm:text-6xl md:text-7xl lg:text-8xl">
            {dict.hero.titleLines.map((line, i) => (
              <span
                key={line}
                className="animate-fade-up block [animation-fill-mode:backwards]"
                style={{ animationDelay: `${120 + i * 110}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            className="animate-fade-up mt-7 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg [animation-fill-mode:backwards]"
            style={{ animationDelay: "480ms" }}
          >
            {dict.hero.subtitle}
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-4 [animation-fill-mode:backwards]"
            style={{ animationDelay: "560ms" }}
          >
            <Link
              href={`/${lang}/games`}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-purple px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-purple-strong hover:shadow-[0_0_30px_-6px_rgba(139,92,246,0.7)]"
            >
              {dict.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/${lang}/about`}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-semibold text-fg transition-colors duration-300 hover:border-accent-purple-strong hover:text-accent-purple-strong"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 text-fg-subtle sm:right-8 sm:flex lg:right-12">
        <span
          className="text-[10px] font-semibold tracking-[0.3em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <span className="h-10 w-px bg-border-strong" />
      </div>
    </section>
  );
}
