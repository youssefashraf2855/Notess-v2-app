import prisma from "@/lib/db";
import CreatePostForm from "@/components/createPostForm";
import { getSessionUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Plus,
  ArrowRight,
  Search,
  X,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PostsPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function Posts({
  searchParams,
}: PostsPageProps) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userId = Number(user.id);

  if (!Number.isInteger(userId)) {
    redirect("/sign-in");
  }

  // Get search value from URL
  const params = await searchParams;
  const search = params.search?.trim() || "";

  // Get only this user's notes
  const posts = await prisma.note.findMany({
    where: {
      userId,

      // Only add search filtering when there is a search term
      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                content: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },

    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-violet-600">
              <FileText className="h-4 w-4" />

              Your workspace
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              My Notes
            </h1>

            <p className="mt-2 text-slate-500">
              Welcome back, {user.name}. Keep your thoughts organized.
            </p>
          </div>

          <div className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            {posts.length}{" "}
            {posts.length === 1 ? "note" : "notes"}
          </div>
        </div>

        {/* ================= SEARCH ================= */}

        <section className="mb-10">
          <form method="GET" action="/posts">
            <div className="relative">

              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                name="search"
                defaultValue={search}
                placeholder="Search your notes..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-12 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />

              {search && (
                <Link
                  href="/posts"
                  className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </Link>
              )}
            </div>
          </form>

          {search && (
            <p className="mt-3 text-sm text-slate-500">
              Showing results for{" "}
              <span className="font-semibold text-slate-700">
                "{search}"
              </span>
            </p>
          )}
        </section>

        {/* ================= CREATE NOTE ================= */}

        {!search && (
          <section className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-violet-50 to-indigo-50 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-200">
                  <Plus className="h-5 w-5 text-white" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Create a new note
                  </h2>

                  <p className="text-sm text-slate-500">
                    Capture an idea, thought, or anything important.
                  </p>
                </div>

              </div>
            </div>

            <div className="p-6 sm:p-8">
              <CreatePostForm />
            </div>
          </section>
        )}

        {/* ================= NOTES ================= */}

        <section>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {search ? "Search results" : "Your Notes"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {search
                ? `Notes matching "${search}"`
                : "Everything you've written, all in one place."}
            </p>
          </div>

          {/* ================= EMPTY STATE ================= */}

          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
                {search ? (
                  <Search className="h-7 w-7 text-violet-600" />
                ) : (
                  <FileText className="h-7 w-7 text-violet-600" />
                )}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {search
                  ? "No notes found"
                  : "No notes yet"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {search
                  ? `We couldn't find any notes matching "${search}". Try another search term.`
                  : "Your workspace is waiting for your first idea. Create a note above and start building your personal collection."}
              </p>

              {search && (
                <Link
                  href="/posts"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  View all notes

                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

            </div>
          ) : (

            /* ================= NOTES GRID ================= */

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/50"
                >

                  {/* Top */}

                  <div className="mb-5 flex items-center justify-between">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100">
                      <FileText className="h-4 w-4 text-violet-600" />
                    </div>

                    <span className="text-xs text-slate-400">
                      {formatDate(post.updatedAt)}
                    </span>

                  </div>

                  {/* Content */}

                  <Link
                    href={`/posts/${post.id}`}
                    className="flex-1"
                  >
                    <h3 className="line-clamp-2 text-lg font-bold text-slate-900 transition group-hover:text-violet-600">
                      {post.title}
                    </h3>

                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-500">
                      {post.content}
                    </p>
                  </Link>

                  {/* Footer */}

                  <Link
                    href={`/posts/${post.id}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
                  >
                    Open note

                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>

                </article>
              ))}

            </div>
          )}

        </section>
      </div>
    </main>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}