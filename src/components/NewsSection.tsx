import Link from "next/link";
import { ArrowRight, Bell } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getSortedNews } from "@/lib/data/news";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { formatDate } from "@/lib/format-date";

export function NewsSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const items = getSortedNews().slice(0, 3);

  return (
    <section className="border-t border-border bg-bg py-24 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={dict.news.eyebrow} title={dict.news.heading} />
          {items.length > 0 && (
            <Reveal delay={80}>
              <Link
                href={`/${lang}/news`}
                className="group flex items-center gap-2 text-sm font-semibold text-fg-muted transition-colors duration-300 hover:text-fg"
              >
                {dict.news.viewAll}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}
        </div>

        <div className="mt-12">
          {items.length > 0 ? (
            <div className="divide-y divide-border border-y border-border">
              {items.map((item, i) => (
                <Reveal key={item.slug} delay={i * 60}>
                  <Link
                    href={`/${lang}/news/${item.slug}`}
                    className="group flex flex-col gap-2 py-6 transition-colors duration-300 hover:bg-surface/60 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-4"
                  >
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                      <span className="w-fit rounded-full border border-border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fg-subtle">
                        {item.category}
                      </span>
                      <h3 className="font-display text-base font-semibold tracking-tight text-fg">{item.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-fg-subtle">
                      <span>{formatDate(item.date, lang)}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-fg-muted transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-8 py-16 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-elevated">
                <Bell className="h-5 w-5 text-accent-purple-strong" strokeWidth={1.5} />
              </span>
              <h3 className="font-display text-lg font-bold text-fg">{dict.news.emptyTitle}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-fg-muted">{dict.news.emptyBody}</p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
