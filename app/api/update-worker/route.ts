import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {
  const data = await req.json();

  const { error } = await supabase
    .from("workers")
    .update({
      name: data.name,
      profession: data.profession,
      location: data.location,
      phone: data.phone,
      about: data.about,
    })
    .eq("id", data.id);

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