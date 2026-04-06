"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AirVent,
  ArrowRight,
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
  type LucideIcon,
} from "lucide-react";
import type { Translation } from "../lib/i18n";
import type { Locale } from "../lib/i18n";

type ServiceItem = {
  id: string;
  slug: string;
  icon: string;
  image?: string;
  imageAlt?: string;
};

interface ServicesProps {
  locale: string;
  t: Translation;
  servicesData: ServiceItem[];
  translations: Record<Locale, Translation>;
}

const iconMap: Record<string, LucideIcon> = {
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
};

function getServiceTranslation(
  serviceId: string,
  locale: string,
  translations: Record<Locale, Translation>,
) {
  const orderedLocales = [
    locale,
    ...Object.keys(translations).filter((itemLocale) => itemLocale !== locale),
  ] as string[];

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

function getMoreServicesLabel(locale: string) {
  if (locale === "ru") {
    return "Узнать о других услугах";
  }

  if (locale === "en") {
    return "Ask about other services";
  }

  return "Afla si despre alte servicii";
}

export default function Services({ locale, t, servicesData, translations }: ServicesProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? servicesData : servicesData.slice(0, 6);

  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-600">
            {t.services.label}
          </div>
          <h2 className="text-4xl font-black text-white lg:text-5xl">
            {t.services.title}
          </h2>
          <p className="text-lg font-medium text-zinc-300">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((svc) => {
            const IconComponent =
              iconMap[svc.icon as keyof typeof iconMap] || Cog || ArrowRight;
            const item = getServiceTranslation(svc.id, locale, translations);

            if (!item) {
              return null;
            }

            return (
              <div
                key={svc.slug}
                className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/5"
              >
                <div className="pointer-events-none absolute right-0 top-0 translate-x-12 rotate-[20deg] p-8 opacity-[0.03] transition-all group-hover:scale-110 group-hover:opacity-[0.05]">
                  <IconComponent className="h-48 w-48" />
                </div>

                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 text-red-600 transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-500 transition-colors group-hover:text-red-500">
                      {item.price}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-extrabold text-white transition-colors group-hover:text-red-500">
                      {item.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-zinc-300">
                      {item.desc}
                    </p>
                  </div>

                  <Link
                    href={`/${locale}/services/${svc.slug}`}
                    aria-label={`${t.services.btn_more} — ${item.title}`}
                    className="inline-flex items-center gap-2 border-b-2 border-zinc-800 pb-1 font-bold text-white transition-all group-hover:gap-4 group-hover:border-red-600"
                  >
                    <span>{t.services.btn_more}</span>
                    <ArrowRight className="h-5 w-5 text-red-600" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {!showAll && servicesData.length > 6 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 px-10 py-4 text-lg font-black text-white shadow-xl transition-all hover:border-red-600 hover:shadow-red-600/10"
            >
              {t.services.btn_more}
            </button>
          </div>
        )}

        {showAll && (
          <div className="mt-10 flex justify-center">
            <a
              href="#appointment-form"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-red-600/30 bg-red-600 px-8 py-4 text-center text-base font-black text-white shadow-xl shadow-red-600/20 transition-all hover:-translate-y-0.5 hover:bg-red-700 sm:text-lg"
            >
              {getMoreServicesLabel(locale)}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
