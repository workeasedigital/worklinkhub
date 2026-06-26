import { NextResponse } from "next/server";

export async function POST() {
  const response = await fetch("https://ntfy.sh/worklinkhub-admin", {
    method: "POST",
    headers: {
      Title: "TEST",
      Priority: "5",
    },
    body: "This is a test notification",
  });

  const text = await response.text();

  return NextResponse.json({
    status: response.status,
    statusText: response.statusText,
    body: text,
  });
}