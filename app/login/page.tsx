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
<div className="flex justify-between items-center mb-8">

  <h1 className="text-3xl font-bold text-orange-500">
    WorkLinkHub
  </h1>

  <a
    href="/"
    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold"
  >
    🏠 Home
  </a>

</div>
return ( <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6"> <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"> <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
Login </h1>


    <form
      onSubmit={handleLogin}
      className="space-y-4"
    >
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold"
      >
        {loading
          ? "Logging In..."
          : "Login"}
      </button>

      {message && (
        <p className="text-center text-red-500">
          {message}
        </p>
      )}
    </form>
  </div>
</main>


);
}
