import Link from "next/link";
import React from "react";
import ScrollReveal from "../utils/scrollReveal";

export default function CTASection() {
  return (
    <>
      <div className="px-6 flex items-center gap-2">
        <div className="w-full h-0.5 bg-secondary " />
        <p className="text-lg text-secondary">CALL2ACT.</p>
        <div className="w-1/4 h-0.5 bg-secondary " />
      </div>
      <ScrollReveal>
        <section
          id="contact"
          className="md:px-64 md:py-48 px-6 py-16 md:space-y-8 space-y-4 text-center  border-secondary"
        >
          <p className="text-lg text-secondary-foreground font-mono animate-item">
            GET IN TOUCH
          </p>
          <div
            className="md:text-7xl text-5xl font-sans animate-item"
            style={{ letterSpacing: -3.6 }}
          >
            LET&apos;S START
            <br />
            <div className="group hover: animate-item">
              <Link
                href="mailto:hey@mustpikek.dev"
                className="group-hover:text-primary/50 duration-300 cursor-none"
              >
                WITH SMALL TALK
              </Link>
              <div className="flex justify-center">
                <span className="w-0 group-hover:w-1/2 transition-[width] duration-300 h-1 bg-primary/50" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
