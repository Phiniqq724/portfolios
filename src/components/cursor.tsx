"use client";

import { useState, useEffect, useRef } from "react";
import { CursorContext, CursorMode } from "./cursorContext";
import Image from "next/image";

export function CursorWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });
  const borderDotPosition = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef<number | null>(null);
  const [cursorMode, setCursorMode] = useState<CursorMode>({ type: "default" });

  // Track previous image for crossfade
  const prevImageRef = useRef<{ src: string; alt?: string } | null>(null);
  const [crossfadeState, setCrossfadeState] = useState<{
    prev: { src: string; alt?: string } | null;
    fading: boolean;
  }>({ prev: null, fading: false });
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [renderPos, setRenderPos] = useState({
    dot: { x: 0, y: 0 },
    border: { x: 0, y: 0 },
  });
  const [isHovering, setIsHovering] = useState(false);

  const DOT_SMOOTHNESS = 0.2;
  const BORDER_DOT_SMOOTHNESS = 0.1;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  // Handle image crossfade when cursorMode changes to a new image
  useEffect(() => {
    if (cursorMode.type === "image") {
      const incoming = { src: cursorMode.src, alt: cursorMode.alt };

      if (prevImageRef.current && prevImageRef.current.src !== incoming.src) {
        if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);

        setCrossfadeState({ prev: prevImageRef.current, fading: true });

        fadeTimerRef.current = setTimeout(() => {
          setCrossfadeState({ prev: null, fading: false });
        }, 350);
      }

      prevImageRef.current = incoming;
    } else {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      setCrossfadeState({ prev: null, fading: false });
      prevImageRef.current = null;
    }

    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [cursorMode]);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest("a, button, img, input, textarea, select"),
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      dotPosition.current.x = lerp(
        dotPosition.current.x,
        mousePosition.current.x,
        DOT_SMOOTHNESS,
      );
      dotPosition.current.y = lerp(
        dotPosition.current.y,
        mousePosition.current.y,
        DOT_SMOOTHNESS,
      );
      borderDotPosition.current.x = lerp(
        borderDotPosition.current.x,
        mousePosition.current.x,
        BORDER_DOT_SMOOTHNESS,
      );
      borderDotPosition.current.y = lerp(
        borderDotPosition.current.y,
        mousePosition.current.y,
        BORDER_DOT_SMOOTHNESS,
      );

      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: {
          x: borderDotPosition.current.x,
          y: borderDotPosition.current.y,
        },
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      if (animationIdRef.current !== null)
        cancelAnimationFrame(animationIdRef.current);
    };
  }, [isClient]);

  if (!isClient) return null;

  const hasCustomMode = cursorMode.type !== "default";
  const borderSize = hasCustomMode ? "200px" : isHovering ? "44px" : "28px";

  return (
    <CursorContext.Provider value={{ setCursorMode }}>
      <div className="pointer-events-none fixed inset-0 z-50 hidden xl:block">
        {/* Inner dot — hide when custom mode is active */}
        {!hasCustomMode && (
          <div
            className="bg-primary absolute rounded-full"
            style={{
              width: "8px",
              height: "8px",
              transform: "translate(-50%, -50%)",
              left: `${renderPos.dot.x}px`,
              top: `${renderPos.dot.y}px`,
            }}
          />
        )}

        {/* Border cursor */}
        <div
          className={`border-primary absolute border overflow-hidden flex items-center justify-center rounded-full ${isHovering || hasCustomMode ? "bg-primary/20" : ""}`}
          style={{
            width: borderSize,
            height: borderSize,
            transform: "translate(-50%, -50%)",
            left: `${renderPos.border.x}px`,
            top: `${renderPos.border.y}px`,
            transition: "width 0.3s, height 0.3s, background-color 0.3s",
            backdropFilter: isHovering || hasCustomMode ? "blur(8px)" : "none",
          }}
        >
          {cursorMode.type === "image" && (
            <>
              {/* Outgoing image — fades out */}
              {crossfadeState.prev && crossfadeState.fading && (
                <Image
                  key={`prev-${crossfadeState.prev.src}`}
                  src={crossfadeState.prev.src}
                  alt={crossfadeState.prev.alt ?? ""}
                  fill
                  className="object-cover absolute inset-0"
                  style={{
                    opacity: 0,
                    transition: "opacity 0.35s ease",
                  }}
                />
              )}

              {/* Incoming image — fades in */}
              <Image
                key={`curr-${cursorMode.src}`}
                src={cursorMode.src}
                alt={cursorMode.alt ?? ""}
                fill
                className="object-cover absolute inset-0"
                style={{
                  opacity: 1,
                  transition: "opacity 0.35s ease",
                }}
              />
            </>
          )}

          {cursorMode.type === "label" && (
            <span className="text-primary text-[10px] font-medium text-center px-1 leading-tight">
              {cursorMode.text}
            </span>
          )}
        </div>
      </div>
      {children}
    </CursorContext.Provider>
  );
}
