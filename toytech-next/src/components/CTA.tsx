"use client";

import React from "react";
import { CalendarCheck, Phone } from "lucide-react";
import type { Translation } from "../lib/i18n";
import { toTelHref } from "../lib/contact-links";

interface CTAProps {
  t: Translation;
}

export default function CTA({ t }: CTAProps) {
  return (
    <section id="appointment" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-video w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px]" />

      <div className="container relative mx-auto max-w-5xl px-6">
        <div className="space-y-10 rounded-[3rem] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-12 text-center shadow-3xl shadow-red-600/5 lg:p-20">
          <div className="space-y-4">
            <h2 className="text-4xl font-black leading-tight text-white lg:text-6xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto max-w-2xl text-xl font-medium text-zinc-400">
              {t.cta.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href={toTelHref(t.common.phone)}
              className="group relative flex items-center gap-4 rounded-2xl border border-zinc-700 bg-zinc-800 px-10 py-5 text-xl font-black shadow-xl transition-all hover:border-red-600"
            >
              <Phone className="h-6 w-6 text-red-600 transition-transform group-hover:scale-110" />
              <span>{t.cta.btn_call}</span>
              <div className="absolute -right-3 -top-3 rounded-full bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                Live
              </div>
            </a>

            <a
              href="#appointment-form"
              className="flex items-center gap-4 rounded-2xl bg-red-600 px-10 py-5 text-xl font-black shadow-2xl shadow-red-600/40 transition-all hover:scale-105 hover:bg-red-700"
            >
              <CalendarCheck className="h-7 w-7" />
              <span>{t.cta.btn_book}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
