export function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export function toTelHref(phone: string) {
  return `tel:${normalizePhone(phone)}`;
}

export function toWhatsappHref(phone: string) {
  const digits = normalizePhone(phone).replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export function toViberHref(phone: string) {
  return `viber://chat?number=${encodeURIComponent(normalizePhone(phone))}`;
}

export function toTelegramHref(phone: string) {
  return `https://t.me/${normalizePhone(phone)}`;
}
