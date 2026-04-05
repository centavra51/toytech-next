import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { LoginForm } from "../../../components/admin/LoginForm";
import { getSupabaseUser } from "../../../lib/supabase/auth";
import { isSupabaseConfigured } from "../../../lib/supabase/server";

export default async function AdminLoginPage() {
  const user = await getSupabaseUser();

  if (user) {
    redirect("/admin");
  }

  const configured = isSupabaseConfigured();

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2.5rem] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 shadow-2xl shadow-red-600/5 lg:p-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-red-400">
              <ShieldCheck className="h-4 w-4" />
              ToyTech admin
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight lg:text-6xl">
              Secure content control for your Next.js service site.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Sign in with a Supabase user that is allowed in the `admin_users`
              table. After login you will be able to edit translations and service
              cards, then publish changes immediately.
            </p>
          </div>

          <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl shadow-black/20 lg:p-10">
            <h2 className="text-2xl font-black">Admin login</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Use a Supabase Auth email/password account with admin access.
            </p>

            {!configured && (
              <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-4 text-sm text-amber-200">
                Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
                before using the admin panel.
              </div>
            )}

            <div className="mt-8">
              <LoginForm configured={configured} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
