import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session');

  if (!sessionCookie) {
    return NextResponse.json(
      { loggedIn: false, session: null },
      { status: 200 }
    );
  }

  try {
    const sessionData = JSON.parse(sessionCookie.value);
    return NextResponse.json(
      { loggedIn: true, session: sessionData },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { loggedIn: false, error: 'Invalid session data' },
      { status: 400 }
    );
  }
}