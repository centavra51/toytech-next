"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Facebook, Instagram, MapPin, Smartphone } from "lucide-react";
import type { Translation } from "../lib/i18n";
import { toTelHref } from "../lib/contact-links";

interface FooterProps {
  t: Translation;
  locale: string;
}

function TikTokIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.89-.23-2.74.24-.73.41-1.31 1.07-1.58 1.86-.2.55-.24 1.15-.11 1.72.11.7.54 1.34 1.09 1.81.55.47 1.25.73 1.96.73.5-.01.99-.11 1.45-.3 1.09-.45 1.93-1.46 2.13-2.6.06-.38.08-.75.08-1.14V.02z" />
    </svg>
  );
}

export default function Footer({ t, locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const advantagesLabel = {
    ru: "Преимущества",
    ro: "Avantaje",
    en: "Advantages",
  }[locale] ?? "Advantages";

  const topServices = [
    t.services.s1.title,
    t.services.s2.title,
    t.services.s3.title,
    t.services.s4.title,
  ];

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 pb-12 pt-24">
      <div className="mx-auto max-w-[1380px] px-6">
        <div className="mb-16 grid items-start gap-12 lg:grid-cols-[1.15fr_1fr_1fr_1.1fr]">
          <div className="space-y-8">
            <Link href={`/${locale}`} className="relative block h-24 w-80 overflow-hidden">
              <Image
                src="/logo_monolith.svg"
                alt="ToyTech"
                fill
                className="origin-left translate-y-[5px] scale-[1.32] object-contain object-left"
              />
            </Link>
            <p className="max-w-sm font-medium leading-relaxed text-zinc-500">
              {t.footer.brand_text}
            </p>
            <div className="flex gap-4">
              <a
                href={t.common.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:bg-red-600 hover:text-white"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href={t.common.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:bg-red-600 hover:text-white"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href={t.common.tiktok}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:bg-red-600 hover:text-white"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-black text-white">{t.footer.services}</h4>
            <ul className="space-y-4">
              {topServices.map((label) => (
                <li key={label}>
                  <Link
                    href={`/${locale}#services`}
                    className="font-medium text-zinc-500 transition-colors hover:text-red-500"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-black text-white">{t.footer.company}</h4>
            <ul className="space-y-4">
              <li>
                <Link href={`/${locale}#advantages`} className="font-medium text-zinc-500 transition-colors hover:text-red-500">
                  {advantagesLabel}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#about`} className="font-medium text-zinc-500 transition-colors hover:text-red-500">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#reviews`} className="font-medium text-zinc-500 transition-colors hover:text-red-500">
                  {t.nav.reviews}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#faq`} className="font-medium text-zinc-500 transition-colors hover:text-red-500">
                  {t.nav.faq}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#services`} className="font-medium text-zinc-500 transition-colors hover:text-red-500">
                  {t.nav.services}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-black text-white">{t.footer.contacts}</h4>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <MapPin className="h-6 w-6 flex-shrink-0 text-red-600" />
                <span className="font-medium leading-snug text-zinc-500">{t.common.address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Smartphone className="h-6 w-6 text-red-600" />
                <a href={toTelHref(t.common.phone)} className="text-lg font-black text-zinc-500 hover:text-white">
                  {t.common.phone}
                </a>
              </li>
              <li className="flex gap-4">
                <Clock className="h-6 w-6 flex-shrink-0 text-red-600" />
                <div className="text-sm font-medium text-zinc-500">
                  <div>{t.common.hoursWeekdays}</div>
                  <div>{t.common.hoursSaturday}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-12 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-zinc-600">
            В© {currentYear} {t.footer.company}. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
