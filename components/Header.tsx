"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/sign-in");
      router.refresh(); // Refresh route state so middleware updates immediately
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Brand / Logo */}
      <Link href="/" className="text-xl font-bold text-gray-900">
        NotesApp
      </Link>

      {/* Navigation & Logout */}
      <nav className="flex items-center space-x-6">
        <Link
          href="/posts"
          className="text-gray-600 hover:text-gray-900 transition font-medium"
        >
          Posts
        </Link>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </nav>
    </header>
  );
}