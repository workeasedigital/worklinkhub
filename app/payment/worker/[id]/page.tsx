"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function WorkerPaymentPage() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [utr, setUtr] = useState("");

  async function submitPayment() {
  if (!name || !email || !utr) {
    alert("Please fill all fields.");
    return;
  }

  const response = await fetch("/api/submit-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: name,
      user_email: email,
      worker_id: Number(id),
      amount: 99,
      utr,
      payment_type: "Worker",
    }),
  });

  const result = await response.json();

  if (result.success) {
    alert(
      "Payment submitted successfully.\nWaiting for admin approval."
    );

    setName("");
    setEmail("");
    setUtr("");
  } else {
    alert(result.error);
  }
}

  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">

        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Unlock Worker Contact
        </h1>

        <p className="text-center text-gray-600">
          Worker ID
        </p>

        <p className="text-center text-xl font-bold mb-5">
          #{id}
        </p>

        <h2 className="text-center text-5xl font-bold text-green-600 mb-5">
          ₹99
        </h2>

        <div className="flex justify-center mb-6">
          <Image
            src="/payment-qr.png"
            alt="QR"
            width={220}
            height={220}
          />
        </div>

        <p className="text-center font-bold">
          UPI ID
        </p>

        <p className="text-center text-orange-500 font-semibold mb-6">
          worklinkhub@nyes
        </p>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          placeholder="Enter UTR Number"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6"
        />

        <button
          onClick={submitPayment}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold"
        >
          Submit Payment
        </button>

      </div>

    </main>
  );
}