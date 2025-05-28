import { createDeepSeek } from '@ai-sdk/deepseek';
import { auth } from '@clerk/nextjs/server';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

import axios from 'axios';
import { createMessage } from '@/db/lib/db';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
const CX = process.env.GOOGLE_CX!;

export async function searchLatestInfo(query: string): Promise<string> {
  try {
    const res = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GOOGLE_API_KEY,
        cx: CX,
        q: query,
        num: 5, // 返回前5条结果
      },
    });

    if (!res.data.items || res.data.items.length === 0) {
      return '未找到相关最新信息。';
    }

    // 拼接前5条搜索结果的标题和简短描述
    const snippets = res.data.items
      .map((item: any) => `- ${item.title}: ${item.snippet}`)
      .join('\n');

    return `根据最新搜索，以下是相关信息摘要：\n${snippets}`;
  } catch (error) {
    console.error('Google Custom Search 调用失败:', error);
    return '搜索服务暂时不可用。';
  }
}
export const maxDuration = 30;

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
  const systemPrompt = model === 'gpt-4o'
    ? `You are a helpful assistant based on OpenAI GPT-4o model.Use the following latest information to answer the user's questions accurately: Latest Information: ${searchResults}`
    : 'I am DeepSeek-V3, an advanced AI language model developed by DeepSeek (深度求索). My purpose is to assist with a wide range of tasks, including answering questions, generating text, analyzing data, coding, and much more!'

  const result = streamText({
      model: model.startsWith('gpt')
        ? openai(model)
        : deepseek('deepseek-chat'),
      system: systemPrompt,
      messages,
      onFinish: async (res) => {
        await createMessage(chat_id, res.text, 'assistant');
      }
    });

  return result.toDataStreamResponse();
}