"use client";

import { useMenu } from "@/context/MenuContext";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileMenuButton() {
  const { menuOpen, setMenuOpen } = useMenu();
  const Icon = menuOpen ? X : Menu;

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 800);
    handleResize(); // 初始化判断
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isSmallScreen) return null; // 大于 800px 不渲染

  return (
    <Icon
      className="fixed top-8.5 left-1 z-50 cursor-pointer bg-[#8EC6FF]"
      size={28} // 图标大小 28px
      strokeWidth={2.5} // 线条粗细，可调
      onClick={() => setMenuOpen((prev) => !prev)}
    />
  );
}
