import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <section className="w-full h-screen flex flex-col items-center gap-4 justify-center">
      It seems like you&apos;re trying to access a page that doesn&apos;t exist.
      Please consider go back to the homepage.
      <Link
        href="/"
        className="ml-2 px-4 py-2 border border-primary/20 text-secondary-foreground bg-background font-mono text-xs"
      >
        Go Back
      </Link>
    </section>
  );
}
