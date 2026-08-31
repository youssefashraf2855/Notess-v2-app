import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('user_session');
    const router = useRouter();
    router.push("/sign-in")
  return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
}