"use client";

import { ArrowRight } from "iconsax-reactjs";
import Link from "next/link";
import React from "react";
import { handleScrollTo } from "../navbar";
import ScrollReveal from "../utils/scrollReveal";

const marqueeDev = [
  { name: "WEB ENTHUSIAST", role: "Fullstack Developer" },
  { name: "NEXT.JS", role: "React.JS" },
  { name: "MOBILE ENTHUSIAST", role: "Mobile Developer" },
  { name: "EXPO", role: "ReactNative" },
];

export default function HeroSection() {
  return (
    <ScrollReveal>
      <section
        id="home"
        className="md:px-12 md:pt-32 pb-8 px-6 pt-16 flex flex-col gap-16 "
      >
        <div className="w-full md:flex hidden justify-end">
          <div className="flex flex-col items-center gap-8">
            <div className="relative h-18 w-0.5 overflow-hidden bg-primary/10">
              <div className="absolute w-full animate-scroll-line bg-primary" />
            </div>
            <Link
              href="#about"
              onClick={(e) => handleScrollTo(e, "#about")}
              className="text-sm text-primary/50 rotate-90 group"
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
            <p className="text-lg text-secondary-foreground font-mono animate-item">
              WEB ENTHUSIAST
            </p>
            <h1 className="xl:text-[128px] lg:text-[96px] md:text-[80px] text-[64px] font-display animate-item font-black leading-none ">
              FAHRELL <br />
              <span className="text-primary/50 animate-item">
                SANDY ZHARIIF
              </span>{" "}
            </h1>
          </div>
          <div className="w-full flex md:flex-row flex-col gap-2 justify-between">
            <p className="text-secondary-foreground font-mono text-md md:max-w-1/2 max-w-full">
              Frontend & Fullstack Developer crafting minimal digital
              architectures through code and precision.
            </p>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2 md:items-end items-start">
                <span className="px-2 py-0.5 w-fit border border-primary/20 text-secondary-foreground bg-background font-mono text-xs">
                  • AVAILABLE FOR WORK
                </span>
                <span className="px-2 py-0.5 w-fit border border-primary/20 text-secondary-foreground bg-background font-mono text-xs">
                  MALANG, INDONESIA
                </span>
                <span className="px-2 py-0.5 w-fit border border-primary/20 text-secondary-foreground bg-background font-mono text-xs">
                  FLEXIBLE SCHEDULE
                </span>
              </div>
              <div className="md:hidden flex  flex-col items-center justify-center gap-2">
                <div className="relative h-18 w-0.5 overflow-hidden bg-primary/10">
                  <div className="absolute w-full animate-scroll-line bg-primary" />
                </div>
                <Link
                  href="#about"
                  onClick={(e) => handleScrollTo(e, "#about")}
                  className="text-sm text-primary/50 rotate-90"
                >
                  <ArrowRight size={16} className="inline-block" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 flex items-center gap-2">
          <div className="w-full h-0.5 bg-secondary " />
          <p className="text-lg text-secondary">SANDEV.</p>
          <div className="w-1/4 h-0.5 bg-secondary " />
        </div>
        <div className="overflow-hidden xl:-mx-12 -mx-6">
          <div className="flex w-max animate-marquee hover:paused">
            {[...marqueeDev, ...marqueeDev].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-10 whitespace-nowrap"
              >
                <span className="text-xl font-sans text-primary">
                  {item.name}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#A1A1AA]" />
                <span className="text-xs font-mono text-[#A1A1AA] tracking-widest uppercase">
                  {item.role}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 flex items-center gap-2">
          <div className="w-1/4 h-0.5 bg-secondary " />
          <p className="text-lg text-secondary">ABOUT.</p>
          <div className="w-full h-0.5 bg-secondary " />
        </div>
      </section>
    </ScrollReveal>
  );
}
