import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config(); 

// 替换成你的 DeepSeek API Key 和 Base URL
const API_KEY = process.env.DEEPSEEK_API_KEY;
const BASE_URL = process.env.BASE_URL; // 或官方指定的最新URL
console.log("API_KEY:", API_KEY)
console.log("BASE_URL:", BASE_URL)

async function testDeepSeekAPI() {
    try {
        const response = await axios.post(
            `${BASE_URL}/chat/completions`,
            {
                model: "deepseek-chat", // 或 "deepseek-v3", "deepseek-v2"
                messages: [
                    { role: "user", content: "你好！请告诉我 1+1 等于几？" }
                ],
                temperature: 0.7,
                max_tokens: 50,
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('✅ API 请求成功！响应数据：');
        console.log(response.data);
    } catch (error) {
        console.error('❌ API 请求失败：');
        if (axios.isAxiosError(error)) {
            console.error('HTTP 状态码:', error.response?.status);
            console.error('错误信息:', error.response?.data || error.message);
        } else {
            console.error('未知错误:', error);
        }
    }
}

// 执行测试
testDeepSeekAPI();