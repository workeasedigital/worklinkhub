import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request: Request) {
  const { id } = await request.json();

  const { error } = await supabase
    .from("workers")
    .update({
      approved: false,
      status: "Rejected",
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }

  return NextResponse.json({
    success: true,
  });
}