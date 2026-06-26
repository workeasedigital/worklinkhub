import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("Received:", data);

  const result = await supabase
    .from("jobs")
    .update({
      title: data.title,
      profession: data.profession,
      location: data.location,
      budget: data.budget,
      description: data.description,
    })
    .eq("id", data.id)
    .select();

  console.log("Supabase Result:", result);

  return NextResponse.json(result);
}