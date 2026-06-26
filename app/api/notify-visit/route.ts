import { NextResponse } from "next/server";

export async function POST() {
  try {
    await fetch("https://ntfy.sh/worklinkhub-admin", {
      method: "POST",
      headers: {
        Title: "👀 New Visitor",
        Priority: "3",
      },
      body: " 👀 Someone opened WorkLinkHub",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}