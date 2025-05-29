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
  className={`
    fixed top-0 left-0 z-50 h-full bg-gray-50 p-4
    w-3/4 sm:w-1/5
    transition-transform duration-600 ease-in-out
    ${menuOpen ? "translate-x-0" : "-translate-x-full"} 
    sm:translate-x-0
  `}
>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
      <div className="w-full flex-1 sm:pl-[20%]">{children}</div>
    </div>
  );
}
