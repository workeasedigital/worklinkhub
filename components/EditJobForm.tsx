"use client";

import { useState } from "react";

export default function EditJobForm({
  job,
}: {
  job: any;
}) {
  const [title, setTitle] = useState(job.title || "");
  const [profession, setProfession] = useState(job.profession || "");
  const [location, setLocation] = useState(job.location || "");
  const [budget, setBudget] = useState(job.budget || "");
  const [description, setDescription] = useState(job.description || "");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const response = await fetch(
      "/api/update-job",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: job.id,
          title,
          profession,
          location,
          budget,
          description,
        }),
      }
    );

    const result = await response.json();

   if (result.success) {
  console.log("SUCCESS:", result);
  alert("Job updated successfully");
} else {
  console.log("FAILED:", result);
  alert(JSON.stringify(result));
}
  }
  return (
    <form onSubmit={handleSubmit}>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
        placeholder="Job Title"
      />

      <input
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
        placeholder="Profession"
      />

      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
        placeholder="Location"
      />

      <input
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
        placeholder="Budget"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
        placeholder="Description"
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-3 rounded-lg"
      >
        Save Changes
      </button>

    </form>
  );
}