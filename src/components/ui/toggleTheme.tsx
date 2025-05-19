"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function ThemeToggleDropdownItem() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = storedTheme === "dark" || (!storedTheme && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <DropdownMenuItem className="p-0 cursor-pointer" onClick={toggleTheme}>
      {isDark ? <Sun className="mr-2 h-4 w-4 text-white" /> : <Moon className="mr-2 h-4 w-4 text-black" />}
      Theme
    </DropdownMenuItem>
  );
}
