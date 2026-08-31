import { cookies } from 'next/headers';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function getSessionUser(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session');

  if (!sessionCookie) return null;

  try {
    return JSON.parse(sessionCookie.value) as UserSession;
  } catch {
    return null;
  }
}

export async function isAdmin(): Promise<boolean> {
  const user = await getSessionUser();
  return user?.role === 'ADMIN'; // Assuming 'ADMIN' is your role value
}