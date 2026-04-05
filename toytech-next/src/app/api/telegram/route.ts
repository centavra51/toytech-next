import { NextResponse } from "next/server";

type TelegramRequestBody = {
  name?: string;
  phone?: string;
  car?: string;
  service?: string;
  date?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as TelegramRequestBody;
  const { name, phone, car, service, date } = body;

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields: name and phone" },
      { status: 400 },
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
    });

    return NextResponse.json({
      ok: true,
      message:
        "Telegram is not configured yet. Submission was logged on the server.",
    });
  }

  const message = [
    "New ToyTech booking request",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Car: ${car || "-"}`,
    `Service: ${service || "-"}`,
    `Preferred date: ${date || "-"}`,
  ].join("\n");

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
