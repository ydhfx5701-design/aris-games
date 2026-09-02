import Link from "next/link";
import { ArrowRight, Lightbulb, Flame, Users, Globe } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

const valueIcons = [Lightbulb, Flame, Users, Globe];

export function AboutSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section className="border-t border-border bg-bg-elevated py-24 sm:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.28em] text-accent-purple-strong uppercase">
              {dict.about.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.2] tracking-tight text-fg sm:text-4xl">
              {dict.about.heading[0]}
              <br />
              {dict.about.heading[1]}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-fg-muted sm:text-base">{dict.about.body}</p>
            <Link
              href={`/${lang}/about`}
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fg transition-colors duration-300 hover:text-accent-purple-strong"
            >
              {dict.about.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 gap-5 sm:gap-6">
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
        </div>
      </Container>
    </section>
  );
}
