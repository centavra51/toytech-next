import React from "react";
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
} from "lucide-react";
import { getTranslations } from "../../../../lib/i18n";
import servicesData from "../../../../lib/services.json";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import AppointmentForm from "../../../../components/AppointmentForm";

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
};

export async function generateStaticParams() {
  const locales = ["ru", "ro", "en"];
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    for (const svc of servicesData) {
      params.push({ locale, slug: svc.slug });
    }
  }

  return params;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = getTranslations(locale);
  const svcInfo = servicesData.find((serviceItem) => serviceItem.slug === slug);
  const service = svcInfo
    ? (t.services[svcInfo.id as keyof typeof t.services] as typeof t.services.s1)
    : null;

  if (!service || !svcInfo) {
    notFound();
  }

  const Icon = iconMap[svcInfo.icon as keyof typeof iconMap] || Cog;

  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar locale={locale} t={t} />

      <section className="pt-40 pb-24">
        <div className="container mx-auto max-w-5xl px-6">
          <Link
            href={`/${locale}#services`}
            className="group mb-12 inline-flex items-center gap-2 font-bold text-zinc-500 transition-colors hover:text-red-500"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>{t.servicePage.back}</span>
          </Link>

          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div className="space-y-8 animate-in slide-in-from-left duration-500">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
                <Icon className="h-10 w-10" />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-black text-white lg:text-6xl">
                  {service.title}
                </h1>
                <div className="inline-block rounded-full bg-red-600/10 px-4 py-1.5 text-sm font-black uppercase tracking-widest text-red-600">
                  {service.price}
                </div>
              </div>

              <p className="text-xl font-medium leading-relaxed text-zinc-400">
                {service.long_desc || service.desc}
              </p>

              <div className="space-y-6 pt-6">
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
              <AppointmentForm t={t} />
            </div>
          </div>
        </div>
      </section>

      <Footer t={t} locale={locale} />
    </main>
  );
}
