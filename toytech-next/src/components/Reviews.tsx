"use client";

import React from 'react';
import { Star, Quote } from 'lucide-react';
import type { Translation } from "../lib/i18n";

interface ReviewsProps {
  t: Translation;
}

export default function Reviews({ t }: ReviewsProps) {
  const reviews = Object.entries(t.reviews)
    .filter(([key, value]) => /^r\d+$/.test(key) && typeof value === "object" && value !== null)
    .sort(([left], [right]) => Number(left.slice(1)) - Number(right.slice(1)))
    .map(([, value]) => ({
      ...(value as { text: string; author: string; car: string }),
      rating: 5,
    }));

  return (
    <section id="reviews" className="py-24 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-xs font-bold uppercase tracking-widest">
            {t.reviews.label}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white">{t.reviews.title}</h2>
          <p className="text-lg text-zinc-400 font-medium">{t.reviews.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="relative p-10 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] hover:border-zinc-700 transition-all group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 transform translate-x-4 translate-y-[-4] rotate-[-20deg] opacity-[0.05] group-hover:opacity-[0.1] transition-all group-hover:scale-110 pointer-events-none">
                <Quote className="w-48 h-48" />
              </div>
              
              <div className="relative space-y-6">
                <div className="flex gap-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                
                <p className="text-xl font-medium text-white leading-relaxed italic">
                  {r.text}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-red-600 text-xl uppercase">
                     {r.author?.[0] ?? "T"}
                  </div>
                  <div>
                    <div className="font-black text-white">{r.author}</div>
                    <div className="text-zinc-500 text-sm font-bold uppercase tracking-wide">{r.car}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
