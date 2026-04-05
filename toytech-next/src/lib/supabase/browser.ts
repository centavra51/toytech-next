"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./shared";

export function createSupabaseBrowserClient() {
  const { url, anonKey } = getSupabaseEnv();

  if (!url || !anonKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  return createBrowserClient(url, anonKey);
}
