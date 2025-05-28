import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // 加载 .env 中的 API Key

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testKey() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // 或 "gpt-3.5-turbo"
      messages: [{ role: "user", content: "你是谁？" }],
    });

    console.log("✅ API Key 工作正常");
    console.log("AI 回复：", response.choices[0].message.content);
  } catch (error) {
    console.error("❌ API 请求失败：", error.message || error);
  }
}

testKey();