"use client";

export default function DeleteWorkerButton({
  id,
}: {
  id: number | string;
}) {
  async function deleteWorker() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this worker?"
    );

    if (!confirmDelete) return;

    const response = await fetch(
      "/api/delete-worker",
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
    } else {
      alert("Worker deleted successfully");
    }
  }

  return (
    <button
      onClick={deleteWorker}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Delete Worker
    </button>
  );
}