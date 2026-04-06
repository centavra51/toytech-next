import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "../lib/i18n";
import { getSiteContent } from "../lib/site-content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toytech.md";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSiteContent();
  const services = content.services;
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [];

  // Home pages for each locale (default locale gets higher priority)
  for (const locale of locales) {
    const alternates: Record<string, string> = {};
    for (const l of locales) {
      alternates[l] = `${BASE_URL}/${l}`;
    }

    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === defaultLocale ? 1.0 : 0.8,
      alternates: {
        languages: alternates,
      },
    });
  }

  // Service pages for each locale
  for (const locale of locales) {
    for (const service of services) {
      const alternates: Record<string, string> = {};
      for (const l of locales) {
        alternates[l] = `${BASE_URL}/${l}/services/${service.slug}`;
      }

      entries.push({
        url: `${BASE_URL}/${locale}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return entries;
}
