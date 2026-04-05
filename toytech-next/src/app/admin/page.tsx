import { redirect } from "next/navigation";
import { AlertTriangle, Database, ShieldCheck } from "lucide-react";
import { getSiteContent } from "../../lib/site-content";
import { getSupabaseUser, isAdminUser } from "../../lib/supabase/auth";
import { isSupabaseConfigured } from "../../lib/supabase/server";
import { AdminDashboard } from "../../components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-zinc-800 bg-zinc-900 p-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-300">
            <Database className="h-4 w-4" />
            Setup required
          </div>
          <h1 className="text-4xl font-black">Supabase is not connected yet</h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
            in Vercel and locally before using the admin panel.
          </p>
        </div>
      </main>
    );
  }

  const user = await getSupabaseUser();

  if (!user) {
    redirect("/admin/login");
  }

  const isAdmin = await isAdminUser(user);

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-zinc-800 bg-zinc-900 p-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-red-400">
            <AlertTriangle className="h-4 w-4" />
            Access denied
          </div>
          <h1 className="text-4xl font-black">Your account is not an admin yet</h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Add this user to the `admin_users` table in Supabase, then refresh the page.
          </p>
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-sm text-zinc-400">
            Signed in as <span className="font-bold text-white">{user.email}</span>
          </div>
        </div>
      </main>
    );
  }

  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-red-400">
          <ShieldCheck className="h-4 w-4" />
          Admin panel
        </div>
        <AdminDashboard initialContent={content} userEmail={user.email ?? "admin"} />
      </div>
    </main>
  );
}
