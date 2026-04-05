import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getTranslations } from "../../lib/i18n";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  return {
    title: t.hero.title.replace(/<\/?[^>]+(>|$)/g, ""),
    description: t.hero.subtitle,
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
