"use client";

import { useMemo, useState } from "react";
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
} from "lucide-react";
import type { Locale, Translation } from "../../lib/i18n";
import { locales } from "../../lib/i18n";
import type { ServiceDefinition, SiteContent } from "../../lib/site-content";
import { LogoutButton } from "./LogoutButton";

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

  const currentTranslation = useMemo(
    () => content.translations[selectedLocale],
    [content.translations, selectedLocale],
  );

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
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight lg:text-5xl">
            Content admin
          </h1>
          <p className="mt-2 text-zinc-400">
            Signed in as <span className="font-bold text-white">{userEmail}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-400">
            <Globe2 className="h-4 w-4 text-red-400" />
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => setSelectedLocale(locale)}
                className={`rounded-lg px-3 py-1.5 font-bold uppercase transition-colors ${
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
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-700 disabled:bg-zinc-800"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </button>

          <LogoutButton />
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
              className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6"
            >
              <h2 className="mb-5 text-2xl font-black">{group.title}</h2>
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
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
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
                      label="Long description"
                      value={translation?.long_desc ?? ""}
                      multiline
                      onChange={(value) =>
                        handleServiceTranslationChange(service.id, "long_desc", value)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
