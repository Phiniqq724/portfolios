"use client";

import Link from "next/link";
import React from "react";
import { useCursor } from "./cursorContext";

const FooterData = [
  {
    platform: "Email",
    url: "mailto:hey@mustpikek.dev",
    label: "Send me a letter 💌",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/fahrell-sandy/",
    label: "Connect me 🔗",
  },
  {
    platform: "GitHub",
    url: "https://github.com/phiniqq724",
    label: "Star me ✨",
  },
];

export default function Footer() {
  const { setCursorMode } = useCursor();

  return (
    <footer className="px-6 sm:px-12 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b pt-4 border-secondary pb-4 gap-6 sm:gap-0">
        <div className="space-y-1 text-sm">
          <p className="text-primary/75">Malang, Indonesia</p>
        </div>
        <ul className="flex gap-6 sm:gap-12">
          {FooterData.map((item) => (
            <li
              key={item.platform}
              className="text-sm text-primary/75 hover:text-primary duration-300 "
            >
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() =>
                  setCursorMode({
                    type: "label",
                    text: `${item.label}`,
                  })
                }
                onMouseLeave={() => setCursorMode({ type: "default" })}
              >
                {item.platform.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-center text-sm text-primary/75">
        &copy; {new Date().getFullYear()} Sandev. All rights reserved.
      </p>
    </footer>
  );
}
