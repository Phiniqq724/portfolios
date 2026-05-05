"use client";

import React from "react";
import { useCursor } from "../cursorContext";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CertList({ data }: { data: any[] }) {
  const { setCursorMode } = useCursor();
  return (
    <div className="space-y-4">
      {data?.map((project) => (
        <Link
          href={project.link}
          target="_blank"
          key={project.id}
          className="space-y-3 cursor-none animate-item"
          onMouseEnter={() =>
            setCursorMode({
              type: "image",
              src: project.images[0]!,
              alt: "preview",
            })
          }
          onMouseLeave={() => setCursorMode({ type: "default" })}
        >
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-xl font-mono font-medium uppercase">
                {project.role}
              </h1>
              <h1 className="text-lg font-normal text-secondary-foreground uppercase font-sans">
                {project.partner}
              </h1>
            </div>
            <p className="font-mono text-lg text-secondary-foreground/75">
              {project.year}
            </p>
          </div>
          {data.lastIndexOf(project) !== data.length - 1 && (
            <div className="w-full h-[0.5px] bg-secondary " />
          )}
        </Link>
      ))}
    </div>
  );
}
