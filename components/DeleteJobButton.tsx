"use client";

export default function DeleteJobButton({
  id,
}: {
  id: number | string;
}) {
  async function deleteJob() {
    const response = await fetch(
      "/api/delete-job",
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
      alert("Job deleted successfully");
    }
  }

  return (
    <button
      onClick={deleteJob}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Delete Job
    </button>
  );
}