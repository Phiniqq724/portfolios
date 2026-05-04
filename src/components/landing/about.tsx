"use client";

import ScrollReveal from "../utils/scrollReveal";

export default function AboutSection() {
  return (
    <>
      <ScrollReveal>
        <section
          id="about"
          className="md:px-12 md:py-32 px-6 py-16 flex md:flex-row flex-col justify-between gap-16"
        >
          <div className="space-y-6 md:max-w-md max-w-full">
            <h1
              className="animate-item font-sans text-5xl"
              style={{ letterSpacing: -3.6 }}
            >
              THE PHILOSOPHY
            </h1>
            <>
              <p className="animate-item text-secondary-foreground font-sans">
                I specialize in building bridges between complex backend systems
                and refined, intuitive user experiences. My approach is rooted
                in the belief that software should be as silent and invisible as
                a well-designed room.
              </p>
              <p className="animate-item text-secondary-foreground font-sans">
                Based in Indoneisa, working globally to elevate the digital
                presence of modern startups and established enterprises through
                meticulous full- stack implementation.
              </p>
            </>
          </div>
          <div className="w-full md:max-w-md max-w-full space-y-6">
            <h1 className="animate-item font-mono text-[#A1A1AA]">
              TECHNOLOGICAL FOCUS
            </h1>
            <div className="animate-item flex flex-wrap gap-2">
              {[
                "FRONT-END DEVELOPMENT",
                "BACK-END DEVELOPMENT",
                "FULLSTACK DEVELOPMENT",
                "MOBILE DEVELOPMENT",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 border border-primary/20 text-secondary-foreground bg-background font-mono text-xs "
                >
                  {tech.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
