"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Project } from "@/utils/supabase";
import { usePathname } from "next/navigation";
import { Sort } from "iconsax-reactjs";
import { useLoading } from "./loadingWrapper";
import { useCursor } from "../cursorContext";
const filters = ["ALL", "PROJECT", "WEB", "MOBILE"];
const ITEMS_PER_PAGE = 3;

const categoryMap: Record<string, string> = {
  PROJECT: "PROJECT",
  "NEXT.JS": "WEB",
  REACT: "WEB",
  VUE: "WEB",
  NUXT: "WEB",
  PHP: "WEB",
  LARAVEL: "WEB",
  SVELTE: "WEB",
  ANGULAR: "WEB",
  HTML: "WEB",
  CSS: "WEB",
  "REACT NATIVE": "MOBILE",
  FLUTTER: "MOBILE",
  SWIFT: "MOBILE",
  KOTLIN: "MOBILE",
  EXPO: "MOBILE",
  "NODE.JS": "BACKEND",
  EXPRESS: "BACKEND",
  NESTJS: "BACKEND",
  DJANGO: "BACKEND",
  FASTAPI: "BACKEND",
  GOLANG: "BACKEND",
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  const pathname = usePathname();
  const [active, setActive] = useState("ALL");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const { startTransition } = useLoading();
  const { setCursorMode } = useCursor();
  const getCategories = (techStack: string[]): string[] => {
    const categories = new Set<string>();
    for (const tech of techStack) {
      const category = categoryMap[tech.toUpperCase()];
      if (category) categories.add(category);
    }
    return categories.size > 0 ? Array.from(categories) : ["PROJECT"];
  };
  const sortLabels: Record<string, string> = {
    RECENCY: "SORTED BY RECENCY",
    A_Z: "SORTED A → Z",
    Z_A: "SORTED Z → A",
  };

  const sortCycle = ["RECENCY", "A_Z", "Z_A"] as const;
  type SortOrder = (typeof sortCycle)[number];

  const filtered =
    active === "ALL"
      ? projects
      : projects.filter((p) => getCategories(p.tech_stack).includes(active));
  const hasMore = displayCount < filtered.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const [sortOrder, setSortOrder] = useState<SortOrder>("RECENCY");

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "A_Z") return a.name.localeCompare(b.name);
    if (sortOrder === "Z_A") return b.name.localeCompare(a.name);
    return 0;
  });

  const displayed = sorted.slice(0, displayCount);

  return (
    <>
      <div className="flex md:flex-row flex-col justify-between md:items-end items-start xl:gap-32 gap-10">
        {pathname === "/projects" ? (
          <div className="space-y-4">
            <button
              onClick={() => {
                const currentIndex = sortCycle.indexOf(sortOrder);
                const next = sortCycle[(currentIndex + 1) % sortCycle.length];
                setSortOrder(next);
                setDisplayCount(ITEMS_PER_PAGE);
              }}
              onMouseEnter={() =>
                setCursorMode({
                  type: "label",
                  text: `Sort by ${sortCycle[(sortCycle.indexOf(sortOrder) + 1) % sortCycle.length]}`,
                })
              }
              onMouseLeave={() => setCursorMode({ type: "default" })}
              className="px-4 py-2 border border-primary/20 text-secondary-foreground bg-background font-mono text-xs"
            >
              {sortLabels[sortOrder]}{" "}
              <Sort size={16} className="inline-block" />
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-item">
            <h1 className="font-sans text-5xl" style={{ letterSpacing: -3.6 }}>
              SELECTED ARCHIVES
            </h1>
            <p className="text-secondary-foreground font-sans">
              Functional aesthetic in development
            </p>
          </div>
        )}
        <div className="flex gap-4 flex-wrap animate-item">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActive(filter);
                setDisplayCount(ITEMS_PER_PAGE);
              }}
              onMouseEnter={() =>
                setCursorMode({ type: "label", text: filter })
              }
              onMouseLeave={() => setCursorMode({ type: "default" })}
              className={`px-4 border font-mono text-sm  transition-colors duration-200 ${
                active === filter
                  ? "border-primary text-primary"
                  : "border-primary/20 text-secondary-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 xl:gap-x-36 lg:gap-x-12 md:gap-x-36 justify-between w-full`}
      >
        {displayed.map((project) => (
          <Link
            href={`/projects/${project.id}`}
            key={project.name}
            onClick={(e) => {
              e.preventDefault();
              startTransition(`/projects/${project.id}`);
            }}
            onMouseEnter={() =>
              setCursorMode({ type: "label", text: `Open up ${project.name}` })
            }
            onMouseLeave={() => setCursorMode({ type: "default" })}
            className="space-y-6 md:max-w-90 max-w-full cursor-none animate-item"
          >
            <div className="space-y-6 md:max-w-90 max-w-full group">
              <div className="relative overflow-hidden h-112.5">
                <Image
                  src={project.images?.[0] ?? "/project.jpg"}
                  alt={project.name}
                  width={750}
                  height={750}
                  loading="eager"
                  className="object-cover w-full h-full transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h1 className="px-4 py-2  text-primary/60 font-mono text-xs tracking-widest border-2 border-primary/40 dark:text-secondary/40 dark:border-secondary/40">
                    VIEW PROJECT
                  </h1>
                </div>
              </div>

              <div className="flex justify-between items-start gap-6">
                <div>
                  <div className="space-y-1">
                    <h1 className="text-xl font-sans transition-all duration-300 group-hover:font-medium font-normal group-hover:text-secondary-foreground">
                      {project.name}
                    </h1>
                    <p className="text-sm font-mono text-[#71717A]">
                      {project.description.split(" ").slice(0, 10).join(" ")}...
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 border border-primary/20 text-[#71717A] bg-background font-mono text-xs"
                      >
                        {tech.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
                <Image
                  src={"/redirect.svg"}
                  alt="Redirect"
                  width={12}
                  height={12}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {displayed.length === 0 && (
        <p className="text-center text-[#71717A] font-mono mt-12">
          No archives found for {`"${active}"`}
        </p>
      )}

      {hasMore && pathname !== "/" && (
        <div className="w-full flex justify-center">
          <button
            onClick={handleLoadMore}
            onMouseEnter={() =>
              setCursorMode({ type: "label", text: "Load More!" })
            }
            onMouseLeave={() => setCursorMode({ type: "default" })}
            className="px-4 py-2 border border-primary/20 text-[#71717A] bg-background font-mono text-xs hover:border-primary hover:text-primary transition-colors duration-200"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </>
  );
}
