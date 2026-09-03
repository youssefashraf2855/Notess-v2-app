import crypto from "node:crypto";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

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

    // Create a new 5-digit code
    const verificationToken = crypto
      .randomInt(10000, 100000)
      .toString();

    // Code expires in 10 minutes
    const verificationTokenExpires = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // Save the new code
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verificationToken,
        verificationTokenExpires,
      },
    });

    // Send the new code
    await sendVerificationEmail(
      user.email,
      user.name,
      verificationToken
    );

    return NextResponse.json(
      { message: "Verification code sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send verification error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}