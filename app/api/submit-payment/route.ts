import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      user_name,
      user_email,
      worker_id,
      amount,
      utr,
      payment_type,
    } = body;

    const { error } = await supabase
      .from("payments")
      .insert([
        {
          user_name,
          user_email,
          worker_id,
          amount,
          utr,
          payment_type,
          status: "Pending",
          approved: false,
        },
      ]);

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "Something went wrong",
    });
  }
}