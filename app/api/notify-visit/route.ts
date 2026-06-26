import { NextResponse } from "next/server";

async function sendNotification() {
  try {
    const response = await fetch("https://ntfy.sh/worklinkhub-admin", {
      method: "POST",
      headers: {
        Title: "👀 Visitor",
        Priority: "5",
      },
      body: "👀 Someone opened WorkLinkHub",
    });

    return {
      ok: true,
      status: response.status,
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      error: String(error),
    };
  }
}

export async function GET() {
  const result = await sendNotification();

  return NextResponse.json(result);
}

export async function POST() {
  const result = await sendNotification();

  return NextResponse.json(result);
}