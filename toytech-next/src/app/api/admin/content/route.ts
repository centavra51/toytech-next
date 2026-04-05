import { NextResponse } from "next/server";
import { defaultSiteContent, type SiteContent } from "../../../../lib/site-content";
import { requireAdminInRouteHandler } from "../../../../lib/supabase/auth";

export async function PUT(request: Request) {
  const auth = await requireAdminInRouteHandler();

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = (await request.json()) as SiteContent;

  if (!body?.translations || !body?.services) {
    return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
  }

  const payload: SiteContent = {
    translations: body.translations,
    services: body.services,
  };

  const { error } = await auth.supabase.from("site_content").upsert(
    {
      id: "site",
      translations: payload.translations,
      services: payload.services,
    },
    { onConflict: "id" },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, content: payload });
}

export async function GET() {
  const auth = await requireAdminInRouteHandler();

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { data, error } = await auth.supabase
    .from("site_content")
    .select("translations, services")
    .eq("id", "site")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    content: data ?? defaultSiteContent,
  });
}
