"use client";

import { useMenu } from "@/context/MenuContext";
import { Icon, Menu, X } from "lucide-react";

export default function MobileMenuButton() {
  const { menuOpen, setMenuOpen } = useMenu();
  const Icon = menuOpen ? X : Menu;

  return (
    <Icon
      className="fixed top-10 left-6 z-50 block cursor-pointer sm:hidden"
      onClick={() => {
        setMenuOpen((prev) => !prev);
      }}
    />
  );
}
