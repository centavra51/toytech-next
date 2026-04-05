"use client";

import React from "react";

const processContent = {
  ru: {
    label: "Как мы работаем",
    title: "Путь к исправному авто",
    subtitle: "Прозрачность и качество на каждом этапе ремонта",
    steps: [
      {
        number: "01",
        title: "Диагностика",
        desc: "Тщательно проверяем все узлы и выявляем реальные причины неисправности.",
      },
      {
        number: "02",
        title: "Расчёт и сроки",
        desc: "Согласовываем стоимость работ и запчастей до начала ремонта.",
      },
      {
        number: "03",
        title: "Ремонт",
        desc: "Профессионально выполняем работы с использованием современного оборудования.",
      },
      {
        number: "04",
        title: "Готово",
        desc: "Тестируем автомобиль и выдаём его вместе с гарантией на выполненные работы.",
      },
    ],
  },
  ro: {
    label: "Cum lucram",
    title: "Drumul spre o masina functionala",
    subtitle: "Transparenta si calitate la fiecare etapa",
    steps: [
      {
        number: "01",
        title: "Diagnostic",
        desc: "Verificam atent masina si gasim cauza reala a defectiunii.",
      },
      {
        number: "02",
        title: "Estimare si termen",
        desc: "Confirmam costul si durata lucrarii inainte sa incepem reparatia.",
      },
      {
        number: "03",
        title: "Reparatie",
        desc: "Executam lucrarea profesionist, cu echipamente si proceduri moderne.",
      },
      {
        number: "04",
        title: "Predare",
        desc: "Testam masina si o predam impreuna cu explicatii clare si garantie.",
      },
    ],
  },
  en: {
    label: "How we work",
    title: "The path to a healthy car",
    subtitle: "Transparency and quality at every repair stage",
    steps: [
      {
        number: "01",
        title: "Diagnostics",
        desc: "We inspect the vehicle carefully and identify the real source of the issue.",
      },
      {
        number: "02",
        title: "Estimate and timing",
        desc: "We confirm the repair scope, cost, and timeline before work begins.",
      },
      {
        number: "03",
        title: "Repair",
        desc: "We perform the work professionally using modern tools and proven methods.",
      },
      {
        number: "04",
        title: "Delivery",
        desc: "We test the car and return it with clear notes and warranty coverage.",
      },
    ],
  },
} as const;

export default function ProcessSteps({ locale }: { locale: string }) {
  const content =
    processContent[locale as keyof typeof processContent] ?? processContent.ro;

  return (
    <section id="process" className="bg-zinc-900/40 py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-600">
            {content.label}
          </div>
          <h2 className="text-4xl font-black text-white lg:text-5xl">{content.title}</h2>
          <p className="text-lg font-medium text-zinc-400">{content.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.steps.map((step) => (
            <div
              key={step.number}
              className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8"
            >
              <div className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-red-500">
                {step.number}
              </div>
              <h3 className="mb-3 text-2xl font-black text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
