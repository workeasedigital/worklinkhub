"use client";

import { supabase } from "../lib/supabase";

export default function AdminLogoutButton() {
  async function logout() {
    try {
      await supabase.auth.signOut();

      document.cookie =
        "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

      localStorage.removeItem("isAdmin");

      window.location.replace("/login");
    } catch (error) {
      console.error(error);
      alert("Logout failed");
    }
  }

  return (
    <button
      onClick={logout}
      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold"
    >
      🚪 Logout
    </button>
  );
}