"use client";
import type { IChat } from "@/db/models/Chat";
import { useUser, useClerk } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type NavbarProps = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ menuOpen, setMenuOpen }: NavbarProps) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  console.log("pathname:", pathname);
  const { signOut } = useClerk();

  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await axios.post("/api/get-chats");
      return res.data; // 👈 提前返回真正的数据
    },
    enabled: isLoaded && !!user?.id,
  });

  console.log("chats:", chats);
  console.log("user:", user);

  const handleCreateNewChat = () => {
    router.push("/")
    setMenuOpen(false)
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-between p-4">
      {/* 顶部标题 */}
      <div>
        <div className="flex items-center justify-center">
          <p className="font-bold text-2xl">GPT / DeepSeek</p>
        </div>

        <div
          className="h-10 flex items-center justify-center mt-4 cursor-pointer"
          onClick={handleCreateNewChat}
        >
          <p className="h-full w-2/3 bg-blue-100 rounded-lg flex items-center justify-center font-thin">
            创建新会话
          </p>
        </div>

        {/* 会话目录 */}
        <div className="flex flex-col items-center justify-center gap-2 p-6">
          {chats?.map((chat: IChat) => (
            <div
              className="w-full h-10 cursor-pointer"
              key={chat._id as string}
              onClick={() => router.push(`/chat/${chat._id}`)}
            >
              <p
                className={`line-clamp-1 ${
                  pathname === `/chat/${chat._id as string}`
                    ? "font-bold"
                    : "font-extralight text-sm"
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
