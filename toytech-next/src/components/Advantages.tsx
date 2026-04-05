"use client";

import React from "react";

const advantagesContent = {
  ru: {
    label: "Почему мы",
    title: "Преимущества ToyTech",
    subtitle: "То, что отличает нас от других автосервисов",
    items: [
      {
        number: "15",
        title: "Быстрая диагностика",
        desc: "Определяем проблему за 15 минут с помощью современного оборудования.",
      },
      {
        number: "100%",
        title: "Сертифицированные механики",
        desc: "Наши специалисты прошли обучение у официальных дилеров.",
      },
      {
        number: "All",
        title: "Все марки авто",
        desc: "Ремонтируем европейские, японские, корейские и американские авто.",
      },
      {
        number: "12",
        title: "Гарантия месяцев",
        desc: "Даём письменную гарантию на все виды работ и запчасти.",
      },
    ],
  },
  ro: {
    label: "De ce noi",
    title: "Avantajele ToyTech",
    subtitle: "Ce ne diferentiaza de alte service-uri auto",
    items: [
      {
        number: "15",
        title: "Diagnostic rapid",
        desc: "Identificam problema in aproximativ 15 minute cu echipamente moderne.",
      },
      {
        number: "100%",
        title: "Mecanici certificati",
        desc: "Specialistii nostri au pregatire serioasa si experienta reala pe hibride.",
      },
      {
        number: "All",
        title: "Toate marcile auto",
        desc: "Lucram cu masini europene, japoneze, coreene si americane.",
      },
      {
        number: "12",
        title: "Luni garantie",
        desc: "Oferim garantie scrisa pentru lucrarile efectuate si piesele montate.",
      },
    ],
  },
  en: {
    label: "Why us",
    title: "ToyTech Advantages",
    subtitle: "What sets us apart from other car services",
    items: [
      {
        number: "15",
        title: "Fast diagnostics",
        desc: "We identify the problem in about 15 minutes using modern diagnostic tools.",
      },
      {
        number: "100%",
        title: "Certified mechanics",
        desc: "Our specialists bring focused hybrid experience and strong technical training.",
      },
      {
        number: "All",
        title: "All car brands",
        desc: "We repair European, Japanese, Korean, and American vehicles.",
      },
      {
        number: "12",
        title: "Months warranty",
        desc: "We provide written warranty coverage for completed work and installed parts.",
      },
    ],
  },
} as const;

export default function Advantages({ locale }: { locale: string }) {
  const content =
    advantagesContent[locale as keyof typeof advantagesContent] ?? advantagesContent.ro;

  return (
    <section id="advantages" className="bg-zinc-950 py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-600">
            {content.label}
          </div>
          <h2 className="text-4xl font-black text-white lg:text-5xl">{content.title}</h2>
          <p className="text-lg font-medium text-zinc-400">{content.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.items.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50"
            >
              <div className="mb-4 text-5xl font-black leading-none text-red-600">
                {item.number}
              </div>
              <h3 className="mb-3 text-2xl font-black text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
