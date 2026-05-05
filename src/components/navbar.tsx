"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ThemeToggle } from "./theme-toggle";
import { useLoading } from "./utils/loadingWrapper";
import { useCursor } from "./cursorContext";

interface NavLink {
  label: string;
  href: string;
  section: string;
}

const defaultNavLinks = [
  { label: "HOME", href: "#home", section: "home" },
  { label: "ABOUT", href: "#about", section: "about" },
  { label: "ARCHIVES", href: "#projects", section: "projects" },
  { label: "EXPERIENCE", href: "#experience", section: "experience" },
  { label: "CONTACT", href: "#contact", section: "contact" },
];

const projectNavLinks = [
  { label: "HOME", href: "#home", section: "home" },
  { label: "ARCHIVES", href: "#projects", section: "projects" },
];

const detailProjNavLinks = [
  { label: "HOME", href: "#home", section: "home" },
  { label: "DESC", href: "#description", section: "description" },
];

const janganNavLinks = [
  { label: "JANGAN", href: "/", section: "home" },
  { label: "DI", href: "/", section: "alone" },
  { label: "ULANG", href: "/", section: "homes" },
  { label: "YA", href: "/", section: "homeless" },
  { label: "BANG", href: "/", section: "homemiaw" },
];

const navLinksByPath: Record<string, NavLink[]> = {
  "/": defaultNavLinks,
  "/projects": projectNavLinks,
  "/bangJanganEksploitDong/error": janganNavLinks,
};

export const handleScrollTo = (
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string,
) => {
  e.preventDefault();
  const smoother = ScrollSmoother.get();
  smoother?.scrollTo(id, true, "top 80px");
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const { startTransition } = useLoading();

  const pathname = usePathname();

  const navLinks = pathname.startsWith("/projects/")
    ? detailProjNavLinks
    : (navLinksByPath[pathname] ?? defaultNavLinks);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section);
        },
        { threshold: 0.5 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [navLinks]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { setCursorMode } = useCursor();

  return (
    <div className="sticky top-0 z-40 flex justify-center">
      <nav
        className={`flex justify-between items-center bg-background/20  backdrop-blur-lg drop-shadow-md drop-shadow-primary/5 transition-all duration-300 ease-out ${
          scrolled
            ? "xl:w-1/2 w-5/6 translate-y-4 rounded-full shadow-2xl shadow-primary/10 px-10 py-4"
            : "w-full px-12 py-6"
        }`}
      >
        <Link
          href={"/"}
          onClick={(e) => {
            e.preventDefault();
            startTransition(`/`);
          }}
          className={`font-medium font-sans transition-all duration-300 cursor-none ${
            scrolled ? "text-base" : "text-lg"
          }`}
          onMouseEnter={() =>
            setCursorMode({ type: "label", text: "It's my name, obviously!" })
          }
          onMouseLeave={() => setCursorMode({ type: "default" })}
        >
          SANDY.
        </Link>
        <ul
          className={`font-mono transition-all flex  duration-300 ${
            scrolled ? "gap-6" : "gap-8"
          }`}
        >
          {navLinks.map(({ label, href, section }) => {
            const isActive = activeSection === section;
            return (
              <li key={section} className="xl:flex hidden items-center">
                <Link
                  href={href}
                  className={`nav-link font-medium relative cursor-none transition-all duration-300 group ${
                    scrolled ? "text-sm" : "text-base"
                  } ${isActive ? "active" : ""}`}
                  onClick={(e) => handleScrollTo(e, href)}
                  onMouseEnter={() =>
                    setCursorMode({
                      type: "label",
                      text: `Jump to ${label.toLowerCase()}`,
                    })
                  }
                  onMouseLeave={() => setCursorMode({ type: "default" })}
                >
                  {label}
                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
          <li className="flex items-center">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
}
