"use client";

import Link from "next/link";
import React from "react";
import ScrollReveal from "../utils/scrollReveal";
import { useCursor } from "../cursorContext";

const experiences = [
  {
    role: "VOCATIONAL HIGHSCHOOLER",
    company: "SMK TELKOM MALANG",
    period: "2023 — 2026",
    description:
      "Studied programming fundamentals, data structures, and algorithms. Led the front-end division of METIC tech community and collaborated with Telkom Indico to deliver a full IoT ecosystem for chicken farm monitoring using Raspberry Pi and ESP32.",
    link: "https://smktelkom-mlg.sch.id/",
    label: "My beloved School ❤️",
  },
  {
    role: "MENDIX INTERN",
    company: "PT. MERKLE INNOVATION",
    period: "2025 — 2026",
    description:
      "Assisted in developing and maintaining low-code applications using the Mendix platform. Collaborated with the engineering team to deliver internal tools and business process solutions.",
    link: "https://www.merkleinnovation.com/",
    label: "I was an Intern here! 😺",
  },
  {
    role: "WEBSITE DEVELOPER",
    company: "WAHANA ARTHA GROUP",
    period: "2026 — PRESENT",
    description:
      "Developing and maintaining the company website, implementing UI/UX designs, and ensuring consistent performance across devices.",
    link: "https://www.wahanaartha.com/",
    label: "Where I work now 😎",
  },
];

export default function ExperienceSection() {
  const { setCursorMode } = useCursor();
  return (
    <ScrollReveal>
      <section
        id="experience"
        className="md:px-48 md:py-32 px-6 py-16 space-y-24"
      >
        <h1
          className="font-sans text-5xl md:text-center text-start animate-item"
          style={{ letterSpacing: -3.6 }}
        >
          CHRONOLOGY
        </h1>
        <div className="flex gap-10">
          <div className="relative animate-progress-height flex justify-center xl:translate-x-1 translate-x-1.25 ">
            <div className="min-h-full w-0.5 bg-secondary rounded-full" />
          </div>

          <div className="space-y-20 w-full">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="relative space-y-2 animate-item group animate-on-center"
              >
                <div className="absolute -left-[2.65rem] top-1 w-3 h-3 translate-y-1.5 rounded-full bg-bg-primary border-2 group-hover:border-primary group-[.is-active]:border-primary transition-colors duration-300 border-primary/30" />
                <Link
                  href={exp.link}
                  target="_blank"
                  className="cursor-none"
                  onMouseEnter={() =>
                    setCursorMode({ type: "label", text: exp.label })
                  }
                  onMouseLeave={() => setCursorMode({ type: "default" })}
                >
                  <div className="flex lg:flex-row flex-col justify-between lg:items-end items-start">
                    <h1 className="text-xl font-sans relative">
                      <span className="text-[#A1A1AA]">{exp.role}</span>
                      <span className="absolute inset-0 text-primary overflow-hidden w-0 transition-[width] duration-300 group-hover:w-full group-[.is-active]:w-full whitespace-nowrap">
                        {exp.role}
                      </span>
                    </h1>
                    <span className="text-sm font-mono text-[#A1A1AA] group-[.is-active]:text-primary group-hover:text-primary">
                      {exp.period}
                    </span>
                  </div>
                  <h1 className="text-lg font-mono  relative">
                    <span className="text-[#A1A1AA]">{exp.company}</span>
                    <span className="absolute inset-0 text-primary overflow-hidden w-0 transition-[width] duration-200 group-hover:w-full group-[.is-active]:w-full whitespace-nowrap">
                      {exp.company}
                    </span>
                  </h1>
                  <p className="text-secondary-foreground/75 max-w-2xl">
                    {exp.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
