import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: { default: dict.meta.defaultTitle, template: `%s | ${dict.meta.siteName}` },
    description: dict.meta.defaultDescription,
    openGraph: {
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      siteName: dict.meta.siteName,
      locale: lang === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
    },
    alternates: {
      languages: { ko: "/ko", en: "/en" },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Header lang={lang as Locale} dict={dict} />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer lang={lang as Locale} dict={dict} />
    </>
  );
}
