import { createDeepSeek } from '@ai-sdk/deepseek';
import { auth } from '@clerk/nextjs/server';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

import axios from 'axios';
import { createMessage } from '@/db/lib/db';
import { searchLatestInfo } from '@/db/lib/search';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
const CX = process.env.GOOGLE_CX!;

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.BASE_URL
});

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { messages, model, chat_id, chat_user_id } = await req.json();

  const { userId } = await auth();
  if (!userId || userId !== chat_user_id) {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  }

  const lastMessage = messages[messages.length - 1];
  await createMessage(chat_id, lastMessage.content, lastMessage.role);

  // 调用搜索接口获取最新信息
  const searchResults = await searchLatestInfo(lastMessage.content);

  // 将搜索结果整合进system prompt，辅助模型回答
  const prefix = model.startsWith('gpt') ? 'ChatGPT:' : 'DeepSeek:';

  const systemPrompt = model === 'gpt-4o'
    ? `You are a helpful assistant based on OpenAI GPT-4o model. When answering, please start your reply with "${prefix}". Use the following latest information to answer user's questions accurately: ${searchResults}`
    : `I am DeepSeek-V3, an advanced AI language model. When answering, please start your reply with "${prefix}". My purpose is to assist with many tasks including answering questions, generating text, etc.`;

  const result = streamText({
    model: model.startsWith('gpt')
      ? openai(model)
      : deepseek('deepseek-chat'),
    system: systemPrompt,
    messages,
    onFinish: async (res) => {
      const prefix = model.startsWith('gpt') ? 'ChatGPT answered：' : 'DeepSeek answered：';
      const contentWithPrefix = `${prefix}${res.text}`;
      await createMessage(chat_id, contentWithPrefix, 'assistant');
    }
  });

  return result.toDataStreamResponse();
}