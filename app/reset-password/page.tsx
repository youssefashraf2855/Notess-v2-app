"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) {
      setMessage("Email is required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/users/resetPass/checkEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      router.push(
        `/reset-password/verify?email=${encodeURIComponent(email)}`
      );
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
          Reset password
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Enter your email and we will send you a reset code.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage("");
            }}
            placeholder="you@example.com"
            className="w-full rounded-lg border p-3"
          />

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
            {loading ? "Sending..." : "Send reset code"}
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