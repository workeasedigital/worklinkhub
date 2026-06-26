import { NextResponse } from "next/server";

async function sendNotification() {
  const response = await fetch("https://ntfy.sh/worklinkhub-admin", {
    method: "POST",
    headers: {
      Title: "👀 Visitor",
      
    },
    body: "Someone opened WorkLinkHub",
  });

  return response.status;
}

export async function GET() {
  const status = await sendNotification();

  return NextResponse.json({
    success: true,
    status,
  });
}

export async function POST() {
  const status = await sendNotification();

  return NextResponse.json({
    success: true,
    status,
  });
}