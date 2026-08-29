import prisma from "@/lib/db";

export default async function Posts() {
  const posts = await prisma.note.findMany();
  console.log(posts);
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
            <link rel="stylesheet" href={`/posts/${post.id}`} />
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}