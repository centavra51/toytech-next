"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

interface NavbarProps {
  locale: string;
  t: any;
}

export default function Navbar({ locale, t }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setIsLangOpen(false);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#about", label: t.nav.about },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#faq", label: t.nav.faq },
  ];

  const localeOptions = {
    ro: { flag: "https://flagcdn.com/ro.svg", name: "Romana" },
    ru: { flag: "https://flagcdn.com/ru.svg", name: "Русский" },
    en: { flag: "https://flagcdn.com/gb.svg", name: "English" },
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "h-20 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md"
          : "h-24 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        <Link href={`/${locale}`} className="relative h-12 w-40">
          <Image
            src="/logo_monolith.svg"
            alt="ToyTech"
            fill
            className="object-contain"
            priority
          />
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="relative">
            <button
              onClick={() => setIsLangOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold transition-all hover:border-red-600"
            >
              <img
                src={localeOptions[locale as keyof typeof localeOptions]?.flag}
                className="h-3.5 w-5 rounded-sm object-cover"
                alt={locale}
              />
              <span className="uppercase">{locale}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isLangOpen ? "rotate-180" : ""
                }`}
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
                      <img
                        src={localeOptions[key].flag}
                        className="h-3.5 w-5 rounded-sm object-cover"
                        alt={key}
                      />
                      {localeOptions[key].name}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>

          <a
            href={`tel:${t.common.phone}`}
            className="font-bold text-white transition-colors hover:text-red-500"
          >
            {t.common.phone}
          </a>

          <a
            href="#appointment-form"
            className="transform rounded-xl bg-red-600 px-6 py-2.5 font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:-translate-y-0.5 hover:bg-red-700"
          >
            {t.nav.book}
          </a>
        </div>

        <button
          className="p-2 text-white lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-zinc-950 transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute right-6 top-6 p-2 text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          <X className="h-8 w-8" />
        </button>

        <div className="relative mb-8 h-16 w-56">
          <Image src="/logo_monolith.svg" alt="ToyTech" fill className="object-contain" />
        </div>

        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-bold transition-colors hover:text-red-600"
          >
            {link.label}
          </a>
        ))}

        <div className="mt-4 flex gap-4">
          {(Object.keys(localeOptions) as Array<keyof typeof localeOptions>).map(
            (key) => (
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
            ),
          )}
        </div>

        <a
          href="#appointment-form"
          onClick={() => setIsMenuOpen(false)}
          className="mt-8 rounded-2xl bg-red-600 px-10 py-4 text-lg font-black text-white shadow-xl shadow-red-600/30"
        >
          {t.nav.book}
        </a>
      </div>
    </nav>
  );
}
