"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-bold text-zinc-300 transition-colors hover:border-red-600 hover:text-white"
    >
      <LogOut className="h-4 w-4" />
      Log out
    </button>
  );
}
