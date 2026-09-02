import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Bell } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSortedNews } from "@/lib/data/news";
import { formatDate } from "@/lib/format-date";
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
  return { title: dict.news.eyebrow };
}

export default async function NewsListPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const items = getSortedNews();

  return (
    <>
      <PageHero eyebrow={dict.news.eyebrow} title={dict.news.heading} />
      <section className="pb-28 pt-4 sm:pt-8">
        <Container>
          {items.length > 0 ? (
            <div className="divide-y divide-border border-y border-border">
              {items.map((item, i) => (
                <Reveal key={item.slug} delay={i * 50}>
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
                      <span>{formatDate(item.date, lang as Locale)}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-fg-muted transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-8 py-20 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-elevated">
                <Bell className="h-5 w-5 text-accent-purple-strong" strokeWidth={1.5} />
              </span>
              <h3 className="font-display text-lg font-bold text-fg">{dict.news.emptyTitle}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-fg-muted">{dict.news.emptyBody}</p>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}
