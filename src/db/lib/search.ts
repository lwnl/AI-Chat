import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
const CX = process.env.GOOGLE_CX!;

export async function searchLatestInfo(query: string): Promise<string> {
  try {
    const res = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GOOGLE_API_KEY,
        cx: CX,
        q: query,
        num: 10,
      },
    });

    if (!res.data.items || res.data.items.length === 0) {
      return '未找到相关最新信息。';
    }

    const snippets = res.data.items
      .map((item: any) => `- ${item.title}: ${item.snippet}`)
      .join('\n');

    return `根据最新搜索，以下是相关信息摘要：\n${snippets}`;
  } catch (error) {
    console.error('Google Custom Search 调用失败:', error);
    return '搜索服务暂时不可用。';
  }
}