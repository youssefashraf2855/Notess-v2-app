import prisma from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { NextResponse } from "next/server";
import crypto from "node:crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required",
        },
        {
          status: 400,
        }
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
        {
          message: "There is no user with this email",
        },
        {
          status: 404,
        }
      );
    }

    const resetPasswordToken = crypto
      .randomInt(10000, 100000)
      .toString();

    const resetPasswordTokenExpires = new Date(
      Date.now() + 10 * 60 * 1000
    );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken,
        resetPasswordTokenExpires,
      },
    });

    await sendVerificationEmail(
      user.email,
      user.name,
      resetPasswordToken
    );

    return NextResponse.json(
      {
        message: "Password reset code sent",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Password reset request error:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}