"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title?.trim() || !content?.trim()) {
    throw new Error("Title and content are required");
  }

  await prisma.note.create({
    data: {
      title: title.trim(),
      content: content.trim(),
    },
  });

  revalidatePath("/posts");
}

export async function updatePost(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title?.trim() || !content?.trim()) {
    throw new Error("Title and content are required");
  }

  await prisma.note.update({
    where: {
      id: id,
    },
    data: {
      title: title.trim(),
      content: content.trim(),
    },
  });

  revalidatePath("/posts");
  revalidatePath(`/posts/${id}`);
}

export async function deletePost(id: number) {
  await prisma.note.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/posts");
}