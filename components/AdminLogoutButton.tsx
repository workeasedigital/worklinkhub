"use client";

import { supabase } from "../lib/supabase";

export default function AdminLogoutButton() {
  async function logout() {
    await supabase.auth.signOut();

    document.cookie =
      "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    localStorage.removeItem("isAdmin");

    window.location.href = "/login";
  }

  return (
    <button
  onClick={logout}
  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition duration-200"
>
  🚪 Logout
</button>
  );
}