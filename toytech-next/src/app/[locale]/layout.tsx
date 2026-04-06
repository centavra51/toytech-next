import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getLocaleContent } from "../../lib/site-content";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getLocaleContent(locale);
  return {
    title: t.hero.title.replace(/<\/?[^>]+(>|$)/g, ""),
    description: t.hero.subtitle,
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
