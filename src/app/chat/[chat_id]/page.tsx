"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePreferredModel } from "@/hooks/usePreferredModel";
import { Menu } from "lucide-react";
import { useMenu } from "@/context/MenuContext";

export default function Page() {
  const { setMenuOpen } = useMenu();
  const params = useParams();
  const chat_id =
    typeof params?.chat_id === "string" ? params.chat_id : undefined;

  const { model, toggleModel } = usePreferredModel();

  const { data: chat } = useQuery({
    queryKey: ["chat", chat_id],
    queryFn: () => {
      if (!chat_id) throw new Error("No chat_id provided");
      return axios.post("/api/get-chat", { chat_id });
    },
    enabled: !!chat_id,
  });

  const { data: previousMessages } = useQuery({
    queryKey: ["messages", chat_id],
    queryFn: () => {
      return axios.post(`/api/get-messages`, {
        chat_id,
        chat_user_id: chat?.data?.userId,
      });
    },
    enabled: !!chat?.data?._id,
  });

  const { messages, input, handleInputChange, handleSubmit, append } = useChat({
    body: {
      model,
      chat_id,
      chat_user_id: chat?.data?.userId,
    },
    initialMessages: previousMessages?.data,
  });

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFirstMessage = async () => {
    if (chat?.data?.title && previousMessages?.data?.length === 0) {
      await append({
        role: "user",
        content: chat?.data.title,
      }),
        {
          model,
          chat_id,
          chat_user_id: chat?.data?.userId,
        };
    }
  };

  useEffect(() => {
    handleFirstMessage();
  }, [chat?.data?.title, previousMessages]);

  return (
    <div className="flex flex-col h-screen justify-between items-center">
      <Menu
        className="fixed top-10 left-6 z-50 block sm:hidden"
        onClick={() => {
          setMenuOpen(true);
        }}
      />
      {/* 聊天记录 */}
      <div className="flex flex-col justify-between flex-1 w-2/3 gap-8 overflow-y-auto">
        <div className="flex flex-col gap-8 flex-1">
          {messages?.map((message, index) => (
            <div
              key={message.id ?? `${message.role}-${message.content}-${index}`}
              className={`rounded-lg flex ${
                message?.role === "assistant"
                  ? "justify-start mr-18"
                  : "justify-end ml-10"
              }`}
            >
              <p
                className={`inline-block p-2 rounded-lg ${
                  message?.role === "assistant" ? "bg-blue-300" : "bg-slate-100"
                }`}
              >
                {message?.content}
              </p>
            </div>
          ))}
        </div>
        <div className="h-4" ref={endRef}></div>
      </div>
      {/* 输入框 */}
      <div className="flex flex-col items-center justify-center mt-4 shadow-lg border-[1px] border-gray-300 h-32 rounded-lg w-2/3">
        <textarea
          className="w-full rounded-lg p-3 h-30 focus:outline-none"
          value={input}
          onChange={handleInputChange}
        ></textarea>
        <div className="flex items-center justify-between w-full h-12 mb-2">
          <div>
            <div
              className={`flex items-center justify-center rounded-lg border-[1px] px-2 py-1 ml-2 cursor-pointer ${
                model === "deepseek-r1"
                  ? "border-blue-300 bg-blue-200"
                  : "border-gray-300"
              }`}
              onClick={toggleModel}
            >
              <p className="text-sm">
                当前模型：{model === "gpt-4o" ? "ChatGPT-4o" : "DeepSeek-V3"}
              </p>
            </div>
          </div>
          <div
            className="flex items-center cursor-pointer justify-center border-2 border-black mr-4 p-1 rounded-full hover:bg-blue-100"
            onClick={handleSubmit}
          >
            <EastIcon></EastIcon>
          </div>
        </div>
      </div>
    </div>
  );
}
