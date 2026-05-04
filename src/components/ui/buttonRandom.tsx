"use client";

import Link from "next/link";
import React from "react";
import { handleScrollTo } from "../navbar";
import { useRouter } from "next/navigation";
import { useLoading } from "../utils/loadingWrapper";

export default function ButtonRandom() {
  const router = useRouter();
  const { startTransition } = useLoading();
  return (
    <Link
      href="/projects"
      className="px-4 py-2 border border-primary/20 text-[#71717A] bg-background font-mono text-xs xl:w-fit w-full text-center cursor-none "
      onClick={(e) => {
        e.preventDefault();
        startTransition("/projects");
      }}
    >
      SEE OTHERS
    </Link>
  );
}
