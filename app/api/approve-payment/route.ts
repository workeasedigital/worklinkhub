import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    // Get payment details
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .select("*")
      .eq("id", id)
      .single();

    if (paymentError || !payment) {
      return NextResponse.json({
        success: false,
        error: "Payment not found",
      });
    }

    // Approve payment
    const { error: approveError } = await supabase
      .from("payments")
      .update({
        approved: true,
        status: "Approved",
      })
      .eq("id", id);

    if (approveError) {
      return NextResponse.json({
        success: false,
        error: approveError.message,
      });
    }

    // Give access to this worker
    const { error: unlockError } = await supabase
      .from("worker_unlocks")
      .insert([
        {
          worker_id: payment.worker_id,
          user_email: payment.user_email,
        },
      ]);

    if (unlockError) {
      return NextResponse.json({
        success: false,
        error: unlockError.message,
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