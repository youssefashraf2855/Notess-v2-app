"use client";

import Link from "next/link";

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const handleLogout = async () => {
    const res = await fetch("/api/users/logout", {
      method: "POST",
    });

    if (res.ok) {
      window.location.href = "/sign-in";
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-gray-900">
        NotesApp
      </Link>

      <nav className="flex items-center space-x-6">
        <Link
          href="/posts"
          className="text-gray-600 hover:text-gray-900 transition font-medium"
        >
          Posts
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
          >
            Log Out
          </button>
        ) : (
          <Link
            href="/sign-in"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
          >
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}