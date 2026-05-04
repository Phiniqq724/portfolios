"use client";
import React, { useState } from "react";
import { Project } from "@/utils/supabase";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "iconsax-reactjs";
import ReactMarkdown from "react-markdown";
import { useScrollLock } from "../utils/lockScroll";
import ScrollReveal from "../utils/scrollReveal";

export default function DescSection({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const images = project.images?.length ? project.images : [];

  useScrollLock(fullScreen);

  return (
    <ScrollReveal>
      <section
        id="description"
        className="md:px-12 md:py-32 px-6 py-16 flex md:flex-row flex-col-reverse justify-between gap-16"
      >
        <div
          className={
            images.length > 1
              ? "space-y-6 md:max-w-md max-w-full"
              : "space-y-6 max-w-full"
          }
        >
          <h1
            className="font-sans text-5xl animate-item"
            style={{ letterSpacing: -3.6 }}
          >
            THE PHILOSOPHY
          </h1>
          <div className="text-se condary-foreground font-sans prose prose-zinc prose-p:text-secondary-foreground prose-headings:font-sans max-w-none animate-item">
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </div>
        </div>
        {images.length > 0 && (
          <div className="w-full md:max-w-md max-w-full space-y-6">
            <h1 className="font-mono text-[#A1A1AA] animate-item">PREVIEW</h1>

            <div className="flex flex-col gap-4">
              <div
                className="relative w-full h-125 cursor-zoom-in animate-item"
                onClick={() => setFullScreen(true)}
              >
                <Image
                  src={images[activeIndex]}
                  alt={`${project.name} ${activeIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>

              {images.length > 1 && (
                <div className="flex w-full justify-between">
                  <div className="flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-0.5 transition-all duration-300 ${
                          i === activeIndex
                            ? "w-8 bg-primary"
                            : "w-4 bg-primary/20  hover:bg-primary/40"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-8">
                    <button
                      onClick={() =>
                        setActiveIndex(
                          (prev) => (prev - 1 + images.length) % images.length,
                        )
                      }
                      className=""
                    >
                      <ArrowRight
                        size={16}
                        className="rotate-180 text-[#A1A1AA] hover:text-[#52525B] transition-colors duration-300"
                      />
                    </button>
                    <button
                      onClick={() =>
                        setActiveIndex((prev) => (prev + 1) % images.length)
                      }
                      className=""
                    >
                      <ArrowLeft
                        size={16}
                        className="rotate-180 text-[#A1A1AA] hover:text-[#52525B] transition-colors duration-300"
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {fullScreen && (
          <div
            className="fixed inset-0 z-50 bg-primary/90 flex items-center justify-center"
            onClick={() => setFullScreen(false)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white font-mono text-xs tracking-widest transition-colors"
              onClick={() => setFullScreen(false)}
            >
              CLOSE
            </button>

            {/* Image */}
            <div
              className="relative w-full h-full max-w-5xl max-h-[90vh] mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex]}
                alt={`${project.name} ${activeIndex + 1}`}
                fill
                quality={100}
                className="object-contain"
              />
            </div>

            {/* Arrow navigation di fullscreen */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-6 text-white/60 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(
                      (prev) => (prev - 1 + images.length) % images.length,
                    );
                  }}
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  className="absolute right-6 text-white/60 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex((prev) => (prev + 1) % images.length);
                  }}
                >
                  <ArrowRight size={24} />
                </button>
              </>
            )}

            {/* Counter */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-white/40 tracking-widest">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
        )}
      </section>
    </ScrollReveal>
  );
}
