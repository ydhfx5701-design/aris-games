import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { news, getNewsBySlug } from "@/lib/data/news";
import { formatDate } from "@/lib/format-date";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return locales.flatMap((lang) => news.map((item) => ({ lang, slug: item.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const item = getNewsBySlug(slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.excerpt,
    openGraph: item.coverImage
      ? { title: item.title, description: item.excerpt, images: [{ url: item.coverImage }] }
      : { title: item.title, description: item.excerpt },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Reveal>
          <Link
            href={`/${lang}/news`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {dict.news.backToList}
          </Link>

          <div className="mt-6 flex items-center gap-4 text-xs text-fg-subtle">
            <span className="rounded-full border border-border px-2.5 py-0.5 font-semibold uppercase tracking-wide">
              {item.category}
            </span>
            <span>{formatDate(item.date, lang as Locale)}</span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">
            {item.title}
          </h1>
        </Reveal>

        {item.coverImage && (
          <Reveal delay={80} className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-border">
            <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
          </Reveal>
        )}

        <Reveal delay={120} className="mt-10 whitespace-pre-line text-base leading-relaxed text-fg-muted">
          <p>{item.content}</p>
        </Reveal>
      </Container>
    </article>
  );
}
