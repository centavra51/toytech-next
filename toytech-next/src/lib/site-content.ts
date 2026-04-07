import { getTranslations, locales, type Locale, type Translation } from "./i18n";
import defaultServicesJson from "./services.json";
import { applyServiceCatalog } from "./service-catalog";
import { createSupabaseServerComponentClient, isSupabaseConfigured } from "./supabase/server";

export type ServiceDefinition = {
  id: string;
  slug: string;
  icon: string;
  image?: string;
  imageAlt?: string;
};

export type SiteContent = {
  translations: Record<Locale, Translation>;
  services: ServiceDefinition[];
};

const defaultTranslations = applyServiceCatalog(
  Object.fromEntries(locales.map((locale) => [locale, getTranslations(locale)])) as Record<
    Locale,
    Translation
  >,
);

export const defaultSiteContent: SiteContent = {
  translations: defaultTranslations,
  services: defaultServicesJson as ServiceDefinition[],
};

function normalizeSiteContent(data: Partial<SiteContent> | null | undefined): SiteContent {
  const defaultServicesById = Object.fromEntries(
    defaultSiteContent.services.map((service) => [service.id, service]),
  ) as Record<string, ServiceDefinition>;

  // Deeply merge translations for each locale
  const mergedTranslations = { ...defaultSiteContent.translations };
  if (data?.translations) {
    for (const locale of locales) {
      if (data.translations[locale]) {
        mergedTranslations[locale] = {
          ...defaultSiteContent.translations[locale],
          ...data.translations[locale],
          // Ensure nested objects like footer and privacy are also merged if needed
          footer: {
            ...defaultSiteContent.translations[locale].footer,
            ...data.translations[locale].footer,
          },
          privacy: data.translations[locale].privacy ?? defaultSiteContent.translations[locale].privacy,
        };
      }
    }
  }

  return {
    translations: applyServiceCatalog(mergedTranslations),
    services: Array.isArray(data?.services) && data.services.length > 0
      ? (data.services as ServiceDefinition[]).map((service) => ({
          ...defaultServicesById[service.id],
          ...service,
        }))
      : defaultSiteContent.services,
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured()) {
    return defaultSiteContent;
  }

  try {
    const supabase = await createSupabaseServerComponentClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("translations, services")
      .eq("id", "site")
      .maybeSingle();

    if (error || !data) {
      return defaultSiteContent;
    }

    return normalizeSiteContent(data as Partial<SiteContent>);
  } catch {
    return defaultSiteContent;
  }
}

export async function getLocaleContent(locale: string): Promise<Translation> {
  const content = await getSiteContent();
  return content.translations[locale as Locale] ?? content.translations.ro;
}
