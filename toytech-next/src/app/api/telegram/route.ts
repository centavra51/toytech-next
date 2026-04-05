import { NextResponse } from "next/server";

type TelegramRequestBody = {
  name?: string;
  phone?: string;
  car?: string;
  service?: string;
  date?: string;
  website?: string;
  startedAt?: number;
  page?: string;
};

type RateLimitEntry = {
  count: number;
  firstRequestAt: number;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_SUBMIT_TIME_MS = 2500;
const ipRequests = new Map<string, RateLimitEntry>();

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const current = ipRequests.get(ip);

  if (!current || now - current.firstRequestAt > RATE_LIMIT_WINDOW_MS) {
    ipRequests.set(ip, { count: 1, firstRequestAt: now });
    return false;
  }

  current.count += 1;
  ipRequests.set(ip, current);

  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function normalizeValue(value?: string, fallback = "—") {
  return value && value.trim() ? value.trim() : fallback;
}

function buildTelegramMessage(body: Required<Pick<TelegramRequestBody, "name" | "phone">> & TelegramRequestBody) {
  const submittedAt = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Chisinau",
  }).format(new Date());

  return [
    "<b>Новая заявка ToyTech</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(normalizeValue(body.name))}`,
    `<b>Телефон:</b> <code>${escapeHtml(normalizeValue(body.phone))}</code>`,
    `<b>Автомобиль:</b> ${escapeHtml(normalizeValue(body.car))}`,
    `<b>Услуга:</b> ${escapeHtml(normalizeValue(body.service))}`,
    `<b>Дата:</b> ${escapeHtml(normalizeValue(body.date))}`,
    `<b>Страница:</b> ${escapeHtml(normalizeValue(body.page))}`,
    "",
    `<b>Отправлено:</b> ${escapeHtml(submittedAt)}`,
  ].join("\n");
}

export async function POST(request: Request) {
  const body = (await request.json()) as TelegramRequestBody;
  const ip = getClientIp(request);
  const now = Date.now();
  const { name, phone, car, service, date, website, startedAt, page } = body;

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (typeof startedAt !== "number" || now - startedAt < MIN_SUBMIT_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields: name and phone" },
      { status: 400 },
    );
  }

  if (name.trim().length < 2 || name.trim().length > 80) {
    return NextResponse.json(
      { ok: false, error: "Invalid name length" },
      { status: 400 },
    );
  }

  if (phone.trim().length < 6 || phone.trim().length > 30) {
    return NextResponse.json(
      { ok: false, error: "Invalid phone number" },
      { status: 400 },
    );
  }

  if (checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log("ToyTech form submission (Telegram not configured)", {
      name,
      phone,
      car: car || null,
      service: service || null,
      date: date || null,
      page: page || null,
      ip,
    });

    return NextResponse.json({
      ok: true,
      message:
        "Telegram is not configured yet. Submission was logged on the server.",
    });
  }

  const message = buildTelegramMessage({
    name: name.trim(),
    phone: phone.trim(),
    car,
    service,
    date,
    page,
  });

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    const result = (await telegramResponse.json()) as {
      ok?: boolean;
      description?: string;
    };

    if (!telegramResponse.ok || !result.ok) {
      throw new Error(result.description || "Failed to send message");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Telegram request failed",
      },
      { status: 500 },
    );
  }
}
