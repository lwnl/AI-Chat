import { getMessagesByChatId } from "@/db/lib/db";
import { auth } from "@clerk/nextjs/server";
import { unauthorized } from "next/navigation"
export async function POST(req: Request) {
  const {chat_id, chat_user_id} = await req.json()
  const { userId } = await auth();

  if(!userId || chat_user_id !== userId) {
    return new Response(JSON.stringify({error: unauthorized}), {status:403})
  }
  const messages = await getMessagesByChatId(chat_id)

  return new Response(JSON.stringify(messages), {status:200})
}