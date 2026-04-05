import { getTranslations, locales, type Locale, type Translation } from "./i18n";
import defaultServicesJson from "./services.json";
import { createSupabaseServerComponentClient, isSupabaseConfigured } from "./supabase/server";

export type ServiceDefinition = {
  id: string;
  slug: string;
  icon: string;
  image?: string;
};

export type SiteContent = {
  translations: Record<Locale, Translation>;
  services: ServiceDefinition[];
};

const defaultTranslations = Object.fromEntries(
  locales.map((locale) => [locale, getTranslations(locale)]),
) as Record<Locale, Translation>;

export const defaultSiteContent: SiteContent = {
  translations: defaultTranslations,
  services: defaultServicesJson as ServiceDefinition[],
};

function normalizeSiteContent(data: Partial<SiteContent> | null | undefined): SiteContent {
  const defaultServicesById = Object.fromEntries(
    defaultSiteContent.services.map((service) => [service.id, service]),
  ) as Record<string, ServiceDefinition>;

  return {
    translations: {
      ...defaultSiteContent.translations,
      ...(data?.translations ?? {}),
    } as Record<Locale, Translation>,
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
