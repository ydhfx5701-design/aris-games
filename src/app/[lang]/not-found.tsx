import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/Container";

export default async function NotFound() {
  const dict = await getDictionary(defaultLocale);

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-20">
      <Container className="text-center">
        <p className="text-xs font-semibold tracking-[0.28em] text-accent-purple-strong uppercase">404</p>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
          {dict.common.notFoundTitle}
        </h1>
        <p className="mt-3 text-sm text-fg-muted">{dict.common.notFoundBody}</p>
        <Link
          href={`/${defaultLocale}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-purple-strong"
        >
          {dict.common.backHome}
        </Link>
      </Container>
    </section>
  );
}
