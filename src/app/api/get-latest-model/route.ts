import { getChats } from "@/db/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const chats = await getChats(userId);
  const latestModel = chats?.[0]?.model || "gpt-4o"; // 默认值

  return NextResponse.json({ model: latestModel });
}