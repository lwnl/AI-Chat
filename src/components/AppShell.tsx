"use client";

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
  return (
    <div className="flex h-screen">
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute z-50 top-0 left-0 w-3/4 h-screen bg-gray-50 p-4 sm:static sm:block sm:w-1/5`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}
