"use client";

import React from "react";
import { useEffect, useState, useRef, createContext, useContext } from "react";
import gsap from "gsap";
import { useScrollLock } from "./lockScroll";
import { useRouter } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";

type LoadingContextType = {
  startTransition: (action: string | (() => void)) => void;
};
export const LoadingContext = createContext<LoadingContextType>({
  startTransition: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingType, setLoadingType] = useState<"initial" | "transition">("initial");
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useScrollLock(isLoading);

  const handleLoadingComplete = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        y: -window.innerHeight,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          setIsLoading(false);
        },
      });
    }
  };

  const startTransition = (action: string | (() => void)) => {
    setLoadingType("transition");
    setIsLoading(true);
    setProgress(0);
    setTimeout(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { y: -window.innerHeight },
          {
            y: 0,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => {
              let p = 0;
              const interval = setInterval(() => {
                p += Math.random() * 25 + 10;
                setProgress(Math.min(p, 100));
                if (p >= 100) {
                  clearInterval(interval);
                  
                  if (typeof action === "string") {
                    router.push(action);
                    const smoother = ScrollSmoother.get();
                    if (smoother) smoother.scrollTo(0, false);
                    else window.scrollTo(0, 0);
                  } else {
                    action();
                  }

                  setTimeout(() => {
                    handleLoadingComplete();
                  }, 500);
                }
              }, 100);
            },
          },
        );
      }
    }, 10);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 25;
      });
    }, 200);

    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => {
        handleLoadingComplete();
      }, 500);
    };

    let fallbackTimeout: NodeJS.Timeout;

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);

      fallbackTimeout = setTimeout(() => {
        handleLoad();
      }, 3500);

      return () => {
        window.removeEventListener("load", handleLoad);
        clearInterval(interval);
        clearTimeout(fallbackTimeout);
      };
    }

    return () => {
      clearInterval(interval);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ startTransition }}>
      {isLoading && (
        <div
          ref={containerRef}
          style={{
            transform:
              loadingType === "transition"
                ? "translateY(-100vh)"
                : "translateY(0)",
          }}
          className="fixed inset-0 z-50 w-full border-b-2 border-primary/20 bg-background transition-colors duration-700"
        >
          <section className="w-full h-screen flex flex-col gap-12 items-center justify-center">
            <h1 className="md:text-[80px] text-[64px] font-sans text-center leading-none">
              SAN
              <br />
              DEV.
            </h1>
            <div className="flex flex-col items-center gap-4">
              <div className="w-64 h-0.5 bg-primary-foreground rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary-foreground transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </section>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}
