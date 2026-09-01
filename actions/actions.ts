"use server";

import prisma from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(
  prevState: any,
  formData: FormData
) {
  // Get logged-in user
  const user = await getSessionUser();

  if (!user) {
    return {
      error: "You must be logged in to create a note.",
    };
  }

  const userId = Number(user.id);

  if (!Number.isInteger(userId)) {
    return {
      error: "Invalid user session.",
    };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title?.trim() || !content?.trim()) {
    return {
      error: "Title and content are required.",
    };
  }

  await prisma.note.create({
    data: {
      title: title.trim(),
      content: content.trim(),
      userId,
    },
  });

  revalidatePath("/posts");

  return {
    error: null,
    success: true,
  };
}

export async function updatePost(
  id: number,
  prevState: any,
  formData: FormData
) {
  // Get logged-in user
  const user = await getSessionUser();

  if (!user) {
    return {
      error: "You must be logged in to update a note.",
    };
  }

  const userId = Number(user.id);

  if (!Number.isInteger(userId)) {
    return {
      error: "Invalid user session.",
    };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title?.trim() || !content?.trim()) {
    return {
      error: "Title and content are required.",
    };
  }

  // Make sure this note belongs to the logged-in user
  const note = await prisma.note.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!note) {
    return {
      error: "Note not found or you don't have permission to edit it.",
    };
  }

  await prisma.note.update({
    where: {
      id,
    },
    data: {
      title: title.trim(),
      content: content.trim(),
    },
  });

  revalidatePath("/posts");

  redirect("/posts");
}

export async function deletePost(id: number) {
  // Get logged-in user
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userId = Number(user.id);

  if (!Number.isInteger(userId)) {
    redirect("/sign-in");
  }

  // Make sure this note belongs to the logged-in user
  const note = await prisma.note.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!note) {
    return;
  }

  await prisma.note.delete({
    where: {
      id,
    },
  });

  revalidatePath("/posts");

  redirect("/posts");
}