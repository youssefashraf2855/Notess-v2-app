import crypto from "node:crypto";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    console.log("=== SEND VERIFICATION START ===");

    const body = await request.json();
    const { email } = body;

    console.log("Email received:", email);

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    console.log("User found:", user);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 400 }
      );
    }

    const verificationToken = crypto
      .randomInt(10000, 100000)
      .toString();

    console.log("Generated token:", verificationToken);

    const verificationTokenExpires = new Date(
      Date.now() + 10 * 60 * 1000
    );

    console.log(
      "Token expires:",
      verificationTokenExpires
    );

    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verificationToken,
        verificationTokenExpires,
      },
    });

    console.log("DATABASE UPDATED:", updateUser);

    const emailResult = await sendVerificationEmail(
      user.email,
      user.name,
      verificationToken
    );

    console.log("EMAIL RESULT:", emailResult);

    return NextResponse.json(
      {
        message: "Verification code sent",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("SEND VERIFICATION ERROR:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}