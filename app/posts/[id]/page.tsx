import prisma from "@/lib/db";
import { updatePost, deletePost } from "@/actions/actions";
import { notFound } from "next/navigation";
import UpdatePostForm from "@/components/updatePostForm";
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const postId = Number(id);

  if (Number.isNaN(postId)) {
    notFound();
  }

  const post = await prisma.note.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    notFound();
  }

  // Pass the ID from params to the Server Actions
  const updatePostWithId = updatePost.bind(null, postId);
  const deletePostWithId = deletePost.bind(null, postId);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">

        <a
          href="/posts"
          className="mb-6 inline-block text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to notes
        </a>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Edit Note
          </h1>

          {/* Update */}
          
        <UpdatePostForm post={post}/>
          {/* Delete */}
          <div className="mt-8 border-t border-gray-200 pt-6">

            <form action={deletePostWithId}>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
              >
                Delete Note
              </button>
            </form>

          </div>

        </div>
      </div>
    </main>
  );
}