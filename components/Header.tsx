"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FileText,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function Header({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const res = await fetch("/api/users/logout", {
        method: "POST",
      });

      if (res.ok) {
        window.location.href = "/sign-in";
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  return (
    <header className="absolute bg-blue-700 left-0 right-0 top-0 z-50 mb-80">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* ================= LOGO ================= */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20 transition duration-300 group-hover:scale-105">
              <FileText className="h-5 w-5 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">
                Notess
              </span>

              <span className="-mt-0.5 text-[10px] font-medium tracking-wide text-white/50">
                YOUR THOUGHTS, ORGANIZED.
              </span>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden items-center gap-8 lg:flex">
            <NavLink href="/#features">Features</NavLink>

            <NavLink href="/#how-it-works">
              How it works
            </NavLink>

            <NavLink href="/#updates">Updates</NavLink>

            <NavLink href="/#faq">FAQ</NavLink>
          </nav>

          {/* ================= DESKTOP ACTIONS ================= */}
          <div className="hidden items-center gap-2 md:flex">
            {isLoggedIn ? (
              <>
                <Link
                  href="/posts"
                  className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  My Notes
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 backdrop-blur transition hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LogOut className="h-4 w-4" />

                  {loggingOut ? "Logging out..." : "Log out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  Sign in
                </Link>

                <Link
                  href="/sign-up"
                  className="group flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-violet-700 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Create Account

                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur transition hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="px-4 md:hidden">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0920]/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            {/* Mobile links */}
            <nav className="flex flex-col">
              <MobileNavLink
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </MobileNavLink>

              <MobileNavLink
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it works
              </MobileNavLink>

              <MobileNavLink
                href="/#updates"
                onClick={() => setMobileMenuOpen(false)}
              >
                Updates
              </MobileNavLink>

              <MobileNavLink
                href="/#faq"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </MobileNavLink>
            </nav>

            <div className="my-4 h-px bg-white/10" />

            {/* Mobile actions */}
            {isLoggedIn ? (
              <div className="space-y-2">
                <Link
                  href="/posts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  My Notes
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
                >
                  <LogOut className="h-4 w-4" />

                  {loggingOut ? "Logging out..." : "Log out"}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  Sign in
                </Link>

                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ================= DESKTOP NAV LINK ================= */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative text-sm font-medium text-white/65 transition hover:text-white"
    >
      {children}

      <span className="absolute -bottom-2 left-0 h-px w-0 bg-violet-400 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

/* ================= MOBILE NAV LINK ================= */

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-white/75 transition hover:bg-white/5 hover:text-white"
    >
      {children}

      <ChevronDown className="-rotate-90 h-4 w-4 text-white/30" />
    </Link>
  );
}