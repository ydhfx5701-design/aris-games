import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/Container";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const siteLinks = [
    { href: `/${lang}/games`, label: dict.nav.games },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/news`, label: dict.nav.news },
    { href: `/${lang}/support`, label: dict.nav.support },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-border bg-bg-elevated">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-8">
          <div>
            <div className="relative h-9 w-32">
              <Image src="/logo/aris-logo.png" alt="ARIS GAMES" fill className="object-contain object-left" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-muted">{dict.footer.tagline}</p>
            <SocialLinks className="mt-6" />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-fg-subtle">{dict.footer.columnsTitle}</p>
            <ul className="mt-5 space-y-3">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-fg-subtle">{dict.footer.legalTitle}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href={`/${lang}/privacy`} className="text-sm text-fg-muted transition-colors hover:text-fg">
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/terms`} className="text-sm text-fg-muted transition-colors hover:text-fg">
                  {dict.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>{dict.footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
