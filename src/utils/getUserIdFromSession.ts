import { getServerSession } from "next-auth";

import { options } from "@/auth";
import db from "@/server/db";
import { Role, User } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getUserIdFromSession(): Promise<string | null> {
  try {
    const session = await getServerSession(options);
    if (!session || !session.user?.id) {
      return null;
    }

    return session.user.id;
  } catch (error) {
    return null;
  }
}

async function getUserRoleWithId(): Promise<{ userId: string; role: string } | null> {
  const userId = await getUserIdFromSession();
  if (!userId) return null;

  const user = await db.select().from(User).where(eq(User.id, userId)).limit(1);
  if (!user[0]?.role) return null;

  const role = await db.select().from(Role).where(eq(Role.id, user[0].role as string)).limit(1);
  if (!role[0]?.name) return null;

  return { userId, role: role[0].name };
}


export async function checkIfUserIsAdmin(): Promise<boolean> {
  const userRole = await getUserRoleWithId();
  return userRole?.role === "Admin";
}

export async function checkIfUserIsSpecialists(): Promise<boolean> {
  const userRole = await getUserRoleWithId();
  return userRole?.role === "Specialist";
}


export async function checkIfUserIsSuperAdmin(): Promise<boolean> {
  const userRole = await getUserRoleWithId();
  return userRole?.role === "SuperAdmin";
}

export async function checkIfIsRegularUser(): Promise<boolean> {
  const userRole = await getUserRoleWithId();
  return userRole?.role === "User";
}

export async function checkIfUserIsModerator(): Promise<boolean> {
  const userRole = await getUserRoleWithId();
  return userRole?.role === "Moderator";
}
