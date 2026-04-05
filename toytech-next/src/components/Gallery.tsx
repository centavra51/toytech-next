"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, Facebook, Instagram, Music2, Play } from "lucide-react";

type GalleryProps = {
  locale: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
};

const galleryContent = {
  ru: {
    label: "Наши работы",
    title: "Процесс в деталях",
    subtitle: "Взгляд изнутри на наш профессиональный подход",
    expand: "Смотреть все работы",
    collapse: "Скрыть работы",
    socialTitle: "Больше работ в наших соцсетях",
    socialSubtitle:
      "Откройте подборку реальных кейсов, коротких видео и свежих работ ToyTech в Instagram, TikTok и Facebook.",
    items: [
      {
        image: "/images/process_repair.webp",
        title: "Компьютерная диагностика",
        desc: "Поиск скрытых ошибок в электронных системах и точное выявление неисправностей.",
      },
      {
        image: "/images/Motor_si_mecanica.webp",
        title: "Обслуживание ДВС",
        desc: "Капитальный ремонт, сервис и точная механика для сложных случаев.",
      },
      {
        image: "/images/master.webp",
        title: "Современные боксы",
        desc: "Рабочие зоны и оборудование для сложных ремонтов без лишней суеты.",
      },
    ],
    socialCards: [
      {
        key: "instagram",
        image: "/images/process_repair.webp",
        title: "Instagram",
        desc: "Фото до и после, процессы ремонта и свежие проекты сервиса.",
        action: "Открыть Instagram",
      },
      {
        key: "tiktok",
        image: "/images/master.webp",
        title: "TikTok",
        desc: "Короткие ролики, реальные ремонты и живой контент из сервиса.",
        action: "Смотреть TikTok",
      },
      {
        key: "facebook",
        image: "/images/suspension.webp",
        title: "Facebook",
        desc: "Новости сервиса, кейсы клиентов и обновления по услугам.",
        action: "Открыть Facebook",
      },
    ],
  },
  ro: {
    label: "Lucrarile noastre",
    title: "Procesul in detaliu",
    subtitle: "O privire din interior asupra modului in care lucram",
    expand: "Vezi toate lucrarile",
    collapse: "Ascunde lucrarile",
    socialTitle: "Mai multe lucrari in retelele noastre",
    socialSubtitle:
      "Deschide exemple reale, clipuri scurte si lucrari recente ToyTech pe Instagram, TikTok si Facebook.",
    items: [
      {
        image: "/images/process_repair.webp",
        title: "Diagnoza computerizata",
        desc: "Cautam rapid erorile ascunse din sistemele electronice.",
      },
      {
        image: "/images/Motor_si_mecanica.webp",
        title: "Service motor",
        desc: "Interventii mecanice serioase si intretinere corecta.",
      },
      {
        image: "/images/master.webp",
        title: "Boxe moderne",
        desc: "Spatiu bine echipat pentru lucrari dificile si curate.",
      },
    ],
    socialCards: [
      {
        key: "instagram",
        image: "/images/process_repair.webp",
        title: "Instagram",
        desc: "Poze before/after, procese de reparatie si proiecte recente din service.",
        action: "Deschide Instagram",
      },
      {
        key: "tiktok",
        image: "/images/master.webp",
        title: "TikTok",
        desc: "Clipuri scurte, reparatii reale si continut din atelier.",
        action: "Vezi TikTok",
      },
      {
        key: "facebook",
        image: "/images/suspension.webp",
        title: "Facebook",
        desc: "Noutati, cazuri rezolvate si actualizari despre servicii.",
        action: "Deschide Facebook",
      },
    ],
  },
  en: {
    label: "Our work",
    title: "The process in detail",
    subtitle: "A closer look at how we approach diagnostics and repair",
    expand: "See all work",
    collapse: "Hide work",
    socialTitle: "More real work on our social channels",
    socialSubtitle:
      "Open a curated selection of real cases, short videos, and fresh ToyTech jobs on Instagram, TikTok, and Facebook.",
    items: [
      {
        image: "/images/process_repair.webp",
        title: "Computer diagnostics",
        desc: "We track hidden faults across electronic and hybrid systems.",
      },
      {
        image: "/images/Motor_si_mecanica.webp",
        title: "Engine service",
        desc: "Mechanical repair and maintenance handled with precision.",
      },
      {
        image: "/images/master.webp",
        title: "Modern bays",
        desc: "Equipped workspaces for clean, efficient, professional service.",
      },
    ],
    socialCards: [
      {
        key: "instagram",
        image: "/images/process_repair.webp",
        title: "Instagram",
        desc: "Before-and-after photos, repair stories, and recent workshop projects.",
        action: "Open Instagram",
      },
      {
        key: "tiktok",
        image: "/images/master.webp",
        title: "TikTok",
        desc: "Short videos, real repairs, and behind-the-scenes service content.",
        action: "Watch TikTok",
      },
      {
        key: "facebook",
        image: "/images/suspension.webp",
        title: "Facebook",
        desc: "Service updates, customer cases, and the latest workshop news.",
        action: "Open Facebook",
      },
    ],
  },
} as const;

const socialIconMap = {
  instagram: Instagram,
  tiktok: Music2,
  facebook: Facebook,
} as const;

export default function Gallery({ locale, socialLinks }: GalleryProps) {
  const content = galleryContent[locale as keyof typeof galleryContent] ?? galleryContent.ro;
  const [showSocials, setShowSocials] = useState(true);

  return (
    <section id="gallery" className="bg-zinc-950 py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-600">
            {content.label}
          </div>
          <h2 className="text-4xl font-black text-white lg:text-5xl">{content.title}</h2>
          <p className="text-lg font-medium text-zinc-300">{content.subtitle}</p>
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowSocials((prev) => !prev)}
            className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 px-8 py-4 text-center text-base font-black text-white shadow-xl transition-all hover:-translate-y-0.5 hover:border-red-600 hover:shadow-red-600/15 sm:text-lg"
          >
            {showSocials ? content.collapse : content.expand}
          </button>
        </div>

        {showSocials && (
          <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
            <div className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
              <h3 className="text-3xl font-black text-white sm:text-4xl">
                {content.socialTitle}
              </h3>
              <p className="text-base font-medium leading-relaxed text-zinc-400 sm:text-lg">
                {content.socialSubtitle}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {content.socialCards.map((card) => {
                const Icon = socialIconMap[card.key];
                const href = socialLinks[card.key];

                return (
                  <a
                    key={card.key}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/10"
                  >
                    <div className="relative h-80">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-zinc-950/5" />
                      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                        <Icon className="h-4 w-4 text-red-500" />
                        {card.title}
                      </div>
                      <div className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-600">
                        <Play className="ml-1 h-6 w-6 fill-current" />
                      </div>
                    </div>

                    <div className="space-y-4 p-6">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-black text-white">{card.title}</h4>
                        <p className="text-sm font-medium leading-relaxed text-zinc-400">
                          {card.desc}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-red-500 transition-all group-hover:gap-3">
                        {card.action}
                        <ExternalLink className="h-4 w-4" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
