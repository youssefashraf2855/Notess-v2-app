import prisma from "@/lib/db";
import { NextResponse } from "next/server";
//1- not put anything  2- put not correct email(@ not on it , .com , the name should be have of course letters not only numbers) 
// 3- pass (verysmall ) pass : at least 8char have letters numbers minimum 
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Regex helpers
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasLetterAndNumber = /^(?=.*[a-zA-Z])(?=.*\d)/;

    // 1. Validate Name
    if (!name || !name.trim()) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }
    if (!nameRegex.test(name)) {
      return NextResponse.json(
        { message: 'Name must contain letters only' },
        { status: 400 }
      );
    }

    // 2. Validate Email
    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // 3. Validate Password
    if (!password) {
      return NextResponse.json({ message: 'Password is required' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    if (!hasLetterAndNumber.test(password)) {
      return NextResponse.json(
        { message: 'Password must contain both letters and numbers' },
        { status: 400 }
      );
    }

    // Save user directly without hashing
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password,
      },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}