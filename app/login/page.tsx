"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");

async function handleLogin(e: React.FormEvent) {
e.preventDefault();


setLoading(true);
setMessage("");

const { error } =
  await supabase.auth.signInWithPassword({
    email,
    password,
  });

if (error) {
  setMessage(error.message);
} else {
  if (
    email ===
    "workeasedigital@gmail.com"
  ) {
    document.cookie =
      "isAdmin=true; path=/";

    localStorage.setItem(
      "isAdmin",
      "true"
    );

    router.push("/admin");
  } else {
    document.cookie =
      "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    localStorage.removeItem(
      "isAdmin"
    );

    router.push("/");
  }
}

setLoading(false);


}

return (
  <main className="min-h-screen bg-gray-50">

    {/* Top Navbar */}
    <div className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-orange-500">
          WorkLinkHub
        </h1>

        <a
          href="/"
          className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold transition"
        >
          🏠 Home
        </a>

      </div>
    </div>

    {/* Login Form */}
    <div className="flex justify-center items-center py-20 px-6">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {message && (
            <p className="text-center text-red-500">
              {message}
            </p>
          )}
        </form>
<div className="text-center mt-5">
  <p className="text-gray-600">
    Don't have an account?{" "}
    <a
      href="/signup"
      className="text-orange-500 font-semibold hover:underline"
    >
      Create Account
    </a>
  </p>
</div>
      </div>

    </div>

  </main>
);
}