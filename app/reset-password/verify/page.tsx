"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();

    if (code.length !== 5) {
      setMessage("Please enter the 5-digit code.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/users/resetPass/verifyCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      router.push(
        `/reset-password/new-password?email=${encodeURIComponent(
          email
        )}&code=${encodeURIComponent(code)}`
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
          Enter reset code
        </h1>

        <p className="mt-3 text-center text-gray-600">
          We sent a 5-digit code to:
        </p>

        <p className="mt-1 text-center font-semibold">
          {email}
        </p>

        <form onSubmit={handleVerify} className="mt-8">
          <label className="block mb-2 font-medium">
            Reset code
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={code}
            onChange={(e) => {
              const value = e.target.value;

              if (/^\d*$/.test(value)) {
                setCode(value);
                setMessage("");
              }
            }}
            placeholder="12345"
            className="w-full rounded-lg border p-3 text-center text-2xl tracking-widest"
          />

          {message && (
            <p className="mt-4 text-center text-red-500">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || code.length !== 5}
            className="mt-6 w-full rounded-lg bg-blue-600 p-3 text-white disabled:bg-gray-300"
          >
            {loading ? "Checking..." : "Verify code"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => router.push("/reset-password")}
          className="mt-5 w-full text-gray-500"
        >
          ← Change email
        </button>
      </div>
    </main>
  );
}