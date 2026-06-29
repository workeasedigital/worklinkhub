"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function WorkerPaymentPage() {
  const { id } = useParams();

  const [utr, setUtr] = useState("");

  return (
    <main className="min-h-screen bg-orange-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">

        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Unlock Worker Contact
        </h1>

        <p className="text-center text-gray-600 mb-2">
          Pay only
        </p>

        <h2 className="text-center text-5xl font-bold text-green-600 mb-6">
          ₹99
        </h2>

        <div className="flex justify-center mb-6">
          <Image
            src="/payment-qr.png"
            alt="QR Code"
            width={220}
            height={220}
          />
        </div>

        <p className="text-center font-bold">
          UPI ID
        </p>

        <p className="text-center text-orange-600 font-semibold mb-6">
          workeasedigital@okaxis
        </p>

        <input
          type="text"
          placeholder="Enter UTR Number"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
          className="border rounded-lg p-3 w-full mb-5"
        />

        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-3 rounded-lg"
        >
          Submit Payment
        </button>

      </div>
    </main>
  );
}