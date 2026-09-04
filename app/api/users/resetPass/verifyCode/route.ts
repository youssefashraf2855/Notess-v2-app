import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        {
          message: "Email and verification code are required",
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

    if (!user.resetPasswordToken) {
      return NextResponse.json(
        {
          message: "No password reset code found",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !user.resetPasswordTokenExpires ||
      user.resetPasswordTokenExpires < new Date()
    ) {
      return NextResponse.json(
        {
          message: "Password reset code has expired",
        },
        {
          status: 400,
        }
      );
    }

    if (user.resetPasswordToken !== code.toString().trim()) {
      return NextResponse.json(
        {
          message: "Code not correct",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Correct code",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Password reset verification error:", error);

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