"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ShareButton from "./ShareButton";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          Intervue<span className="text-zinc-500">Exp</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ShareButton />

          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm">🌙</span>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          </div>
        </div>

      </div>
    </nav>
  );
}
