import { NextResponse } from "next/server";

const allowedHosts = new Set(["script.google.com", "script.googleusercontent.com"]);

function parseAndValidateUrl(rawUrl: string | null) {
  if (!rawUrl) {
    return null;
  }

  try {
    const parsed = new URL(rawUrl);

    if (parsed.protocol !== "https:" || !allowedHosts.has(parsed.hostname)) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = parseAndValidateUrl(searchParams.get("url"));

  if (!url) {
    return NextResponse.json(
      { error: "Invalid or missing URL" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(url, { cache: "no-store" });
    const text = await response.text();

    return new NextResponse(text, {
      status: response.ok ? 200 : response.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Proxy request failed",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    url?: string;
    key?: string;
    value?: unknown;
  };

  const url = parseAndValidateUrl(body.url || null);

  if (!url || !body.key) {
    return NextResponse.json(
      { error: "Missing or invalid parameters" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({ key: body.key, value: body.value }),
    });

    const text = await response.text();

    return new NextResponse(text, {
      status: response.ok ? 200 : response.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Proxy request failed",
      },
      { status: 500 },
    );
  }
}
