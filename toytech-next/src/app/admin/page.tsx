import Link from "next/link";
import { Settings, ShieldCheck, Wrench } from "lucide-react";
import { defaultLocale, getTranslations } from "../../lib/i18n";

export default function AdminPage() {
  const t = getTranslations(defaultLocale);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-20">
        <div className="w-full rounded-[2.5rem] border border-zinc-800 bg-zinc-900/80 p-10 shadow-2xl shadow-red-600/5 backdrop-blur">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-500">
            <ShieldCheck className="h-4 w-4" />
            Admin
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6">
              <h1 className="text-4xl font-black tracking-tight lg:text-6xl">
                {t.admin.title}
              </h1>
              <p className="max-w-2xl text-lg font-medium leading-relaxed text-zinc-300">
                {t.admin.subtitle}
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-500">
                {t.admin.note}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/${defaultLocale}`}
                  className="inline-flex items-center gap-3 rounded-2xl bg-red-600 px-6 py-4 font-black transition-all hover:bg-red-700"
                >
                  <Wrench className="h-5 w-5" />
                  {t.admin.ctaSite}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/10 text-red-500">
                <Settings className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-black">Vercel notes</h2>
              <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-zinc-400">
                <li>Project root on Vercel should point to `toytech-next`.</li>
                <li>`TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are optional but recommended.</li>
                <li>`/api/sheets` now accepts only HTTPS Google Apps Script URLs.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
