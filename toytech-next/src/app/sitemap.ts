import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "../lib/i18n";
import servicesData from "../lib/services.json";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://toytech.md";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [];

  // Home pages for each locale (default locale gets higher priority)
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === defaultLocale ? 1.0 : 0.8,
    });
  }

  // Service pages for each locale
  for (const locale of locales) {
    for (const service of servicesData) {
      entries.push({
        url: `${BASE_URL}/${locale}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
