import prisma from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { createPost } from "./actions";


jest.mock("@/lib/db", () => ({
  default: {
    note: {
      create: jest.fn(),
    },
  },
}));

jest.mock("@/lib/session", () => ({
  getSessionUser: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// describe("createPost", () => {
//   test("returns error when user is not logged in", async () => {
//     (getSessionUser as jest.Mock).mockResolvedValue(null);

//     const formData = new FormData();

//     formData.append("title", "My first note");
//     formData.append("content", "Hello world");

//     const result = await createPost(null, formData);

//     expect(result).toEqual({
//       error: "You must be logged in to create a note.",
//     });
//   });
// });

describe("createPost",()=>{
    test("returns error when user is not logged in",async()=>{
        (getSessionUser as jest.Mock).mockResolvedValue(null);
        const formData = new FormData();
        formData.append("title","unit test title")
        formData.append("content","unit test content")
        const result = await createPost(null , formData);
        expect(result).toEqual({
            error:"You must be logged in to create a note."
        })
    })
})