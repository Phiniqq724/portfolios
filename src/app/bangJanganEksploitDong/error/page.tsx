"use client";

import Link from "next/link";
import React from "react";

export default function ErrorHandler() {
  return (
    <section className="w-full h-screen flex flex-col gap-2 justify-center items-center">
      Kalo dipikir-pikir lagi, kenapa ya aku bisa disini?
      <Link
        href={"/"}
        className="px-4 py-2 border border-primary/20 text-[#71717A] bg-background font-mono text-xs hover:border-primary hover:text-primary transition-colors duration-200 mt-4"
      >
        BALIK AH
      </Link>
    </section>
  );
}
