"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Facebook, Instagram, Mail, MapPin, Smartphone } from "lucide-react";
import type { Translation } from "../lib/i18n";

interface FooterProps {
  t: Translation;
  locale: string;
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
      <div className="container mx-auto px-6">
        <div className="mb-16 grid gap-12 px-6 lg:grid-cols-4">
          <div className="col-span-2 space-y-8 lg:col-span-1">
            <Link href={`/${locale}`} className="relative block h-20 w-72">
              <Image src="/logo_monolith.svg" alt="ToyTech" fill className="object-contain" />
            </Link>
            <p className="max-w-xs font-medium leading-relaxed text-zinc-500">
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
                href={`mailto:${t.common.email}`}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:bg-red-600 hover:text-white"
              >
                <Mail className="h-6 w-6" />
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
                <span className="font-medium leading-snug text-zinc-500">
                  {t.common.address}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Smartphone className="h-6 w-6 text-red-600" />
                <span className="text-lg font-black text-zinc-500">{t.common.phone}</span>
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
            © {currentYear} {t.footer.company}. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
