import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { GamesSection } from "@/components/GamesSection";
import { AboutSection } from "@/components/AboutSection";
import { NewsSection } from "@/components/NewsSection";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Hero lang={lang as Locale} dict={dict} />
      <GamesSection lang={lang as Locale} dict={dict} />
      <AboutSection lang={lang as Locale} dict={dict} />
      <NewsSection lang={lang as Locale} dict={dict} />
    </>
  );
}
