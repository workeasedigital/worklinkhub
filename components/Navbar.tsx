"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        <Link
  href="/"
  className="flex items-center gap-3"
>
  <Image
    src="/logo.png"
    alt="WorkLinkHub Logo"
    width={42}
    height={42}
    priority
  />

</Link>
        

        <div className="flex items-center gap-8 text-white">

          <Link href="/">Home</Link>

          <Link href="/workers">Workers</Link>

          <Link href="/jobs">Jobs</Link>

          <Link href="/pricing">Pricing</Link>

          {!user ? (
            <>
              <Link href="/login">
                Login
              </Link>

              <Link href="/signup">
                Signup
              </Link>
            </>
          ) : (
            <div className="relative">

              <button
                onClick={() =>
                  setShowMenu(!showMenu)
                }
                className="flex items-center gap-2"
              >
                👤

                <span>
                  {user.user_metadata?.full_name?.split(" ")[0] ||
                    "Account"}
                </span>

                ▼
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border">

                  <div className="p-4 border-b">

                    <p className="font-bold text-gray-900">
                      {user.user_metadata?.full_name ||
                        "User"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>

                  </div>

                  <Link
                    href="/profile"
                    className="block px-5 py-3 text-gray-800 hover:bg-gray-100"
                  >
                    👤 My Profile
                  </Link>

                  <Link
                    href="/my-payments"
                    className="block px-5 py-3 text-gray-800 hover:bg-gray-100"
                  >
                    💳 My Payments
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"
                  >
                    🚪 Logout
                  </button>

                </div>
              )}

            </div>
          )}

          <div className="scale-90">
  <LanguageSwitcher />
</div>

        </div>
      </div>
    </nav>
  );
}