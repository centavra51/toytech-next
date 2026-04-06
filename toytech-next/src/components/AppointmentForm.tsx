"use client";

import React, { useEffect, useState } from "react";
import { Calendar, CheckCircle2, Loader2, Phone, Send, User, Car } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Translation } from "../lib/i18n";
import type { ServiceDefinition } from "../lib/site-content";
import MessengerButtons from "./MessengerButtons";
import { toTelHref } from "../lib/contact-links";

interface AppointmentFormProps {
  t: Translation;
  services: ServiceDefinition[];
}

export default function AppointmentForm({ t, services }: AppointmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<number>(Date.now());
  const pathname = usePathname();

  useEffect(() => {
    setStartedAt(Date.now());
  }, [pathname]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      car: String(formData.get("car") || "").trim(),
      date: String(formData.get("date") || "").trim(),
      service: String(formData.get("service") || "").trim(),
      website: String(formData.get("website") || "").trim(),
      startedAt,
      page: pathname,
    };

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Request failed");
      }

      setSubmitted(true);
      event.currentTarget.reset();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Request failed",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-3xl font-black uppercase tracking-tighter text-white">
          {t.form.successTitle}
        </h3>
        <p className="font-medium leading-relaxed text-zinc-400">
          {t.form.successText}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-black uppercase tracking-widest text-red-600 transition-colors hover:text-red-500"
        >
          {t.form.reset}
        </button>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900 p-8 shadow-3xl shadow-red-600/5 lg:p-12">
      <div className="absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-red-600/5 blur-[80px] transition-all duration-500 group-hover:bg-red-600/10" />

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <input
          type="text"
          aria-label="Full Name"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="mb-8 space-y-2">
          <h3 className="text-3xl font-black tracking-tighter text-white">
            {t.form.title}
          </h3>
          <p className="font-medium text-zinc-400">{t.form.subtitle}</p>
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href={toTelHref(t.common.phone)}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-bold text-zinc-200 transition-colors hover:border-red-600 hover:text-white"
            >
              <Phone className="h-4 w-4 text-red-500" />
              {t.common.phone}
            </a>
            <a
              href="tel:+37368187882"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-bold text-zinc-200 transition-colors hover:border-red-600 hover:text-white"
            >
              <Phone className="h-4 w-4 text-red-500" />
              +37368187882
            </a>
            <MessengerButtons phone={t.common.phone} compact />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="appt-name" className="ml-1 text-xs font-black uppercase tracking-widest text-zinc-300">
              {t.form.nameLabel}
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
              <input
                id="appt-name"
                required
                name="name"
                type="text"
                placeholder={t.form.namePlaceholder}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-4 pl-12 pr-4 font-medium text-white placeholder:text-zinc-700 focus:border-red-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="appt-phone" className="ml-1 text-xs font-black uppercase tracking-widest text-zinc-300">
              {t.form.phoneLabel}
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
              <input
                id="appt-phone"
                required
                name="phone"
                type="tel"
                placeholder={t.form.phonePlaceholder}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-4 pl-12 pr-4 font-medium text-white placeholder:text-zinc-700 focus:border-red-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="appt-car" className="ml-1 text-xs font-black uppercase tracking-widest text-zinc-300">
              {t.form.carLabel}
            </label>
            <div className="relative">
              <Car className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
              <input
                id="appt-car"
                name="car"
                type="text"
                placeholder={t.form.carPlaceholder}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-4 pl-12 pr-4 font-medium text-white placeholder:text-zinc-700 focus:border-red-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="appt-date" className="ml-1 text-xs font-black uppercase tracking-widest text-zinc-300">
              {t.form.dateLabel}
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
              <input
                id="appt-date"
                name="date"
                type="date"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-4 pl-12 pr-4 font-medium text-white focus:border-red-600 focus:outline-none [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="appt-service" className="ml-1 text-xs font-black uppercase tracking-widest text-zinc-300">
            {t.form.serviceLabel}
          </label>
          <select
            id="appt-service"
            name="service"
            defaultValue=""
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-4 font-medium text-white focus:border-red-600 focus:outline-none"
          >
            <option value="" disabled>
              {t.form.servicePlaceholder}
            </option>
            {services.map((service) => (
              <option
                key={service.slug}
                value={
                  (
                    t.services[
                      service.id as keyof typeof t.services
                    ] as typeof t.services.s1
                  ).title
                }
              >
                {
                  (
                    t.services[
                      service.id as keyof typeof t.services
                    ] as typeof t.services.s1
                  ).title
                }
              </option>
            ))}
          </select>
        </div>

        <button
          disabled={loading}
          type="submit"
          aria-label={loading ? "Submitting appointment form" : "Submit appointment form"}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 py-5 text-xl font-black text-white transition-all hover:bg-red-700 disabled:bg-zinc-800"
        >
          {loading ? (
            <>
              <Loader2 className="h-7 w-7 animate-spin" />
              <span>{t.form.submitting}</span>
            </>
          ) : (
            <>
              <Send className="h-6 w-6" />
              <span>{t.form.submit}</span>
            </>
          )}
        </button>

        {error && <p className="text-center text-sm font-medium text-red-400">{error}</p>}

        <p className="px-10 text-center text-xs font-bold leading-relaxed text-zinc-400">
          {t.form.privacy}
        </p>
      </form>
    </div>
  );
}
