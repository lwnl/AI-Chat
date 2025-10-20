"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { MenuProvider, useMenu } from "@/context/MenuContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <MenuProvider>
      <ShellLayout>{children}</ShellLayout>
    </MenuProvider>
  );
}

function ShellLayout({ children }: { children: React.ReactNode }) {
  const { menuOpen, setMenuOpen } = useMenu();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // 监听窗口宽度变化，小于 800px 时为小屏
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };
    handleResize(); // 初始化判断
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Navbar 容器 */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full bg-gray-50 p-4 w-64
          
          transition-transform duration-500 ease-in-out
          ${isSmallScreen ? (menuOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        `}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>

      {/* 内容区域 */}
      <div className={`w-full flex-1 ${!isSmallScreen ? "sm:pl-[20%]" : ""}`}>
        {children}
      </div>

    </div>
  );
}