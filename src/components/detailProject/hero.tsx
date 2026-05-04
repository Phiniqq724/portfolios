"use client";

import { ArrowLeft, ArrowRight } from "iconsax-reactjs";
import Link from "next/link";
import React from "react";
import { Project } from "@/utils/supabase";
import { handleScrollTo } from "../navbar";
import ScrollReveal from "../utils/scrollReveal";
import { useLoading } from "../utils/loadingWrapper";

export default function HeroSection({ project }: { project: Project }) {
  const marqueeItems = [
    { label: "ROLE", value: project.role, href: null },
    { label: "YEAR", value: project.year.toString(), href: null },
    { label: "STACK", value: project.tech_stack.join(", "), href: null },
    { label: "ACCESS", value: "HERE", href: project.link },
    { label: "PARTNER", value: project.partner, href: null },
  ];
  const { startTransition } = useLoading();
  return (
    <ScrollReveal>
      <section
        id="home"
        className="md:px-12 md:pt-32 px-6 pt-16 flex flex-col gap-16 "
      >
        <div className="w-full md:flex hidden justify-end">
          <div className="flex flex-col items-center gap-8">
            <div className="relative h-18 w-0.5 overflow-hidden bg-primary/10">
              <div className="absolute w-full animate-scroll-line bg-primary" />
            </div>
            <Link
              href="#description"
              className="text-sm text-primary/50 rotate-90 group cursor-none"
              onClick={(e) => handleScrollTo(e, "#description")}
            >
              SCROLL{" "}
              <ArrowRight
                size={16}
                className="inline-block group-hover:translate-x-2 duration-300 transition-all"
              />
            </Link>
          </div>
        </div>
        <div className="space-y-12">
          <div>
            <Link
              href={"/projects"}
              onClick={(e) => {
                e.preventDefault();
                startTransition(`/projects/`);
              }}
              className="text-lg flex items-center cursor-none gap-2 text-secondary-foreground hover:text-primary transition-all font-mono z-10 group animate-item"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-2 duration-300 ease-in-out"
              />
              BACK TO ARCHIVES
            </Link>
            <h1 className="xl:text-[128px] lg:text-[96px] md:text-[80px] text-[64px] font-display font-black leading-none relative -z-10 select-none animate-item">
              {project.name
                .toUpperCase()
                .split(" ")
                .map((word, i) => (
                  <React.Fragment key={i}>
                    {i > 0 ? (
                      <span className="text-primary/50 animate-item">
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                    {i === 0 && <br />}{" "}
                  </React.Fragment>
                ))}
            </h1>
          </div>
        </div>
        <div className="px-6 flex items-center gap-2">
          <div className="w-full h-0.5 bg-secondary " />
          <p className="text-lg text-secondary">SANDEV.</p>
          <div className="w-1/4 h-0.5 bg-secondary " />
        </div>
        <div className="overflow-hidden xl:-mx-12 -mx-6">
          <div className="flex w-max animate-marquee-test hover:paused">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-10 whitespace-nowrap"
              >
                <span className="text-xl font-sans text-primary">
                  {item.label}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#A1A1AA]" />
                {item.href ? (
                  <Link
                    href={item.href}
                    target="_blank"
                    className="text-xs font-mono text-[#A1A1AA] tracking-widest uppercase underline underline-offset-2 hover:text-primary transition-colors duration-200 cursor-none"
                  >
                    {item.value}
                  </Link>
                ) : (
                  <span className="text-xs font-mono text-[#A1A1AA] tracking-widest uppercase">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 flex items-center gap-2">
          <div className="w-1/4 h-0.5 bg-secondary " />
          <p className="text-lg text-secondary">DESC.</p>
          <div className="w-full h-0.5 bg-secondary " />
        </div>
      </section>
    </ScrollReveal>
  );
}
