"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function NewPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!password) {
      setMessage("Password is required.");
      return;
    }

    if (password.length < 8) {
      setMessage(
        "Password must be at least 8 characters long."
      );
      return;
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      setMessage(
        "Password must contain both letters and numbers."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/users/resetPass/changePass",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setMessage("Password changed successfully!");

      setTimeout(() => {
        router.push("/sign-in");
      }, 1000);
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-center">
          Create new password
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Enter your new password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="block mb-2 font-medium">
            New password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage("");
            }}
            placeholder="New password"
            className="w-full rounded-lg border p-3"
          />

          <p className="mt-2 text-sm text-gray-500">
            At least 8 characters and must contain a letter
            and a number.
          </p>

          {message && (
            <p className="mt-4 text-center text-red-500">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-600 p-3 text-white disabled:bg-gray-300"
          >
            {loading ? "Changing..." : "Change password"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => router.push("/sign-in")}
          className="mt-5 w-full text-gray-500"
        >
          ← Back to sign in
        </button>
      </div>
    </main>
  );
}