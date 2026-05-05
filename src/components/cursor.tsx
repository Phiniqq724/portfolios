"use client";

import { useState, useEffect, useRef } from "react";
import { CursorContext, CursorMode } from "./cursorContext";
import Image from "next/image";

export function CursorWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef<number | null>(null);
  const [cursorMode, setCursorMode] = useState<CursorMode>({ type: "default" });
  const [isHovering, setIsHovering] = useState(false);

  const arrowWrapperRef = useRef<HTMLDivElement>(null);
  const imageTagRef = useRef<HTMLDivElement>(null);

  const DOT_SMOOTHNESS = 0.15;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

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

      // gerakin langsung lewat ref, zero re-render
      if (arrowWrapperRef.current) {
        arrowWrapperRef.current.style.left = `${dotPosition.current.x}px`;
        arrowWrapperRef.current.style.top = `${dotPosition.current.y}px`;
      }

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

  const isImageMode = cursorMode.type === "image";
  const isLabelMode = cursorMode.type === "label";

  if (!isClient) return null;

  return (
    <CursorContext.Provider value={{ setCursorMode }}>
      <style>{`* { cursor: none !important; }`}</style>

      <div className="pointer-events-none fixed inset-0 z-50 hidden lg:block">
        <div
          ref={arrowWrapperRef}
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          {/* SVG Arrow */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <path
              d="M4 2L16 10.5L10.5 11.5L8 17L4 2Z"
              fill={
                isHovering || isImageMode
                  ? "var(--color-primary)"
                  : "var(--color-secondary)"
              }
              stroke={"var(--color-primary)"}
              strokeWidth="1.2"
              strokeLinejoin="round"
              style={{ transition: "fill 0.3s ease, stroke 0.3s ease" }}
            />
          </svg>

          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "14px",
              fontSize: "16px",
              fontWeight: 500,
              padding: "2px 7px",
              borderRadius: "0px 6px 6px 6px",
              whiteSpace: "nowrap",
              lineHeight: "1.6",
              transformOrigin: "top left",
              transform: isLabelMode ? "scale(0.8)" : "scale(1)",
              opacity: isLabelMode ? 1 : 0,
              transition:
                "opacity 0.25s ease, transform 0.25s ease, background-color 0.3s, color 0.3s",
            }}
            className={`font-mono ${isHovering || isImageMode ? "bg-primary text-secondary" : "bg-secondary text-primary"}`}
          >
            {cursorMode.type === "label" && cursorMode.text}
          </div>

          {/* Image tag */}
          <div
            ref={imageTagRef}
            style={{
              position: "absolute",
              top: "12px",
              left: "14px",
              width: "300px",
              height: "238px",
              overflow: "hidden",
              borderRadius: "0px 24px 24px 24px",
              transformOrigin: "top left",
              transform: isImageMode ? "scale(1)" : "scale(0)",
              opacity: isImageMode ? 1 : 0,
              transition:
                "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
            }}
            className="border-2 border-primary"
          >
            {cursorMode.type === "image" && (
              <Image
                src={cursorMode.src}
                alt={cursorMode.alt ?? ""}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {children}
    </CursorContext.Provider>
  );
}
