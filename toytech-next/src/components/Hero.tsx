"use client";

import React from "react";
import Image from "next/image";
import { BatteryCharging, Phone } from "lucide-react";
import MessengerButtons from "./MessengerButtons";
import type { Translation } from "../lib/i18n";
import { toTelHref } from "../lib/contact-links";

interface HeroProps {
  t: Translation;
}

export default function Hero({ t }: HeroProps) {
  const stats = [
    { number: "10+", label: t.hero.stat_experience },
    { number: "500+", label: t.hero.stat_repairs },
    { number: "100%", label: t.hero.stat_diagnosis },
  ];

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-24">
      <div className="pointer-events-none absolute -right-[10%] -top-[20%] h-[800px] w-[800px] rounded-full bg-red-600/10 blur-[120px]" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="max-w-2xl space-y-8">
            <h1
              className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white lg:text-7xl"
              dangerouslySetInnerHTML={{ __html: t.hero.title }}
            />

            <p className="text-lg font-medium leading-relaxed text-zinc-400 lg:text-xl">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#appointment-form"
                className="transform rounded-2xl bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-red-600/30 transition-all hover:-translate-y-1 hover:bg-red-700"
              >
                {t.hero.cta_book}
              </a>

              <a
                href={toTelHref(t.common.phone)}
                className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-8 py-4 text-lg font-bold text-white transition-all hover:border-zinc-700"
              >
                <Phone className="h-5 w-5 text-red-600" />
                {t.hero.cta_call}
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">
                Messengers
              </div>
              <MessengerButtons phone={t.common.phone} />
            </div>

            <div className="grid grid-cols-3 gap-8 border-t border-zinc-900 pt-10">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1 text-center lg:text-left">
                  <div className="text-4xl font-black text-red-600 lg:text-5xl">
                    {stat.number}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 lg:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-zinc-800 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                src="/images/hero image.jpg"
                alt="ToyTech Hybrid Specialist"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 45vw"
                className="object-cover transition-opacity duration-500 group-hover:opacity-90"
              />

              <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-black text-black shadow-xl">
                <BatteryCharging className="h-4 w-4" />
                {t.hero.badge}
              </div>

              <div className="absolute bottom-6 left-6 rounded-[1.5rem] bg-red-600 p-6 text-white shadow-2xl backdrop-blur-sm">
                <div className="text-2xl font-black">{t.hero.price}</div>
                <div className="text-sm font-bold opacity-90">{t.hero.price_text}</div>
              </div>
            </div>

            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] border-2 border-red-600/20 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
