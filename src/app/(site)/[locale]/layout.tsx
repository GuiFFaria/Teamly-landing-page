import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { themeInitScript } from "@/components/ThemeToggle";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import "../../globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

type Params = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: { en: "/en/", pt: "/pt/" } },
    openGraph: { title: meta.title, description: meta.description, locale: locale === "pt" ? "pt_PT" : "en_US", type: "website" },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode } & Params>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={geist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
