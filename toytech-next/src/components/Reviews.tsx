"use client";

import React from 'react';
import { ExternalLink, Quote, Star } from 'lucide-react';
import type { Translation } from "../lib/i18n";

interface ReviewsProps {
  t: Translation;
}

const googleReviewsUrl =
  "https://www.google.com/search?q=+%D0%BA%D0%B8%D1%88%D0%B8%D0%BD%D0%B5%D0%B2+%D1%80%D0%B5%D0%BC%D0%BE%D0%BD%D1%82+%D0%B3%D0%B8%D0%B1%D1%80%D0%B8%D0%B4%D0%BE%D0%B2+%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D0%B5%D0%B9+%D0%BA%D0%B8%D1%88%D0%B8%D0%BD%D0%B5%D0%B2+%D0%B3%D1%80%D0%B5%D0%BD%D0%BE%D0%B1%D0%BB%D1%8F+7&rlz=1C1GCEA_enMD1208MD1208&biw=1536&bih=756&sca_esv=961d7d2aee6e1575&sxsrf=ANbL-n4pbYQziW7uwCrvD_aWXPGshNc6qA%3A1775401637070&ei=pXrSacyABJ-vi-gPmvOc6AQ&ved=0ahUKEwiM56S__taTAxWf1wIHHZo5B00Q4dUDCBE&uact=5&oq=+%D0%BA%D0%B8%D1%88%D0%B8%D0%BD%D0%B5%D0%B2+%D1%80%D0%B5%D0%BC%D0%BE%D0%BD%D1%82+%D0%B3%D0%B8%D0%B1%D1%80%D0%B8%D0%B4%D0%BE%D0%B2+%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D0%B5%D0%B9+%D0%BA%D0%B8%D1%88%D0%B8%D0%BD%D0%B5%D0%B2+%D0%B3%D1%80%D0%B5%D0%BD%D0%BE%D0%B1%D0%BB%D1%8F+7&gs_lp=Egxnd3Mtd2l6LXNlcnAiZiDQutC40YjQuNC90LXQsiDRgNC10LzQvtC90YIg0LPQuNCx0YDQuNC00L7QsiDQsNCy0YLQvtC80L7QsdC40LvQtdC5INC60LjRiNC40L3QtdCyINCz0YDQtdC90L7QsdC70Y8gNzIIEAAYgAQYogQyBRAAGO8FMggQABiABBiiBDIIEAAYiQUYogRIswRQAFgAcAB4AJABAJgBdKABdKoBAzAuMbgBA8gBAPgBAZgCAaACeJgDAJIHAzAuMaAH8gOyBwMwLjG4B3jCBwMyLTHIBwOACAE&sclient=gws-wiz-serp#";

function getExtraReviews(t: Translation) {
  const isRomanian = t.nav.services === "Servicii";
  const isEnglish = t.nav.services === "Services";

  if (isEnglish) {
    return [
      {
        text: "I recommend this service to everyone. Very good service, fair prices for any car repair. I had a battery issue on a Toyota Prius, and the owner was very responsive. They solved it literally within half a day.",
        author: "Ilya Konev",
        car: "Google Reviews",
        rating: 5,
      },
      {
        text: "Good quality. Respectful attitude. Everything is open and honest. I recommend them.",
        author: "Andrei",
        car: "Google Reviews",
        rating: 5,
      },
    ];
  }

  if (isRomanian) {
    return [
      {
        text: "Recomand tuturor, service-ul este foarte bun, preturile sunt corecte pentru orice reparatie auto. Am avut o problema la bateria unui Toyota Prius, iar proprietarul service-ului a fost foarte receptiv. Au rezolvat cazul literalmente in jumatate de zi.",
        author: "Ilya Konev",
        car: "Google Reviews",
        rating: 5,
      },
      {
        text: "Calitate buna. Atitudine respectuoasa. Totul este deschis si fara inselatorii. Recomand.",
        author: "Andrei",
        car: "Google Reviews",
        rating: 5,
      },
    ];
  }

  return [
    {
      text: "Советую всем, сервис очень хороший, цены адекватные на любой ремонт автомобиля. Была проблема с батарейкой на Toyota Prius, владелец автосервиса очень отзывчивый парень, решили вопрос буквально за полдня.",
      author: "Илья Конев",
      car: "Google Reviews",
      rating: 5,
    },
    {
      text: "Хорошее качество. Уважительное отношение. Всё открыто и без обмана. Рекомендую.",
      author: "Andrei",
      car: "Google Reviews",
      rating: 5,
    },
  ];
}

function getMoreReviewsLabel(t: Translation) {
  if (t.nav.services === "Servicii") {
    return "Vezi mai multe recenzii";
  }

  if (t.nav.services === "Services") {
    return "See more reviews";
  }

  return "Смотреть ещё отзывы";
}

export default function Reviews({ t }: ReviewsProps) {
  const reviews = Object.entries(t.reviews)
    .filter(([key, value]) => /^r\d+$/.test(key) && typeof value === "object" && value !== null)
    .sort(([left], [right]) => Number(left.slice(1)) - Number(right.slice(1)))
    .map(([, value]) => ({
      ...(value as { text: string; author: string; car: string }),
      rating: 5,
    }));
  const allReviews = [...reviews, ...getExtraReviews(t)];

  return (
    <section id="reviews" className="py-24 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-xs font-bold uppercase tracking-widest">
            {t.reviews.label}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white">{t.reviews.title}</h2>
          <p className="text-lg text-zinc-300 font-medium">{t.reviews.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {allReviews.map((r, i) => (
            <div key={i} className="relative p-10 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] hover:border-zinc-700 transition-all group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 transform translate-x-4 translate-y-[-4] rotate-[-20deg] opacity-[0.05] group-hover:opacity-[0.1] transition-all group-hover:scale-110 pointer-events-none">
                <Quote className="w-48 h-48" />
              </div>
              
              <div className="relative space-y-6">
                <div role="img" className="flex gap-1" aria-label={`${r.rating} star rating`}>
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" aria-hidden="true" />
                  ))}
                </div>
                
                <p className="text-xl font-medium text-zinc-100 leading-relaxed italic">
                  {r.text}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-red-600 text-xl uppercase">
                     {r.author?.[0] ?? "T"}
                  </div>
                  <div>
                    <div className="font-black text-white">{r.author}</div>
                    <div className="text-zinc-400 text-sm font-bold uppercase tracking-wide">{r.car}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 px-8 py-4 text-center text-base font-black text-white shadow-xl transition-all hover:-translate-y-0.5 hover:border-red-600 hover:shadow-red-600/15 sm:text-lg"
            aria-label="View all reviews on Google"
          >
            <span>{getMoreReviewsLabel(t)}</span>
            <ExternalLink className="h-5 w-5 text-red-500" />
          </a>
        </div>
      </div>
    </section>
  );
}
