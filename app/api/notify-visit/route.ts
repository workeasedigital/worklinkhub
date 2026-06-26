import { NextResponse } from "next/server";

export async function POST() {
  console.log("VISITOR API CALLED");

  try {
    const response = await fetch("https://ntfy.sh/worklinkhub-admin", {
      method: "POST",
      headers: {
        Title: "👀 New Visitor",
        Priority: "3",
      },
      body: "👀 Someone opened WorkLinkHub",
    });

    console.log("ntfy status:", response.status);

    return NextResponse.json({
      success: true,
      status: response.status,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      success: false,
    });
  }
}