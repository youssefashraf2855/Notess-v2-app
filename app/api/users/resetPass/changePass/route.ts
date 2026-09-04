import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }

    const hasLetterAndNumber = /^(?=.*[a-zA-Z])(?=.*\d)/;

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    if (!hasLetterAndNumber.test(password)) {
      return NextResponse.json(
        { message: "Password must contain both letters and numbers" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "There is no user with this email" },
        { status: 404 }
      );
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: password,
      },
    });

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}