"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Save,
  Globe2,
  Wrench,
  Loader2,
  ShieldCheck,
  Plus,
  Trash2,
  MessageSquareQuote,
  CircleHelp,
  ChevronDown,
  ArrowUp,
  LayoutGrid,
} from "lucide-react";
import type { Locale, Translation } from "../../lib/i18n";
import { locales } from "../../lib/i18n";
import type { ServiceDefinition, SiteContent } from "../../lib/site-content";
import { LogoutButton } from "./LogoutButton";
import { ImageUpload } from "./ImageUpload";

type TextFieldConfig = {
  path: string;
  label: string;
  multiline?: boolean;
};

type ReviewEntry = {
  text: string;
  author: string;
  car: string;
};

type TranslationRecord = Record<string, unknown>;

const sectionGroups: Array<{ title: string; fields: TextFieldConfig[] }> = [
  {
    title: "Common",
    fields: [
      { path: "common.title", label: "Site title" },
      { path: "common.phone", label: "Phone" },
      { path: "common.address", label: "Address", multiline: true },
      { path: "common.email", label: "Email" },
      { path: "common.hoursWeekdays", label: "Weekday hours" },
      { path: "common.hoursSaturday", label: "Saturday hours" },
      { path: "common.instagram", label: "Instagram URL" },
      { path: "common.facebook", label: "Facebook URL" },
      { path: "common.tiktok", label: "TikTok URL" },
    ],
  },
  {
    title: "Navigation and hero",
    fields: [
      { path: "nav.services", label: "Nav services" },
      { path: "nav.about", label: "Nav about" },
      { path: "nav.reviews", label: "Nav reviews" },
      { path: "nav.faq", label: "Nav FAQ" },
      { path: "nav.book", label: "Nav CTA" },
      { path: "hero.title", label: "Hero title", multiline: true },
      { path: "hero.subtitle", label: "Hero subtitle", multiline: true },
      { path: "hero.cta_book", label: "Hero book CTA" },
      { path: "hero.cta_call", label: "Hero call CTA" },
      { path: "hero.stat_experience", label: "Hero stat: experience" },
      { path: "hero.stat_repairs", label: "Hero stat: repairs" },
      { path: "hero.stat_diagnosis", label: "Hero stat: diagnostics" },
      { path: "hero.badge", label: "Hero badge" },
      { path: "hero.price", label: "Hero price" },
      { path: "hero.price_text", label: "Hero price note" },
    ],
  },
  {
    title: "About and CTA",
    fields: [
      { path: "about.label", label: "About label" },
      { path: "about.title", label: "About title", multiline: true },
      { path: "about.desc", label: "About text", multiline: true },
      { path: "about.f1", label: "Feature 1" },
      { path: "about.f2", label: "Feature 2" },
      { path: "about.f3", label: "Feature 3" },
      { path: "about.f4", label: "Feature 4" },
      { path: "about.f5", label: "Feature 5" },
      { path: "about.f6", label: "Feature 6" },
      { path: "about.call_btn", label: "About call button" },
      { path: "about.since", label: "About badge" },
      { path: "cta.title", label: "CTA title", multiline: true },
      { path: "cta.subtitle", label: "CTA subtitle", multiline: true },
      { path: "cta.btn_call", label: "CTA call button" },
      { path: "cta.btn_book", label: "CTA book button" },
    ],
  },
  {
    title: "Reviews and FAQ",
    fields: [
      { path: "reviews.label", label: "Reviews label" },
      { path: "reviews.title", label: "Reviews title" },
      { path: "reviews.subtitle", label: "Reviews subtitle", multiline: true },
      { path: "faq.label", label: "FAQ label" },
      { path: "faq.title", label: "FAQ title" },
      { path: "faq.subtitle", label: "FAQ subtitle", multiline: true },
    ],
  },
  {
    title: "Footer and forms",
    fields: [
      { path: "footer.brand_text", label: "Footer brand text", multiline: true },
      { path: "footer.services", label: "Footer services title" },
      { path: "footer.company", label: "Footer company title" },
      { path: "footer.contacts", label: "Footer contacts title" },
      { path: "footer.copyright", label: "Footer copyright" },
      { path: "form.title", label: "Form title" },
      { path: "form.subtitle", label: "Form subtitle", multiline: true },
      { path: "form.nameLabel", label: "Form name label" },
      { path: "form.namePlaceholder", label: "Form name placeholder" },
      { path: "form.phoneLabel", label: "Form phone label" },
      { path: "form.phonePlaceholder", label: "Form phone placeholder" },
      { path: "form.carLabel", label: "Form car label" },
      { path: "form.carPlaceholder", label: "Form car placeholder" },
      { path: "form.dateLabel", label: "Form date label" },
      { path: "form.serviceLabel", label: "Form service label" },
      { path: "form.servicePlaceholder", label: "Form service placeholder" },
      { path: "form.submit", label: "Form submit button" },
      { path: "form.submitting", label: "Form loading state" },
      { path: "form.privacy", label: "Form privacy note", multiline: true },
      { path: "form.successTitle", label: "Form success title" },
      { path: "form.successText", label: "Form success text", multiline: true },
      { path: "form.reset", label: "Form reset button" },
      { path: "servicePage.back", label: "Service page back button" },
      { path: "servicePage.why", label: "Service page why title" },
      { path: "servicePage.notFound", label: "Service page not found" },
    ],
  },
];

function getValue(obj: unknown, path: string) {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }

    return "";
  }, obj);
}

function setValue<T>(obj: T, path: string, value: unknown): T {
  const clone = structuredClone(obj);
  const parts = path.split(".");
  let cursor: Record<string, unknown> = clone as Record<string, unknown>;

  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      cursor[part] = value;
      return;
    }

    cursor[part] = { ...(cursor[part] as Record<string, unknown>) };
    cursor = cursor[part] as Record<string, unknown>;
  });

  return clone;
}

function updateServiceTranslation(
  translation: Translation,
  serviceId: string,
  field: "title" | "desc" | "price" | "long_desc",
  value: string,
) {
  const clone = structuredClone(translation);
  const services = clone.services as TranslationRecord;
  const service = (services[serviceId] ?? {
    title: "",
    desc: "",
    price: "",
    long_desc: "",
  }) as Translation["services"]["s1"];
  service[field] = value;
  services[serviceId] = service;
  return clone;
}

function updateServiceDefinition(
  services: ServiceDefinition[],
  index: number,
  field: keyof ServiceDefinition,
  value: string,
) {
  const clone = structuredClone(services);
  clone[index] = {
    ...clone[index],
    [field]: value,
  };
  return clone;
}

function getNumberedKeys(section: TranslationRecord, prefix: string) {
  return Object.keys(section)
    .filter((key) => new RegExp(`^${prefix}\\d+$`).test(key))
    .sort((a, b) => Number(a.slice(prefix.length)) - Number(b.slice(prefix.length)));
}

function createEmptyServiceTranslation(): Translation["services"]["s1"] {
  return {
    title: "",
    desc: "",
    price: "",
    long_desc: "",
  };
}

function createEmptyReview(): ReviewEntry {
  return {
    text: "",
    author: "",
    car: "",
  };
}

function Field({
  label,
  value,
  multiline,
  onChange,
}: {
  label: string;
  value: string;
  multiline?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-red-600"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-red-600"
        />
      )}
    </label>
  );
}

export function AdminDashboard({
  initialContent,
  userEmail,
}: {
  initialContent: SiteContent;
  userEmail: string;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [selectedLocale, setSelectedLocale] = useState<Locale>("ro");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Common: false,
    "Navigation and hero": false,
    "About and CTA": false,
    "Reviews and FAQ": false,
    "Footer and forms": false,
    Reviews: false,
    FAQ: false,
    "Service cards": true,
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentTranslation = useMemo(
    () => content.translations[selectedLocale],
    [content.translations, selectedLocale],
  );

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const reviewKeys = useMemo(
    () => getNumberedKeys(currentTranslation.reviews as unknown as TranslationRecord, "r"),
    [currentTranslation],
  );

  const faqNumbers = useMemo(() => {
    const faqSection = currentTranslation.faq as unknown as TranslationRecord;
    return getNumberedKeys(faqSection, "q").map((key) => key.slice(1));
  }, [currentTranslation]);

  const handleFieldChange = (path: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [selectedLocale]: setValue(prev.translations[selectedLocale], path, value),
      },
    }));
  };

  const handleServiceTranslationChange = (
    serviceId: string,
    field: "title" | "desc" | "price" | "long_desc",
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [selectedLocale]: updateServiceTranslation(
          prev.translations[selectedLocale],
          serviceId,
          field,
          value,
        ),
      },
    }));
  };

  const handleServiceDefinitionChange = (
    index: number,
    field: keyof ServiceDefinition,
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      services: updateServiceDefinition(prev.services, index, field, value),
    }));
  };

  const addService = () => {
    const nextNumber =
      content.services.reduce((max, service) => {
        const match = service.id.match(/^s(\d+)$/);
        return match ? Math.max(max, Number(match[1])) : max;
      }, 0) + 1;

    const serviceId = `s${nextNumber}`;

    setContent((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          id: serviceId,
          slug: `new-service-${nextNumber}`,
          icon: "cog",
          image: "",
          imageAlt: "",
        },
      ],
      translations: Object.fromEntries(
        locales.map((locale) => {
          const translation = structuredClone(prev.translations[locale]);
          (translation.services as unknown as TranslationRecord)[serviceId] =
            createEmptyServiceTranslation();
          return [locale, translation];
        }),
      ) as SiteContent["translations"],
    }));

    setTimeout(() => {
      scrollToSection("services-list-bottom");
    }, 100);
  };

  const removeService = (serviceId: string) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== serviceId),
      translations: Object.fromEntries(
        locales.map((locale) => {
          const translation = structuredClone(prev.translations[locale]);
          delete (translation.services as unknown as TranslationRecord)[serviceId];
          return [locale, translation];
        }),
      ) as SiteContent["translations"],
    }));
  };

  const updateReview = (
    reviewKey: string,
    field: keyof ReviewEntry,
    value: string,
  ) => {
    handleFieldChange(`reviews.${reviewKey}.${field}`, value);
  };

  const addReview = () => {
    const nextNumber =
      reviewKeys.reduce((max, key) => Math.max(max, Number(key.slice(1))), 0) + 1;
    const reviewKey = `r${nextNumber}`;

    setContent((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [selectedLocale]: setValue(
          prev.translations[selectedLocale],
          `reviews.${reviewKey}`,
          createEmptyReview(),
        ),
      },
    }));
  };

  const removeReview = (reviewKey: string) => {
    setContent((prev) => {
      const translation = structuredClone(prev.translations[selectedLocale]);
      delete (translation.reviews as unknown as TranslationRecord)[reviewKey];

      return {
        ...prev,
        translations: {
          ...prev.translations,
          [selectedLocale]: translation,
        },
      };
    });
  };

  const updateFaq = (entryNumber: string, type: "q" | "a", value: string) => {
    handleFieldChange(`faq.${type}${entryNumber}`, value);
  };

  const addFaq = () => {
    const nextNumber =
      faqNumbers.reduce((max, value) => Math.max(max, Number(value)), 0) + 1;

    setContent((prev) => {
      let translation = setValue(
        prev.translations[selectedLocale],
        `faq.q${nextNumber}`,
        "",
      );
      translation = setValue(translation, `faq.a${nextNumber}`, "");

      return {
        ...prev,
        translations: {
          ...prev.translations,
          [selectedLocale]: translation,
        },
      };
    });
  };

  const removeFaq = (entryNumber: string) => {
    setContent((prev) => {
      const translation = structuredClone(prev.translations[selectedLocale]);
      const faqSection = translation.faq as unknown as TranslationRecord;
      delete faqSection[`q${entryNumber}`];
      delete faqSection[`a${entryNumber}`];

      return {
        ...prev,
        translations: {
          ...prev.translations,
          [selectedLocale]: translation,
        },
      };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Failed to save content.");
      }

      setMessage("Changes saved to Supabase.");
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Failed to save content.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-32 relative">
      {/* Sticky Header */}
      <div className="sticky top-4 z-[100] mb-8">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-2xl lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight lg:text-3xl">
                Content Admin
              </h1>
              <p className="hidden text-xs text-zinc-400 lg:block">
                Editing <span className="font-bold text-white uppercase">{selectedLocale}</span> version
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Quick Navigation Menu */}
            <div className="group relative">
              <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm font-bold text-white transition-all hover:border-red-600">
                <LayoutGrid className="h-4 w-4 text-red-400" />
                Quick Jump
                <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute top-full right-0 mt-2 min-w-[200px] origin-top-right translate-y-2 scale-95 space-y-1 rounded-2xl border border-zinc-800 bg-zinc-950 p-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                {sectionGroups.map((group) => (
                  <button
                    key={group.title}
                    onClick={() => {
                      setOpenSections((prev) => ({ ...prev, [group.title]: true }));
                      setTimeout(() => scrollToSection(group.title), 50);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-left text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
                  >
                    {group.title}
                  </button>
                ))}
                <div className="my-1 border-t border-zinc-800" />
                <button
                  onClick={() => scrollToSection("service-cards")}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-left text-sm font-bold text-red-400 transition-colors hover:bg-zinc-900"
                >
                  <Wrench className="h-4 w-4" />
                  Service cards
                </button>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-400">
              <Globe2 className="h-4 w-4 text-red-400" />
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => setSelectedLocale(locale)}
                  className={`rounded-lg px-2.5 py-1.5 font-bold uppercase transition-colors ${
                    selectedLocale === locale
                      ? "bg-red-600 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {locale}
                </button>
              ))}
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-2.5 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 hover:shadow-red-600/30 disabled:bg-zinc-800"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save
            </button>

            <LogoutButton />
          </div>
        </div>
      </div>

      {message && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {sectionGroups.map((group) => (
            <section
              key={group.title}
              id={group.title}
              className="scroll-mt-32 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6"
            >
              <button
                onClick={() => toggleSection(group.title)}
                className="mb-5 flex w-full items-center justify-between gap-4 text-left"
              >
                <h2 className="text-2xl font-black">{group.title}</h2>
                <ChevronDown
                  className={`h-5 w-5 text-zinc-500 transition-transform ${
                    openSections[group.title] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSections[group.title] && (
                <div className="grid gap-4 md:grid-cols-2">
                  {group.fields.map((field) => (
                    <Field
                      key={field.path}
                      label={field.label}
                      multiline={field.multiline}
                      value={String(getValue(currentTranslation, field.path) ?? "")}
                      onChange={(value) => handleFieldChange(field.path, value)}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}

          <section className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <MessageSquareQuote className="h-5 w-5 text-red-400" />
                <h2 className="text-2xl font-black">Reviews</h2>
              </div>

              <button
                onClick={addReview}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-red-600"
              >
                <Plus className="h-4 w-4 text-red-400" />
                Add review
              </button>
            </div>

            <button
              onClick={() => toggleSection("Reviews")}
              className="mb-5 flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
                Review entries
              </span>
              <ChevronDown
                className={`h-5 w-5 text-zinc-500 transition-transform ${
                  openSections.Reviews ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSections.Reviews && (
              <div className="space-y-4">
                {reviewKeys.map((reviewKey) => {
                  const review = (currentTranslation.reviews as unknown as Record<string, ReviewEntry>)[reviewKey];

                  return (
                    <div
                      key={reviewKey}
                      className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
                          <MessageSquareQuote className="h-4 w-4 text-red-400" />
                          {reviewKey}
                        </div>

                        <button
                          onClick={() => removeReview(reviewKey)}
                          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:border-red-600 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                          Delete
                        </button>
                      </div>

                      <Field
                        label="Review text"
                        value={review?.text ?? ""}
                        multiline
                        onChange={(value) => updateReview(reviewKey, "text", value)}
                      />
                      <Field
                        label="Author"
                        value={review?.author ?? ""}
                        onChange={(value) => updateReview(reviewKey, "author", value)}
                      />
                      <Field
                        label="Car"
                        value={review?.car ?? ""}
                        onChange={(value) => updateReview(reviewKey, "car", value)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CircleHelp className="h-5 w-5 text-red-400" />
                <h2 className="text-2xl font-black">FAQ</h2>
              </div>

              <button
                onClick={addFaq}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-red-600"
              >
                <Plus className="h-4 w-4 text-red-400" />
                Add FAQ
              </button>
            </div>

            <button
              onClick={() => toggleSection("FAQ")}
              className="mb-5 flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
                FAQ entries
              </span>
              <ChevronDown
                className={`h-5 w-5 text-zinc-500 transition-transform ${
                  openSections.FAQ ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSections.FAQ && (
              <div className="space-y-4">
                {faqNumbers.map((entryNumber) => (
                  <div
                    key={entryNumber}
                    className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
                        <CircleHelp className="h-4 w-4 text-red-400" />
                        FAQ {entryNumber}
                      </div>

                      <button
                        onClick={() => removeFaq(entryNumber)}
                        className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:border-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                        Delete
                      </button>
                    </div>

                    <Field
                      label="Question"
                      value={String(getValue(currentTranslation, `faq.q${entryNumber}`) ?? "")}
                      onChange={(value) => updateFaq(entryNumber, "q", value)}
                    />
                    <Field
                      label="Answer"
                      value={String(getValue(currentTranslation, `faq.a${entryNumber}`) ?? "")}
                      multiline
                      onChange={(value) => updateFaq(entryNumber, "a", value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section
            id="service-cards"
            className="scroll-mt-32 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-red-400" />
                <h2 className="text-2xl font-black">Service cards</h2>
              </div>

              <button
                onClick={addService}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-red-600"
              >
                <Plus className="h-4 w-4 text-red-400" />
                Add service
              </button>
            </div>
            <button
              onClick={() => toggleSection("Service cards")}
              className="mb-5 flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
                Service entries
              </span>
              <ChevronDown
                className={`h-5 w-5 text-zinc-500 transition-transform ${
                  openSections["Service cards"] ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSections["Service cards"] && (
              <div className="space-y-6">
                {content.services.map((service, index) => {
                  const translation = (currentTranslation.services as unknown as Record<string, Translation["services"]["s1"]>)[
                    service.id
                  ];

                  return (
                    <div
                      key={`${service.id}-${index}`}
                      className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
                          <Wrench className="h-4 w-4 text-red-400" />
                          {service.id}
                        </div>

                        <button
                          onClick={() => removeService(service.id)}
                          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:border-red-600 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                          Delete
                        </button>
                      </div>

                      <ImageUpload
                        label="Service image"
                        value={service.image ?? ""}
                        onChange={(url) =>
                          handleServiceDefinitionChange(index, "image", url)
                        }
                      />

                      <Field
                        label="Image alt text (SEO)"
                        value={service.imageAlt ?? ""}
                        onChange={(value) =>
                          handleServiceDefinitionChange(index, "imageAlt", value)
                        }
                      />

                      <Field
                        label="Slug"
                        value={service.slug}
                        onChange={(value) =>
                          handleServiceDefinitionChange(index, "slug", value)
                        }
                      />
                      <Field
                        label="Icon"
                        value={service.icon}
                        onChange={(value) =>
                          handleServiceDefinitionChange(index, "icon", value)
                        }
                      />
                      <Field
                        label="Image path or URL"
                        value={service.image ?? ""}
                        onChange={(value) =>
                          handleServiceDefinitionChange(index, "image", value)
                        }
                      />
                      <Field
                        label="Title"
                        value={translation?.title ?? ""}
                        onChange={(value) =>
                          handleServiceTranslationChange(service.id, "title", value)
                        }
                      />
                      <Field
                        label="Short description"
                        value={translation?.desc ?? ""}
                        multiline
                        onChange={(value) =>
                          handleServiceTranslationChange(service.id, "desc", value)
                        }
                      />
                      <Field
                        label="Price badge"
                        value={translation?.price ?? ""}
                        onChange={(value) =>
                          handleServiceTranslationChange(service.id, "price", value)
                        }
                      />
                      <Field
                        label="Long description (empty line = new paragraph)"
                        value={translation?.long_desc ?? ""}
                        multiline
                        onChange={(value) =>
                          handleServiceTranslationChange(service.id, "long_desc", value)
                        }
                      />
                    </div>
                  );
                })}
                <div id="services-list-bottom" className="h-4" />
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[110] flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-2xl shadow-red-600/40 transition-all hover:-translate-y-1 hover:bg-red-700 animate-in fade-in zoom-in duration-300"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
