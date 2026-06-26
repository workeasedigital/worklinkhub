"use client";

export default function ApproveWorkerButton({
  id,
}: {
  id: number;
}) {
  async function approveWorker() {
    const response = await fetch(
      "/api/approve-worker",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    );

    const result =
      await response.json();

    if (result.success) {
      alert("Worker Approved");
      window.location.reload();
    } else {
      alert("Approval Failed");
    }
  }

  return (
    <button
      onClick={approveWorker}
      className="bg-green-500 text-white px-4 py-2 rounded-lg"
    >
      Approve
    </button>
  );
}