"use client";

import { chatModel } from "@/db/schema";
import { useUser, useClerk } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();

  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: () => axios.post("/api/get-chats"),
    enabled: !!user?.id,
  });

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-between p-4">
      {/* 顶部标题 */}
      <div>
        <div className="flex items-center justify-center">
          <p className="font-bold text-2xl">ChatGPT-4o</p>
        </div>

        <div
          className="h-10 flex items-center justify-center mt-4 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <p className="h-full w-2/3 bg-blue-100 rounded-lg flex items-center justify-center font-thin">
            创建新会话
          </p>
        </div>

        {/* 会话目录 */}
        <div className="flex flex-col items-center justify-center gap-2 p-6">
          {chats?.data?.map((chat: chatModel) => (
            <div
              className="w-full h-10 cursor-pointer"
              key={chat.id}
              onClick={() => router.push(`/chat/${chat.id}`)}
            >
              <p
                className={`font-extralight text-sm line-clamp-1 ${
                  pathname === `/chat/${chat.id}` ? "text-blue-700" : ""
                }`}
              >
                {chat?.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 用户信息与退出按钮 */}
      {user && (
        <div className="mt-4 text-center border-t pt-4">
          <p className="text-sm text-gray-500 mb-2">
            👤 {user.fullName || user.emailAddresses[0]?.emailAddress}
          </p>
          <button
            onClick={() => signOut(() => router.push("/sign-in"))}
            className="text-red-600 cursor-pointer border border-red-600 px-3 py-1 rounded hover:bg-red-100 text-sm"
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
