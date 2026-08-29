import { createPost } from "@/actions/actions";
import prisma from "@/lib/db";

export default async function Posts() {
  const posts = await prisma.note.findMany();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            My Notes
          </h1>

          <p className="mt-2 text-gray-500">
            Create and manage your notes easily.
          </p>
        </div>

        {/* Create Post */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Create a new note
          </h2>

          <form action={createPost} className="space-y-5">

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>

              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter note title..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Content
              </label>

              <textarea
                id="content"
                name="content"
                rows={5}
                placeholder="Write your note..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
              Create Note
            </button>
          </form>
        </section>

        {/* Posts */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Notes
            </h2>

            <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-600">
              {posts.length} notes
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                No notes yet
              </h3>

              <p className="mt-2 text-gray-500">
                Create your first note using the form above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <a href={`/posts/${post.id}`}>
                    <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-gray-900 transition group-hover:text-blue-600">
                      {post.title}
                    </h3>
                  </a>

                  <p className="line-clamp-4 text-sm leading-6 text-gray-600">
                    {post.content}
                  </p>

                  <a
                    href={`/posts/${post.id}`}
                    className="mt-5 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Read more →
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}