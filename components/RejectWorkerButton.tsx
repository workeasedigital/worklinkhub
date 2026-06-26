"use client";

import { useRouter } from "next/navigation";

export default function RejectWorkerButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function handleReject() {
    alert("Reject clicked");
    await fetch("/api/reject-worker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    router.refresh();
  }

  return (
    <button
      onClick={handleReject}
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      Reject
    </button>
  );
}