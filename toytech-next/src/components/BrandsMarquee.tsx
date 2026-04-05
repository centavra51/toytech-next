"use client";

import React from "react";

const brandsContent = {
  ru: {
    title: "Работаем со всеми ведущими брендами",
  },
  ro: {
    title: "Lucram cu toate brandurile importante",
  },
  en: {
    title: "We work with all major brands",
  },
} as const;

const brands = [
  "Toyota Hybrid",
  "Lexus Hybrid",
  "Honda Insight/Civic",
  "Hyundai Ioniq",
  "Kia Niro",
  "Ford Fusion Hybrid",
];

export default function BrandsMarquee({ locale }: { locale: string }) {
  const content = brandsContent[locale as keyof typeof brandsContent] ?? brandsContent.ro;
  const items = [...brands, ...brands];

  return (
    <section className="overflow-hidden border-y border-zinc-900 bg-zinc-950 py-10">
      <div className="container mx-auto mb-6 px-6">
        <h3 className="text-center text-lg font-bold text-zinc-400 lg:text-xl">
          {content.title}
        </h3>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-950 to-transparent" />

        <div className="flex min-w-max animate-[marquee_26s_linear_infinite] gap-4 px-6 [@media(prefers-reduced-motion:reduce)]:animate-none">
          {items.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="rounded-full border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-zinc-300"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
