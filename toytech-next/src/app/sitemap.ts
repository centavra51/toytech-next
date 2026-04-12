import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "../lib/i18n";
import { getSiteContent } from "../lib/site-content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toytech.md";

// Static date: use env var set at build time, otherwise fall back to a fixed
// known-good date. This prevents Google from seeing every page as "modified"
// on every crawl, which would erode sitemap trust over time.
const LAST_MODIFIED =
  process.env.NEXT_PUBLIC_BUILD_DATE ?? "2026-04-12T00:00:00.000Z";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSiteContent();

  // Filter out placeholder / draft services (e.g. "new-service-13").
  // If a slug matches these patterns, the page likely doesn't exist yet and
  // will return a 404, which tells Google our sitemap is unreliable.
  const services = content.services.filter(
    (s) => !s.slug.startsWith("new-service-"),
  );

  const entries: MetadataRoute.Sitemap = [];

  // ── Home pages ────────────────────────────────────────────────────────────
  for (const locale of locales) {
    const languages: Record<string, string> = {};
    for (const l of locales) {
      languages[l] = `${BASE_URL}/${l}`;
    }
    // x-default points to the canonical / default-language home page
    languages["x-default"] = `${BASE_URL}/${defaultLocale}`;

    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: locale === defaultLocale ? 1.0 : 0.8,
      alternates: { languages },
    });
  }

  // ── Service pages ─────────────────────────────────────────────────────────
  for (const locale of locales) {
    for (const service of services) {
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[l] = `${BASE_URL}/${l}/services/${service.slug}`;
      }
      // x-default points to the default-locale version of each service page
      languages["x-default"] = `${BASE_URL}/${defaultLocale}/services/${service.slug}`;

      entries.push({
        url: `${BASE_URL}/${locale}/services/${service.slug}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
