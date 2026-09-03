"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [code, setCode] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(600);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  // Handle typing
  const handleChange = (value: string, index: number) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);

    setCode(newCode);
    setError("");
    setSuccess("");

    // Move to next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedCode = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 5);

    if (!pastedCode) return;

    const newCode = ["", "", "", "", ""];

    pastedCode.split("").forEach((number, index) => {
      newCode[index] = number;
    });

    setCode(newCode);

    const nextIndex = Math.min(pastedCode.length, 4);
    inputRefs.current[nextIndex]?.focus();
  };

  // Verify code
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const verificationCode = code.join("");

    if (verificationCode.length !== 5) {
      setError("Please enter the complete 5-digit code.");
      return;
    }

    if (!email) {
      setError("Email address is missing.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/users/emailVerify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid verification code.");
        return;
      }

      setSuccess("Your email has been verified successfully!");

      // Redirect to posts
      setTimeout(() => {
        router.push("/posts");
      }, 1000);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend code
  const handleResend = async () => {
    setError("");
    setSuccess("");

    setResending(true);

    try {
      /*
       * We will connect this to a resend-code API
       * in the next step.
       */

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("A new verification code has been sent.");
      setSecondsLeft(600);
      setCode(["", "", "", "", ""]);

      inputRefs.current[0]?.focus();
    } catch (error) {
      setError("Could not resend the code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Notes
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-7 sm:p-9">

          {/* Email Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-8 h-8 text-blue-600"
              >
                <rect
                  width="20"
                  height="16"
                  x="2"
                  y="4"
                  rx="2"
                />
                <path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Verify your email
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              We&apos;ve sent a 5-digit verification code to
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800 break-all">
              {email || "your email address"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} className="mt-8">

            <label className="block text-sm font-medium text-slate-700 text-center mb-4">
              Enter verification code
            </label>

            {/* Code Inputs */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }
                  onPaste={handlePaste}
                  className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl border-2 border-slate-200 bg-slate-50 text-center text-xl sm:text-2xl font-bold text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  aria-label={`Verification digit ${index + 1}`}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center mt-5">
              {secondsLeft > 0 ? (
                <p className="text-sm text-slate-500">
                  Code expires in{" "}
                  <span className="font-semibold text-slate-700">
                    {minutes}:{seconds.toString().padStart(2, "0")}
                  </span>
                </p>
              ) : (
                <p className="text-sm font-medium text-red-500">
                  Your verification code has expired.
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="mt-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
                <p className="text-sm text-red-600 text-center">
                  {error}
                </p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mt-5 rounded-xl bg-green-50 border border-green-100 px-4 py-3">
                <p className="text-sm text-green-600 text-center">
                  {success}
                </p>
              </div>
            )}

            {/* Verify button */}
            <button
              type="submit"
              disabled={
                loading ||
                code.join("").length !== 5 ||
                secondsLeft <= 0
              }
              className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              {loading ? "Verifying..." : "Verify email"}
            </button>
          </form>

          {/* Resend */}
          <div className="mt-7 text-center">
            <p className="text-sm text-slate-500">
              Didn&apos;t receive the code?
            </p>

            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:text-slate-400"
            >
              {resending ? "Sending..." : "Resend code"}
            </button>
          </div>

          {/* Back */}
          <div className="mt-7 pt-6 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => router.push("/sign-up")}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              ← Back to sign up
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          By creating an account, you agree to our terms and privacy policy.
        </p>
      </div>
    </main>
  );
}

