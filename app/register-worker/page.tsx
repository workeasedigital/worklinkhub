"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { sendNotification } from "../../lib/notify";
export default function RegisterWorker() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [profession, setProfession] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
const [photo, setPhoto] = useState<File | null>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    let uploadedPhotoUrl = "";
    if (photo) {
  const fileName = `${Date.now()}-${photo.name}`;

  const { error: uploadError } = await supabase.storage
    .from("worker-photos")
    .upload(fileName, photo);

  if (uploadError) {
  console.error(uploadError);
  setMessage("Photo upload failed.");
  setLoading(false);
  return;
}

  const { data } = supabase.storage
    .from("worker-photos")
    .getPublicUrl(fileName);

  uploadedPhotoUrl = data.publicUrl;
}
    const { error } = await supabase.from("workers").insert([
      {
        name,
        phone,
        whatsapp,
        profession,
        experience,
        location,
        photo_url: uploadedPhotoUrl,
        about,
        approved: false,
        status: "Pending",
      },
    ]);

   if (error) {
  setMessage("Registration failed.");
  alert(error.message);
} else {

  await sendNotification(
    "New Worker Registered",
    `${name} - ${profession} - ${location}`
  );

  setMessage(
    "Thank you for registering with WorkLinkHub. Your profile has been submitted and is awaiting admin approval. You will become visible on the platform once approved"
  );

  setName("");
  setPhone("");
  setWhatsapp("");
  setProfession("");
  setExperience("");
  setLocation("");
  setPhotoUrl("");
  setAbout("");
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
            Register as Worker
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-900"
              required
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-900"
              required
            />

            <input
              type="text"
              placeholder="WhatsApp Number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-900"
            />

            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-900"
              required
            >
              <option value="">Select Profession</option>
              <option>Tile Worker</option>
              <option>Plumber</option>
              <option>Electrician</option>
              <option>Painter</option>
              <option>Driver</option>
              <option>Mechanic</option>
              <option>Carpenter</option>
              <option>Welder</option>
              <option>Security Guard</option>
              <option>House Keeping</option>
            </select>

            <input
              type="number"
              placeholder="Years of Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-900"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border p-3 rounded-lg text-gray-900"
              required
            />
            <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files?.[0]) {
      setPhoto(e.target.files[0]);
    }
  }}
  className="w-full border p-3 rounded-lg"
/>
<textarea
  placeholder="Tell customers about yourself..."
  value={about}
  onChange={(e) => setAbout(e.target.value)}
  className="w-full border p-3 rounded-lg"
  rows={4}
/>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Registering..." : "Register Now"}
            </button>

            {message && (
              <p className="text-center text-green-600 font-medium">
                {message}
              </p>
            )}

          </form>

        </div>
      </section>
    </main>
  );
}