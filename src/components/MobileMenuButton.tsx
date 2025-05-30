"use client";

import { useMenu } from "@/context/MenuContext";
import { Menu } from "lucide-react";

export default function MobileMenuButton() {
  const { setMenuOpen } = useMenu();
  return (
    <Menu
      className="fixed top-10 left-6 z-50 block sm:hidden"
      onClick={() => {
        setMenuOpen((prev) => !prev);
      }}
    />
  );
}
