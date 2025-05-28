import { createChat } from "@/db/lib/db";
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  const { title, modelName } = await req.json()

  const { userId } = await auth()
  if (userId) {
    try {
      const newChat = await createChat(title, userId, modelName);
      return new Response(JSON.stringify({ id: newChat?.id }), { status: 200 });
    } catch (error) {
      console.error("Error creating chat:", error);
      return new Response(JSON.stringify({ error: "Failed to create chat" }), { status: 500 });
    }
  }

  return new Response(null, {status:200})
}