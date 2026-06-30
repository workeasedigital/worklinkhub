"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  useEffect(() => {
  async function checkLoggedIn() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      router.push("/");
    }
  }

  checkLoggedIn();
}, []);
async function handleSignup(e: React.FormEvent) {
  e.preventDefault();

  setLoading(true);
  setMessage("");

  const { data, error } = await supabase.auth.signUp({
    options: {
      data: {
        full_name: fullName,
      },
    },
    email,
    password,
  });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
  setMessage(error.message);
} else {
  setMessage("Signup successful!");

  setTimeout(() => {
    router.push("/login");
  }, 2000);
}

  setLoading(false);
}

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
  type="text"
  placeholder="Full Name"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  className="w-full border p-3 rounded-lg"
  required
/>

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
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {message && (
            <p className="text-center text-green-600">
              {message}
            </p>
          )}
          <div className="text-center mt-5">
  <p className="text-gray-600">
    Already have an account?{" "}
    <a
      href="/login"
      className="text-orange-500 font-semibold hover:underline"
    >
      Login
    </a>
  </p>
</div>
        </form>
      </div>
    </main>
  );
}