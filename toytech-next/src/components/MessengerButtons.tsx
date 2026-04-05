"use client";

import React from "react";
import { MessageCircleMore } from "lucide-react";
import {
  toTelegramHref,
  toViberHref,
  toWhatsappHref,
} from "../lib/contact-links";

function TelegramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
    </svg>
  );
}

type MessengerButtonsProps = {
  phone: string;
  compact?: boolean;
};

export default function MessengerButtons({
  phone,
  compact = false,
}: MessengerButtonsProps) {
  const baseClass = compact
    ? "flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-red-600 hover:text-white"
    : "flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-red-600 hover:text-white";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={toTelegramHref(phone)} target="_blank" rel="noreferrer" className={baseClass} aria-label="Telegram">
        <TelegramIcon />
      </a>
      <a href={toWhatsappHref(phone)} target="_blank" rel="noreferrer" className={baseClass} aria-label="WhatsApp">
        <WhatsAppIcon />
      </a>
      <a href={toViberHref(phone)} target="_blank" rel="noreferrer" className={baseClass} aria-label="Viber">
        <MessageCircleMore className="h-5 w-5" />
      </a>
    </div>
  );
}
