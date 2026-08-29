import { createPost } from "@/actions/actions";
import prisma from "@/lib/db";

export default async function Posts() {
  const posts = await prisma.note.findMany();
  console.log(posts);
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
            <a href={`/posts/${post.id}`}>
          <h2 >{post.title}</h2>
          </a>
          <p>{post.content}</p>
        </div>
      ))}

      <form action={createPost}>
        <h2>Title</h2>
        <input type="text" name="title" />
        <h2>Content</h2>
        <textarea name="content"  cols={4} ></textarea>
      </form>
    </div>
  );
}