"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PostJobPage() {
  const [title, setTitle] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("jobs")
      .insert([
        {
          title,
          profession,
          location,
          budget,
          description,
          mobile,
        },
      ]);

    if (error) {
      console.error(error);
      setMessage("Job posting failed.");
    } else {
      setMessage("Job posted successfully!");

      setTitle("");
      setProfession("");
      setLocation("");
      setBudget("");
      setDescription("");
      setMobile("");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-orange-500">
            WorkLinkHub
          </h1>
        </div>
      </div>

      <section className="py-12 px-6">

        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">

          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Post a Job
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-900"
              required
            />

            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-900"
              required
            >
              <option value="">Select Worker Type</option>
              <option>Electrician</option>
              <option>Plumber</option>
              <option>Tile Worker</option>
              <option>Painter</option>
              <option>Driver</option>
              <option>Mechanic</option>
              <option>Carpenter</option>
            </select>

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-900"
              required
            />

            <input
              type="text"
              placeholder="Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-900"
            />

            <textarea
              placeholder="Job Description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-900"
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-900"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Posting..." : "Post Job"}
            </button>

            {message && (
              <p className="text-center text-green-600">
                {message}
              </p>
            )}

          </form>

        </div>

      </section>

    </main>
  );
}