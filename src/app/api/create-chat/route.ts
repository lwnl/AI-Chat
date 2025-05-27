import { createChat } from "@/db"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  const { title, model } = await req.json()

  const { userId } = await auth()
  if (userId) {
    try {
      const newChat = await createChat(title, userId, model);
      return new Response(JSON.stringify({ id: newChat?.id }), { status: 200 });
    } catch (error) {
      console.error("Error creating chat:", error);
      return new Response(JSON.stringify({ error: "Failed to create chat" }), { status: 500 });
    }
  }
}