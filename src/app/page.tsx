"use client";

import { useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { usePreferredModel } from "@/hooks/usePreferredModel";
import MobileMenuButton from "@/components/MobileMenuButton";

export default function Home() {
  const [input, setInput] = useState("");
  const { model, toggleModel } = usePreferredModel();

  const queryClient = useQueryClient();
  const router = useRouter();

  const { user } = useUser();

  //Mutations 更新操纵
  const { mutate: createChat } = useMutation({
    mutationFn: async () => {
      return axios.post("/api/create-chat", {
        title: input,
        modelName: model,
      });
    },
    onSuccess: (res) => {
      // Invalidate and refetch
      router.push(`/chat/${res.data.id}`);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  const handleSubmit = () => {
    if (input.trim() === "") return;

    if (!user) {
      router.push("/sign-in");
      return;
    }

    createChat();
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <MobileMenuButton></MobileMenuButton>
      <div className="h-1/5"></div>
      <div className="w-1/2">
        <p className="text-bold text-2xl text-center">How can I help you?</p>
        <div className="flex flex-col items-center justify-center mt-4 shadow-lg border-[1px] border-gray-300 h-32 rounded-lg">
          <textarea
            className="w-full rounded-lg p-3 h-30 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
                  Current Model: {model === "gpt-4o" ? "ChatGPT-4o" : "DeepSeek-V3"}
                </p>
              </div>
            </div>
            <div
              className="flex items-center cursor-pointer justify-center border-2 border-black mr-4 p-1 rounded-full"
              onClick={handleSubmit}
            >
              <EastIcon></EastIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
