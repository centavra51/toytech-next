import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { getLocaleContent } from "../../../lib/site-content";
import type { Locale } from "../../../lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "ro" }, { locale: "en" }];
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getLocaleContent(locale);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar t={t} locale={locale} />

      <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 lg:pt-48">
        <Link
          href={`/${locale}`}
          className="group mb-12 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t.servicePage.back}
        </Link>

        <div className="mb-16 flex items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight lg:text-6xl">
              {t.privacy.title}
            </h1>
            <p className="mt-2 font-medium text-zinc-500">
              {t.privacy.lastUpdated}
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {t.privacy.sections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider">
                {section.title}
              </h2>
              <p className="text-lg leading-relaxed text-zinc-400">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-20 rounded-[2rem] border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400">
          <p className="font-medium">
            {t.footer.brand_text} 
            <br />
            {t.common.address}
          </p>
        </div>
      </div>

      <Footer t={t} locale={locale} />
    </main>
  );
}
