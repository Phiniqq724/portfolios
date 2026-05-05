"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useLoading } from "@/components/utils/loadingWrapper";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "iconsax-reactjs";
import { useCursor } from "./cursorContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useLoading();
  const [hovered, setHovered] = React.useState(false);

  const isDark = theme === "dark";

  const showMoon = isDark ? !hovered : hovered;
  const showSun = !showMoon;

  const { setCursorMode } = useCursor();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        startTransition(() => {
          setTheme(isDark ? "light" : "dark");
        });
      }}
      onMouseEnter={() => {
        setHovered(true);
        setCursorMode({
          type: "label",
          text: `${isDark ? "Lightmode" : "Darkmode"}`,
        });
      }}
      onMouseLeave={() => {
        setHovered(false);
        setCursorMode({ type: "default" });
      }}
      className="rounded-full w-9 h-9 hover:cursor-none"
    >
      <div className="relative h-[1.2rem] w-[1.2rem]">
        <Sun
          size="100%"
          className={`absolute inset-0 transition-all duration-300 ${
            showSun ? "rotate-0 scale-100" : "rotate-90 scale-0"
          }`}
        />
        <Moon
          size="100%"
          className={`absolute inset-0 transition-all duration-300 ${
            showMoon ? "rotate-0 scale-100" : "rotate-90 scale-0"
          }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
