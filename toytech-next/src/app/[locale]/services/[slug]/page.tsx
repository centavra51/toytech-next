/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AirVent,
  ArrowLeft,
  BatteryCharging,
  Bike,
  Box,
  Brush,
  Cog,
  Droplets,
  Gauge,
  ShieldCheck,
  Thermometer,
  Wind,
  Zap,
  Wrench,
  Car,
  Settings,
  Search,
  Cpu,
  Fan,
  Stethoscope,
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import AppointmentForm from "../../../../components/AppointmentForm";
import { getSiteContent } from "../../../../lib/site-content";
import { relatedServices } from "../../../../lib/service-catalog";
import type { Locale, Translation } from "../../../../lib/i18n";

const iconMap = {
  "battery-charging": BatteryCharging,
  cog: Cog,
  zap: Zap,
  wind: Wind,
  brush: Brush,
  bike: Bike,
  "shield-check": ShieldCheck,
  gauge: Gauge,
  thermometer: Thermometer,
  box: Box,
  droplets: Droplets,
  "air-vent": AirVent,
  wrench: Wrench,
  car: Car,
  settings: Settings,
  search: Search,
  cpu: Cpu,
  fan: Fan,
  stethoscope: Stethoscope,
};

export async function generateStaticParams() {
  const locales = ["ru", "ro", "en"];
  const content = await getSiteContent();
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    for (const svc of content.services) {
      // Skip placeholder/draft services — they have no real page and would
      // produce 404s that hurt crawl budget and sitemap trustworthiness.
      if (svc.slug.startsWith("new-service-")) continue;
      params.push({ locale, slug: svc.slug });
    }
  }

  return params;
}

function getServiceTranslation(
  serviceId: string,
  locale: string,
  translations: Record<Locale, Translation>,
) {
  const orderedLocales = [
    locale,
    ...Object.keys(translations).filter((itemLocale) => itemLocale !== locale),
  ];

  for (const currentLocale of orderedLocales) {
    const item = translations[currentLocale as Locale]?.services?.[
      serviceId as keyof Translation["services"]
    ] as Translation["services"]["s1"] | undefined;

    if (item && (item.title || item.desc || item.long_desc || item.price)) {
      return item;
    }
  }

  return null;
}

function getTextParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\n/g, " ").trim())
    .filter(Boolean);
}

function getRelatedLabel(locale: string) {
  if (locale === "ru") {
    return {
      title: "Полезно также",
      subtitle: "Связанные услуги, которые часто идут рядом с этой работой.",
    };
  }

  if (locale === "en") {
    return {
      title: "Also useful",
      subtitle: "Related services that are often needed together with this job.",
    };
  }

  return {
    title: "Util și împreună",
    subtitle: "Servicii conexe care sunt des necesare împreună cu această lucrare.",
  };
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toytech.md";
const ALL_LOCALES = ["ru", "ro", "en"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = await getSiteContent();
  const svcInfo = content.services.find((serviceItem) => serviceItem.slug === slug);
  const service = svcInfo
    ? getServiceTranslation(svcInfo.id, locale, content.translations)
    : null;

  if (!svcInfo || !service) {
    return {};
  }

  const description = getTextParagraphs(service.long_desc || service.desc)[0] ?? service.desc;

  // Build hreflang alternates for all locale variants of this page
  const languages: Record<string, string> = {};
  for (const l of ALL_LOCALES) {
    languages[l] = `${BASE_URL}/${l}/services/${slug}`;
  }
  // x-default → canonical default locale (ro)
  languages["x-default"] = `${BASE_URL}/ro/services/${slug}`;

  return {
    title: service.seoTitle ?? service.title,
    description,
    keywords: service.keywords,
    // canonical tells Google exactly which URL is the authoritative one
    alternates: {
      canonical: `${BASE_URL}/${locale}/services/${slug}`,
      languages,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = await getSiteContent();
  const t = content.translations[locale as keyof typeof content.translations] ?? content.translations.ro;
  const svcInfo = content.services.find((serviceItem) => serviceItem.slug === slug);
  const service = svcInfo
    ? getServiceTranslation(svcInfo.id, locale, content.translations)
    : null;

  if (!service || !svcInfo) {
    notFound();
  }

  const Icon = iconMap[svcInfo.icon as keyof typeof iconMap] || Cog;
  const serviceImage = svcInfo.image?.trim();
  const serviceParagraphs = getTextParagraphs(service.long_desc || service.desc);
  const serviceImageAlt = svcInfo.imageAlt || service.seoTitle || service.title;
  const relatedLabel = getRelatedLabel(locale);
  const relatedItems = (relatedServices[svcInfo.id as keyof typeof relatedServices] ?? [])
    .map((relatedId) => {
      const relatedInfo = content.services.find((serviceItem) => serviceItem.id === relatedId);
      const relatedService = relatedInfo
        ? getServiceTranslation(relatedInfo.id, locale, content.translations)
        : null;

      if (!relatedInfo || !relatedService) {
        return null;
      }

      return {
        slug: relatedInfo.slug,
        title: relatedService.title,
        desc: relatedService.desc,
      };
    })
    .filter(Boolean) as Array<{ slug: string; title: string; desc: string }>;

  return (
    <main className="min-h-screen overflow-x-hidden bg-zinc-950">
      <Navbar locale={locale} t={t} />

      <section className="w-full overflow-hidden pt-40 pb-24">
        <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6">
          <Link
            href={`/${locale}#services`}
            className="group mb-12 inline-flex items-center gap-2 font-bold text-zinc-500 transition-colors hover:text-red-500"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>{t.servicePage.back}</span>
          </Link>

          <div className="grid w-full items-start gap-8 md:gap-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="w-full space-y-8 animate-in slide-in-from-left duration-500 min-w-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
                <Icon className="h-10 w-10" />
              </div>

              {serviceImage && (
                <div className="group relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900 shadow-2xl">
                  <div className="relative aspect-[16/10]">
                    {serviceImage.startsWith("/") ? (
                      <Image
                        src={serviceImage}
                        alt={serviceImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 800px"
                        quality={85}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <img
                        src={serviceImage}
                        alt={serviceImageAlt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  </div>

                  <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                    <Icon className="h-4 w-4 text-red-400" />
                    {service.price}
                  </div>
                </div>
              )}

              <div className="w-full space-y-4 min-w-0">
                <h1 className="w-full break-words text-2xl sm:text-4xl md:text-6xl font-black text-white">
                  {service.seoTitle ?? service.title}
                </h1>
                <div className="inline-block rounded-full bg-red-600/10 px-4 py-1.5 text-sm font-black uppercase tracking-widest text-red-600">
                  {service.price}
                </div>
              </div>

              <div className="space-y-5 text-xl font-medium leading-relaxed text-zinc-400 min-w-0">
                {serviceParagraphs.map((paragraph) => (
                  <p key={paragraph} className="break-words">{paragraph}</p>
                ))}
              </div>

              {relatedItems.length > 0 && (
                <div className="space-y-6 rounded-[2rem] border border-zinc-800 bg-zinc-900/70 p-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-white">{relatedLabel.title}</h2>
                    <p className="text-sm font-medium text-zinc-400">
                      {relatedLabel.subtitle}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {relatedItems.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${locale}/services/${item.slug}`}
                        className="group rounded-[1.5rem] border border-zinc-800 bg-zinc-950 p-5 transition-all hover:-translate-y-0.5 hover:border-red-600/50"
                      >
                        <div className="space-y-3">
                          <h3 className="text-lg font-black text-white transition-colors group-hover:text-red-500">
                            {item.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-zinc-400">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="w-full space-y-6 pt-6 min-w-0 md:pt-0">
                <h2 className="text-2xl font-black text-white">
                  {t.servicePage.why}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[t.about.f1, t.about.f3, t.about.f4, t.about.f5].map(
                    (text) => (
                      <div
                        key={text}
                        className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600/10 text-red-600">
                          <Zap className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-bold text-zinc-300">
                          {text}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="animate-in slide-in-from-right duration-500 lg:sticky lg:top-32">
              <AppointmentForm t={t} services={content.services} />
            </div>
          </div>
        </div>
      </section>

      <Footer t={t} locale={locale} />
    </main>
  );
}
