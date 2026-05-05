"use client";

import Link from "next/link";
import React from "react";
import { useLoading } from "../utils/loadingWrapper";
import { useCursor } from "../cursorContext";

export default function ButtonRandom() {
  const { setCursorMode } = useCursor();
  const { startTransition } = useLoading();
  return (
    <Link
      href="/projects"
      className="px-4 py-2 border border-primary/20 text-[#71717A] bg-background font-mono text-xs xl:w-fit w-full text-center cursor-none "
      onClick={(e) => {
        e.preventDefault();
        startTransition("/projects");
      }}
      onMouseEnter={() =>
        setCursorMode({ type: "label", text: "Explore Archives!" })
      }
      onMouseLeave={() => setCursorMode({ type: "default" })}
    >
      SEE OTHERS
    </Link>
  );
}
