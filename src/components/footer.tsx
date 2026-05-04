import Link from "next/link";
import React from "react";

const FooterData = [
  {
    platform: "Email",
    url: "mailto:hey@mustpikek.dev",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/fahrell-sandy/",
  },
  {
    platform: "GitHub",
    url: "https://github.com/phiniqq724",
  },
];

export default function Footer() {
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
              <Link href={item.url} target="_blank" rel="noopener noreferrer">
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
