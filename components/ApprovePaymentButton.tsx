"use client";

export default function ApprovePaymentButton({
  id,
}: {
  id: number;
}) {
  async function approve() {

    const response = await fetch(
      "/api/approve-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const result = await response.json();

    if (result.success) {
      window.location.reload();
    }
  }

  return (
    <button
      onClick={approve}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Approve
    </button>
  );
}