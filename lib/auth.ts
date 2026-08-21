import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function requireUser() {
  const { userId } = await auth();
  return userId ? { userId, response: null } : { userId: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
}

export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) return { userId: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  return process.env.ADMIN_USER_ID === userId ? { userId, response: null } : { userId: null, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
}

