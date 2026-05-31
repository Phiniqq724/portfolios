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

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      ctx.revert();
      resizeObserver.disconnect();
    };
  }, [duration, stagger, yOffset]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export function RevealItem({
  children,
  className = "",
  delay = 0,
  yOffset = 50,
  duration = 1,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = elementRef.current;
    if (!item) return;

    // Create wrapper to mask the slide-up animation
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden";
    wrapper.style.display = "block";
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";

    item.parentNode!.insertBefore(wrapper, item);
    wrapper.appendChild(item);

    gsap.set(item, { y: yOffset });

    const anim = gsap.to(item, {
      y: 0,
      duration: duration,
      delay: delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: wrapper,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.kill();
      if (wrapper.parentNode) {
        wrapper.parentNode.insertBefore(item, wrapper);
        wrapper.remove();
      }
    };
  }, [delay, yOffset, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
