import type { User } from "@supabase/supabase-js";
import { createSupabaseRouteHandlerClient, createSupabaseServerComponentClient, isSupabaseConfigured } from "./server";

export async function getSupabaseUser() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createSupabaseServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function isAdminUser(user: User | null) {
  if (!user || !isSupabaseConfigured()) {
    return false;
  }

  const supabase = await createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return !error && Boolean(data);
}

export async function requireAdminInRouteHandler() {
  if (!isSupabaseConfigured()) {
    return { ok: false as const, status: 503, error: "Supabase is not configured." };
  }

  const supabase = await createSupabaseRouteHandlerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, status: 401, error: "Unauthorized." };
  }

  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) {
    return { ok: false as const, status: 403, error: "Admin access required." };
  }

  return { ok: true as const, supabase, user };
}
