"use client";

import {
  ArrowRight,
  Check,
  ChevronDown,
  Eye,
  FileText,
  Menu,
  Pencil,
  Plus,
  Rocket,
  Sparkles,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Plus,
    title: "Create Notes",
    description:
      "Capture your ideas, tasks, thoughts, and important information in seconds.",
    className: "bg-violet-50 text-violet-600",
  },
  {
    icon: Pencil,
    title: "Update Notes",
    description:
      "Edit your notes anytime and keep your information accurate and up to date.",
    className: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Trash2,
    title: "Delete Notes",
    description:
      "Remove notes you no longer need with a simple click. Keep everything clean.",
    className: "bg-rose-50 text-rose-600",
  },
  {
    icon: Eye,
    title: "View Your Notes",
    description:
      "Access all your notes from one beautiful, simple, and organized place.",
    className: "bg-blue-50 text-blue-600",
  },
];

const testimonials = [
  {
    quote:
      "Notess completely changed the way I organize my ideas. It's simple, beautiful, and incredibly easy to use.",
    name: "Sarah Johnson",
    role: "Student",
    initials: "SJ",
  },
  {
    quote:
      "I use Notess for both work and personal ideas. Everything I need is finally in one organized place.",
    name: "Michael Chen",
    role: "Product Manager",
    initials: "MC",
  },
  {
    quote:
      "Clean design, fast, and reliable. Notess is one of the best note-taking apps I've used.",
    name: "Priya Patel",
    role: "Designer",
    initials: "PP",
  },
];

const faqs = [
  {
    question: "Is Notess free to use?",
    answer:
      "Yes! You can create an account and start creating and managing your notes without any complicated setup.",
  },
  {
    question: "Can I edit my notes after creating them?",
    answer:
      "Absolutely. You can update your notes whenever you need to keep your information current.",
  },
  {
    question: "Can I delete notes?",
    answer:
      "Yes. Deleting a note takes just one click, helping you keep your workspace clean and organized.",
  },
  {
    question: "Will Notess get more features?",
    answer:
      "Yes! Notess is actively evolving. We're planning additional features such as folders, tags, reminders, rich text editing, dark mode, and more.",
  },
];

export default function HomePage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* ================= HEADER ================= */}
     

      {/* ================= HERO ================= */}
      <section className="relative min-h-[760px] overflow-hidden bg-[#09071b]">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute left-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-violet-600/30 blur-[140px]" />
          <div className="absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[130px]" />
          <div className="absolute bottom-[-30%] left-[30%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[130px]" />

          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:60px_60px]" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col px-6 pb-20 pt-36 lg:px-8 lg:pt-44">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Hero copy */}
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Simple notes. Powerful ideas.
              </div>

              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Your thoughts.
                <br />
                <span className="bg-gradient-to-r from-violet-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Organized beautifully.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
                Notess is a modern and simple note-taking app that helps you
                capture ideas, stay organized, and focus on what matters.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-500"
                >
                  Create Account
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>

                <a
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Sign in
                </a>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["SJ", "MC", "PP", "JD"].map((initials, index) => (
                    <div
                      key={initials}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0b0920] text-xs font-bold text-white ${
                        index === 0
                          ? "bg-violet-500"
                          : index === 1
                            ? "bg-blue-500"
                            : index === 2
                              ? "bg-emerald-500"
                              : "bg-orange-500"
                      }`}
                    >
                      {initials}
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    ★ ★ ★ ★ ★
                  </div>
                  <p className="text-sm text-slate-400">
                    Loved by note-takers everywhere
                  </p>
                </div>
              </div>
            </div>

            {/* Hero dashboard */}
            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-violet-500/20 blur-[80px]" />

              <div className="relative rotate-1 rounded-2xl border border-white/10 bg-white/[0.07] p-2 shadow-2xl backdrop-blur-xl">
                {/* Browser bar */}
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />

                  <div className="ml-4 flex-1 rounded-lg bg-white/5 px-4 py-1.5 text-xs text-slate-500">
                    app.notess.com
                  </div>
                </div>

                <div className="grid min-h-[390px] grid-cols-[150px_1fr] overflow-hidden rounded-xl bg-white">
                  {/* Sidebar */}
                  <div className="border-r border-slate-100 bg-slate-50 p-4">
                    <div className="mb-7 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold">Notess</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="rounded-lg bg-violet-100 px-3 py-2 font-medium text-violet-700">
                        All Notes
                      </div>
                      <div className="px-3 py-2 text-slate-500">
                        Favorites
                      </div>
                      <div className="px-3 py-2 text-slate-500">Trash</div>
                    </div>

                    <div className="mt-7 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Labels
                    </div>

                    <div className="mt-2 space-y-1 text-xs text-slate-500">
                      <div className="px-3 py-1.5">Personal</div>
                      <div className="px-3 py-1.5">Work</div>
                      <div className="px-3 py-1.5">Ideas</div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="p-5">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900">All Notes</h3>
                        <p className="mt-1 text-xs text-slate-400">
                          12 notes
                        </p>
                      </div>

                      <button className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white">
                        <Plus className="h-3.5 w-3.5" />
                        New Note
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <NoteCard
                        title="Project Ideas"
                        text="Some ideas for the next project..."
                        date="Today"
                        type="purple"
                      />

                      <NoteCard
                        title="Daily Plan"
                        text="Things I need to accomplish today."
                        date="Today"
                        type="yellow"
                      />

                      <NoteCard
                        title="Shopping List"
                        text="Milk, coffee, bread and vegetables."
                        date="Yesterday"
                        type="pink"
                      />

                      <NoteCard
                        title="Meeting Notes"
                        text="Important points from today's meeting."
                        date="Yesterday"
                        type="blue"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="border-b border-slate-100 bg-white py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-5 px-6 text-center sm:flex-row sm:text-left">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100">
            <Zap className="h-6 w-6 text-violet-600" />
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Everything you need to manage your notes.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Simple enough for everyone. Powerful enough for your ideas.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge>FEATURES</Badge>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Everything you need to
              <span className="block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                capture and organize
              </span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Notess gives you simple and powerful tools to manage your notes
              and focus on what matters.
            </p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/50"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.className}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-violet-600 opacity-0 transition group-hover:opacity-100">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <Badge>HOW IT WORKS</Badge>

              <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                From idea to organized note in seconds.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                We've designed Notess to stay out of your way. No complicated
                tools. No overwhelming interface. Just a simple place for your
                thoughts.
              </p>

              <div className="mt-10 space-y-7">
                <Step
                  number="01"
                  title="Create your account"
                  description="Sign up in seconds and get your personal notes workspace."
                />

                <Step
                  number="02"
                  title="Create your first note"
                  description="Write down anything that comes to mind and keep your ideas organized."
                />

                <Step
                  number="03"
                  title="Manage everything easily"
                  description="View, edit, and delete your notes whenever you need."
                />
              </div>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-violet-200/60 blur-[100px]" />

              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl">
                <div className="rounded-2xl bg-slate-950 p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Your workspace</p>
                      <h3 className="mt-1 text-xl font-bold text-white">
                        My Notes
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
                      <Plus className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Ideas for my next project",
                      "Things to remember",
                      "My daily goals",
                    ].map((note, i) => (
                      <div
                        key={note}
                        className="rounded-xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-1 h-2 w-2 rounded-full ${
                              i === 0
                                ? "bg-violet-400"
                                : i === 1
                                  ? "bg-emerald-400"
                                  : "bg-blue-400"
                            }`}
                          />

                          <div>
                            <p className="text-sm font-medium text-white">
                              {note}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              Updated recently
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= UPDATES ================= */}
      <section id="updates" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100 p-8 sm:p-12 lg:p-16">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />

            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge>ALWAYS IMPROVING</Badge>

                <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                  We're just
                  <span className="block text-violet-600">
                    getting started.
                  </span>
                </h2>

                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                  Notess is constantly evolving. We're working on new features
                  that will make your note-taking experience even better.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Rich text notes",
                    "Folders & tags",
                    "Dark mode",
                    "Reminders",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>

                <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-violet-500">
                  See what's coming
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Rocket illustration */}
              <div className="relative flex min-h-[300px] items-center justify-center">
                <div className="absolute h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />

                <div className="relative">
                  <div className="absolute -left-32 top-16 rounded-xl border border-white bg-white/80 px-4 py-3 text-xs font-semibold shadow-lg backdrop-blur">
                    Rich Text Notes
                  </div>

                  <div className="absolute -right-28 top-5 rounded-xl border border-white bg-white/80 px-4 py-3 text-xs font-semibold shadow-lg backdrop-blur">
                    Dark Mode
                  </div>

                  <div className="absolute -left-28 bottom-8 rounded-xl border border-white bg-white/80 px-4 py-3 text-xs font-semibold shadow-lg backdrop-blur">
                    Folders & Tags
                  </div>

                  <div className="absolute -right-28 bottom-16 rounded-xl border border-white bg-white/80 px-4 py-3 text-xs font-semibold shadow-lg backdrop-blur">
                    Reminders
                  </div>

                  <Rocket className="h-36 w-36 -rotate-45 text-violet-600 drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge>LOVED BY USERS</Badge>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              What our{" "}
              <span className="text-violet-600">users</span> say
            </h2>

            <p className="mt-5 text-lg text-slate-600">
              Thousands of people use Notess to stay organized and productive.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="text-3xl text-slate-200">"</div>

                <p className="mt-2 leading-7 text-slate-600">
                  {testimonial.quote}
                </p>

                <div className="mt-7 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                    {testimonial.initials}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center">
            <Badge>FAQ</Badge>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Frequently asked questions
            </h2>

            <p className="mt-5 text-lg text-slate-600">
              Everything you need to know about Notess.
            </p>
          </div>

          <div className="mt-12 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-6">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 py-6 text-left"
                  >
                    <span className="font-semibold text-slate-900">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-6 pr-8 text-sm leading-7 text-slate-500">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-20 text-center sm:px-12">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 shadow-xl shadow-violet-900/40">
              <Sparkles className="h-6 w-6 text-white" />
            </div>

            <h2 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Your next great idea starts here.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              Start organizing your thoughts today with Notess. It's simple,
              fast, and built for the way you think.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white transition hover:bg-violet-500"
              >
                Create Your Account
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#09071b] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <a href="#" className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">Notess</span>
              </a>

              <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
                A simple and beautiful note-taking app designed to help you
                organize your thoughts and ideas.
              </p>

              <div className="mt-6 flex gap-2">
                {["X", "G", "in"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <FooterColumn
              title="Product"
              links={["Features", "How it works", "Updates", "Roadmap"]}
            />

            {/* Company */}
            <FooterColumn
              title="Company"
              links={["About us", "Blog", "Careers", "Contact"]}
            />

            {/* Support */}
            <FooterColumn
              title="Support"
              links={["Help Center", "FAQ", "Privacy Policy", "Terms"]}
            />
          </div>

          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-7 text-sm text-slate-500 sm:flex-row">
            <p>© 2026 Notess. All rights reserved.</p>

            <p>Made for your thoughts.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-bold tracking-wider text-violet-700">
      {children}
    </span>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xs font-bold text-violet-700">
        {number}
      </div>

      <div>
        <h3 className="font-bold text-slate-900">{title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function NoteCard({
  title,
  text,
  date,
  type,
}: {
  title: string;
  text: string;
  date: string;
  type: "purple" | "yellow" | "pink" | "blue";
}) {
  const backgrounds = {
    purple: "bg-violet-50",
    yellow: "bg-amber-50",
    pink: "bg-rose-50",
    blue: "bg-blue-50",
  };

  return (
    <div
      className={`rounded-xl p-4 transition hover:-translate-y-1 ${backgrounds[type]}`}
    >
      <h4 className="text-sm font-bold text-slate-800">{title}</h4>
      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
        {text}
      </p>
      <p className="mt-3 text-[10px] font-medium text-slate-400">{date}</p>
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-slate-500 transition hover:text-white"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}