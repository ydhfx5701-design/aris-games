"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/Container";
import { SocialLinks } from "@/components/SocialLinks";
import { LangSwitcher } from "@/components/LangSwitcher";
import { cn } from "@/lib/utils";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/games`, label: dict.nav.games },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/news`, label: dict.nav.news },
    { href: `/${lang}/support`, label: dict.nav.support },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  function isActive(href: string) {
    if (href === `/${lang}`) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen ? "glass-panel border-b border-border" : "border-b border-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href={`/${lang}`} className="relative z-10 flex h-9 w-32 shrink-0 items-center sm:h-10 sm:w-36">
          <Image
            src="/logo/aris-logo.png"
            alt="ARIS GAMES"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-xs font-semibold tracking-[0.18em] transition-colors duration-300",
                isActive(item.href) ? "text-fg" : "text-fg-muted hover:text-fg"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <SocialLinks />
          <div className="h-5 w-px bg-border" />
          <LangSwitcher current={lang} />
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-10 flex h-10 w-10 items-center justify-center text-fg lg:hidden"
          aria-label="Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <div
        className={cn(
          "fixed inset-0 top-20 z-40 bg-bg transition-opacity duration-300 lg:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <Container className="flex h-full flex-col justify-between py-10">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-b border-border py-5 font-display text-2xl font-bold tracking-tight transition-colors",
                  isActive(item.href) ? "text-fg" : "text-fg-muted"
                )}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-between pt-8">
            <SocialLinks />
            <LangSwitcher current={lang} />
          </div>
        </Container>
      </div>
    </header>
  );
}
