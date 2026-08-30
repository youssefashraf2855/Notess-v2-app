"use client"

import { createPost } from "@/actions/actions";
import { useActionState } from "react";

export default  function CreatePostForm() {
      const [state,formAction] = useActionState(createPost,null);
    return(
        <form action={formAction} className="space-y-5">
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
            {state?.error &&(
              <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
          {state.error}
        </div>
            )}
          </form>
    )
}