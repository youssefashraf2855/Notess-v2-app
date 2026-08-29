"use server";

import prisma from "@/lib/db";

export async function createPost(formData:FormData) {
    const post = await prisma.note.create({
        data:{
            title:formData.get("title") as string,
            content:formData.get("content") as string
        }
    })
    
}