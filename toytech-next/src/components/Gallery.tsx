"use client";

import React from "react";
import Image from "next/image";

const galleryContent = {
  ru: {
    label: "Наши работы",
    title: "Процесс в деталях",
    subtitle: "Взгляд изнутри на наш профессиональный подход",
    items: [
      {
        image: "/images/process_diag.png",
        title: "Компьютерная диагностика",
        desc: "Поиск скрытых ошибок в электронных системах.",
      },
      {
        image: "/images/process_repair.png",
        title: "Обслуживание ДВС",
        desc: "Капитальный ремонт, сервис и точная механика.",
      },
      {
        image: "/images/brands_collage.png",
        title: "Современные боксы",
        desc: "Рабочие зоны и оборудование для сложных ремонтов.",
      },
    ],
  },
  ro: {
    label: "Lucrarile noastre",
    title: "Procesul in detaliu",
    subtitle: "O privire din interior asupra modului in care lucram",
    items: [
      {
        image: "/images/process_diag.png",
        title: "Diagnoza computerizata",
        desc: "Cautam rapid erorile ascunse din sistemele electronice.",
      },
      {
        image: "/images/process_repair.png",
        title: "Service motor",
        desc: "Interventii mecanice serioase si intretinere corecta.",
      },
      {
        image: "/images/brands_collage.png",
        title: "Boxe moderne",
        desc: "Spatiu bine echipat pentru lucrari dificile si curate.",
      },
    ],
  },
  en: {
    label: "Our work",
    title: "The process in detail",
    subtitle: "A closer look at how we approach diagnostics and repair",
    items: [
      {
        image: "/images/process_diag.png",
        title: "Computer diagnostics",
        desc: "We track hidden faults across electronic and hybrid systems.",
      },
      {
        image: "/images/process_repair.png",
        title: "Engine service",
        desc: "Mechanical repair and maintenance handled with precision.",
      },
      {
        image: "/images/brands_collage.png",
        title: "Modern bays",
        desc: "Equipped workspaces for clean, efficient, professional service.",
      },
    ],
  },
} as const;

export default function Gallery({ locale }: { locale: string }) {
  const content = galleryContent[locale as keyof typeof galleryContent] ?? galleryContent.ro;

  return (
    <section id="gallery" className="bg-zinc-950 py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-600">
            {content.label}
          </div>
          <h2 className="text-4xl font-black text-white lg:text-5xl">{content.title}</h2>
          <p className="text-lg font-medium text-zinc-400">{content.subtitle}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {content.items.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900"
            >
              <div className="relative h-80">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/15 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 space-y-2 p-6">
                <h3 className="text-2xl font-black text-white">{item.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-zinc-300">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
