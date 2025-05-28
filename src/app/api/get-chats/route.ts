import { getChats } from "@/db/lib/db";
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (userId) {
    const chats = await getChats(userId)
    console.log("Fetched chats from DB:", chats); // 👈 添加这个

    return new Response(JSON.stringify(chats), { status: 200 })
  }

  return new Response(null, { status: 200 })
}