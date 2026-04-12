import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getLocaleContent } from "../../lib/site-content";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toytech.md";
const ALL_LOCALES = ["ru", "ro", "en"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getLocaleContent(locale);

  // Build hreflang map for all locale variants of the home page
  const languages: Record<string, string> = {};
  for (const l of ALL_LOCALES) {
    languages[l] = `${BASE_URL}/${l}`;
  }
  languages["x-default"] = `${BASE_URL}/ro`;

  return {
    title: t.hero.title.replace(/<\/?[^>]+(>|$)/g, ""),
    description: t.hero.subtitle,
    // canonical prevents "Duplicate without user-selected canonical" in GSC
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages,
    },
    icons: {
      icon: [
        { url: "/favicons/favicon.ico", sizes: "48x48" },
        { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/favicons/apple-touch-icon.png",
      other: [
        { rel: "manifest", url: "/favicons/site.webmanifest" },
      ],
    },
    verification: {
      google: "bZlfMHiO6X5CvsAy4tH-sd4xd8xeSo1PqQT3R8HmDuo",
      yandex: "829e651dae1e20e6",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-zinc-950 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
