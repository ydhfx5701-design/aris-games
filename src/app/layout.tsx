import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { cookies } from "next/headers";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const bodyFontKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arisgames.example.com"),
  title: "ARIS GAMES",
  icons: {
    icon: "/logo/aris-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#05050a",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("ARIS_LOCALE")?.value;
  const lang = cookieLocale && isLocale(cookieLocale) ? cookieLocale : defaultLocale;

  return (
    <html lang={lang} className={`${bodyFont.variable} ${bodyFontKr.variable}`} suppressHydrationWarning>
      <body className="bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
