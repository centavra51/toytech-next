"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import type { Translation } from "../lib/i18n";
import { toTelHref } from "../lib/contact-links";

interface NavbarProps {
  locale: string;
  t: Translation;
}

const logoWrapClass = "relative block h-24 w-80 overflow-hidden";
const logoImageClass =
  "origin-left translate-y-[5px] scale-[1.32] object-contain object-left";

export default function Navbar({ locale, t }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 16); // ~60fps
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setIsLangOpen(false);
    setIsMenuOpen(false);
  };

  const advantagesLabel = {
    ru: "Преимущества",
    ro: "Avantaje",
    en: "Advantages",
  }[locale] ?? "Advantages";

  const navLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#advantages", label: advantagesLabel },
    { href: "#about", label: t.nav.about },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#faq", label: t.nav.faq },
  ];

  const isServicePage = pathname.includes("/services/");
  const resolveNavHref = (href: string) =>
    isServicePage ? `/${locale}${href}` : href;

  const localeOptions = {
    ro: { flag: "🇷🇴", name: "Romana" },
    ru: { flag: "🇷🇺", name: "Русский" },
    en: { flag: "🇬🇧", name: "English" },
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b border-zinc-900/80 transition-all duration-300 ${
        isScrolled ? "bg-zinc-950/95 backdrop-blur-md" : "bg-zinc-950/88 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1380px] items-center justify-between gap-4 px-4 sm:px-5 lg:grid lg:h-24 lg:grid-cols-[auto_1fr_auto] lg:gap-8 lg:px-6">
        <Link href={`/${locale}`} className={`${logoWrapClass} hidden lg:block`}>
          <Image
            src="/logo_monolith.png"
            alt="ToyTech"
            fill
            className={logoImageClass}
            priority
            sizes="(max-width: 1024px) 240px, 320px"
            quality={85}
          />
        </Link>

        <div className="hidden min-w-0 items-center justify-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={resolveNavHref(link.href)}
              className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.08em] text-zinc-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center justify-end gap-4 lg:flex xl:gap-5">
          <div className="relative shrink-0">
            <button
              onClick={() => setIsLangOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-red-600"
            >
              <span className="text-lg">
                {localeOptions[locale as keyof typeof localeOptions]?.flag}
              </span>
              <span className="uppercase">{locale}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-1 shadow-2xl">
                {(Object.keys(localeOptions) as Array<keyof typeof localeOptions>).map(
                  (key) => (
                    <button
                      key={key}
                      onClick={() => changeLanguage(key)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        locale === key
                          ? "bg-red-500/10 text-red-500"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      <span className="text-lg">{localeOptions[key].flag}</span>
                      {localeOptions[key].name}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>

          <a
            href={toTelHref(t.common.phone)}
            className="shrink-0 whitespace-nowrap text-xl font-black text-white transition-colors hover:text-red-500"
          >
            {t.common.phone}
          </a>

          <a
            href={resolveNavHref("#appointment-form")}
            className="shrink-0 rounded-2xl bg-red-600 px-8 py-3 font-black text-white shadow-lg shadow-red-600/20 transition-all hover:-translate-y-0.5 hover:bg-red-700"
          >
            {t.nav.book}
          </a>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-3 lg:hidden">
          <Link href={`/${locale}`} className="relative block h-16 w-52 flex-none overflow-hidden sm:h-[4.25rem] sm:w-60">
            <Image
              src="/logo_monolith.png"
              alt="ToyTech"
              fill
              className="origin-left translate-y-[4px] scale-[1.2] object-contain object-left sm:scale-[1.24]"
              priority
              sizes="(max-width: 480px) 208px, 240px"
              quality={85}
            />
          </Link>

          <button
            className="mr-1 flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-white transition-colors hover:border-red-600"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`fixed left-0 right-0 bottom-0 top-20 z-[60] flex flex-col items-center justify-center gap-8 bg-black px-6 transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative mb-6 h-20 w-72 overflow-hidden">
          <Image
            src="/logo_monolith.png"
            alt="ToyTech"
            fill
            className="origin-left translate-y-[5px] scale-[1.28] object-contain object-left"
            sizes="(max-width: 576px) 288px, 320px"
            quality={85}
          />
        </div>

        {navLinks.map((link) => (
          <a
            key={link.href}
            href={resolveNavHref(link.href)}
            onClick={() => setIsMenuOpen(false)}
            className="text-center text-2xl font-bold transition-colors hover:text-red-600"
          >
            {link.label}
          </a>
        ))}

        <a
          href={toTelHref(t.common.phone)}
          className="text-xl font-black text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          {t.common.phone}
        </a>

        <div className="mt-2 flex gap-4">
          {(Object.keys(localeOptions) as Array<keyof typeof localeOptions>).map((key) => (
            <button
              key={key}
              onClick={() => changeLanguage(key)}
              className={`rounded-full border px-5 py-2.5 font-bold transition-all ${
                locale === key
                  ? "border-red-600 bg-red-600/5 text-red-600"
                  : "border-zinc-800 text-zinc-400"
              }`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>

        <a
          href={resolveNavHref("#appointment-form")}
          onClick={() => setIsMenuOpen(false)}
          className="mt-4 rounded-2xl bg-red-600 px-10 py-4 text-lg font-black text-white shadow-xl shadow-red-600/30"
        >
          {t.nav.book}
        </a>
      </div>
    </nav>
  );
}
