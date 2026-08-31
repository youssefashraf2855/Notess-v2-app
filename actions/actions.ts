"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function createPost(prevState: any,formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title?.trim() || !content?.trim()) {
    return{error:"Title and content are required"};
  }

  await prisma.note.create({
    data: {
      title: title.trim(),
      content: content.trim(),
    },
  });
  revalidatePath("/posts");
  return { error: null, success: true };
}

export async function updatePost(
  id: number,
  prevState: any,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title?.trim() || !content?.trim()) {
    return { error: "Title and content are required." };
  }

  await prisma.note.update({
    where: { id },
    data: { title, content },
  });

  revalidatePath("/posts");
  redirect("/posts");
}

export async function deletePost(id: number) {
  await prisma.note.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/posts");
  redirect("/posts");
}