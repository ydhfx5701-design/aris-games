"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LangSwitcher({ current, className }: { current: Locale; className?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(locale: Locale) {
    if (locale === current) return;
    document.cookie = `ARIS_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365}`;
    const rest = pathname.split("/").slice(2).join("/");
    router.push(`/${locale}${rest ? `/${rest}` : ""}`);
  }

  return (
    <div className={cn("flex items-center gap-1 rounded-full border border-border p-1 text-xs font-semibold", className)}>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchTo(locale)}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors duration-300",
            locale === current ? "bg-accent-purple text-white" : "text-fg-muted hover:text-fg"
          )}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
