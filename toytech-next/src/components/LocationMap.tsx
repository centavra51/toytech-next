"use client";

import React from "react";
import { Clock3, MapPin, Phone } from "lucide-react";
import type { Translation } from "../lib/i18n";

export default function LocationMap({ t }: { t: Translation }) {
  return (
    <section id="location" className="bg-zinc-900/40 py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-600">
            Location
          </div>
          <h2 className="text-4xl font-black text-white lg:text-5xl">
            ToyTech, Chisinau
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-medium text-zinc-400">
            {t.common.address}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4 rounded-[2.5rem] border border-zinc-800 bg-zinc-900 p-8">
            <div className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <MapPin className="mt-1 h-5 w-5 text-red-500" />
              <div>
                <div className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
                  Address
                </div>
                <div className="mt-2 font-medium text-zinc-200">{t.common.address}</div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <Phone className="mt-1 h-5 w-5 text-red-500" />
              <div>
                <div className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
                  Phone
                </div>
                <a href={`tel:${t.common.phone}`} className="mt-2 block font-medium text-zinc-200">
                  {t.common.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <Clock3 className="mt-1 h-5 w-5 text-red-500" />
              <div>
                <div className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
                  Hours
                </div>
                <div className="mt-2 space-y-1 font-medium text-zinc-200">
                  <div>{t.common.hoursWeekdays}</div>
                  <div>{t.common.hoursSaturday}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900">
            <iframe
              src="https://www.google.com/maps?q=46.991521,28.821943&hl=ru&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[520px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
