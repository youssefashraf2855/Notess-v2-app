"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

useEffect(() => {
  async function sendNewCode() {
    if (!email) return;

    await fetch("/api/users/send-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
  }

  sendNewCode();
}, [email]);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();

    if (code.length !== 5) {
      setMessage("Please enter the 5-digit code.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/users/emailVerify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: code,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setMessage("Email verified successfully!");

      setTimeout(() => {
        router.push("/posts");
        window.location.href = "/posts";
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
          Verify your email
        </h1>

        <p className="mt-3 text-center text-gray-600">
          We sent a verification code to:
        </p>

        <p className="mt-1 text-center font-semibold">
          {email}
        </p>

        <form onSubmit={handleVerify} className="mt-8">
          <label className="block mb-2 font-medium">
            Verification code
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
            {loading ? "Verifying..." : "Verify email"}
          </button>
        </form>

        <button
          onClick={() => router.push("/sign-up")}
          className="mt-5 w-full text-gray-500"
        >
          ← Back to sign up
        </button>
      </div>
    </main>
  );
}