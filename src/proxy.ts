import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("ARIS_LOCALE")?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage.split(",")[0]?.split("-")[0]?.trim().toLowerCase();
    if (preferred && isLocale(preferred)) return preferred;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set("ARIS_LOCALE", locale, { maxAge: 60 * 60 * 24 * 365, path: "/" });
  return response;
}

export const config = {
  // Exclude framework internals, named route handlers, and anything that
  // looks like a static asset (has a file extension) so files under
  // public/ (logos, hero images, fonts, etc.) are served as-is instead of
  // being redirected to a locale-prefixed path.
  matcher: ["/((?!_next|api|opengraph-image|twitter-image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
