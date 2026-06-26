"use client";

import { useState } from "react";

export default function EditWorkerForm({
  worker,
}: {
  worker: any;
}) {
  const [name, setName] = useState(worker.name || "");
  const [profession, setProfession] = useState(worker.profession || "");
  const [location, setLocation] = useState(worker.location || "");
  const [phone, setPhone] = useState(worker.phone || "");
  const [about, setAbout] = useState(worker.about || "");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const response = await fetch(
      "/api/update-worker",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: worker.id,
          name,
          profession,
          location,
          phone,
          about,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      alert("Worker updated successfully");
    } else {
      alert("Update failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full border p-3 rounded-lg mb-4"
      />

      <input
        value={profession}
        onChange={(e) =>
          setProfession(e.target.value)
        }
        className="w-full border p-3 rounded-lg mb-4"
      />

      <input
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
        className="w-full border p-3 rounded-lg mb-4"
      />

      <input
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="w-full border p-3 rounded-lg mb-4"
      />

      <textarea
        value={about}
        onChange={(e) =>
          setAbout(e.target.value)
        }
        className="w-full border p-3 rounded-lg mb-4"
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