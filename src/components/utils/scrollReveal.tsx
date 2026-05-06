"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make sure to register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  yOffset?: number;
  duration?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  stagger = 0.2,
  yOffset = 50,
  duration = 1,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".animate-item");

      items.forEach((item) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = getComputedStyle(item).display;
        item.parentNode!.insertBefore(wrapper, item);
        wrapper.appendChild(item);
      });

      gsap.set(items, { y: "100%" });

      gsap.to(items, {
        y: 0,
        duration: duration,
        stagger: stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".animate-items", {
        y: yOffset,
        opacity: 0,
        duration: duration,
        stagger: stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".animate-progress-width", {
        width: 0,
        duration: duration * 1.5,
        stagger: stagger / 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
      gsap.from(".animate-progress-height", {
        height: 0,
        duration: duration * 2,
        stagger: stagger / 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray(".animate-on-center").forEach((elem) => {
        ScrollTrigger.create({
          trigger: elem as HTMLElement,
          start: "top 55%",
          end: "bottom 45%",
          toggleClass: "is-active",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [duration, stagger, yOffset]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
