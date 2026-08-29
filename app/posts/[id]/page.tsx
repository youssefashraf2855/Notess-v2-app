import prisma from "@/lib/db";

export default async function Post(
    {params}:{params: Promise<{id:string}>}
) {
    const {id} = await params;
  const post = await prisma.note.findUnique({
    where:{
        id:Number(id)
    }
  })
  return (
    <div>
      <h1>Post</h1>
        <div key={post?.id}>
          <h2>{post?.title}</h2>
          <p>{post?.content}</p>
        </div>
     
    </div>
  );
}