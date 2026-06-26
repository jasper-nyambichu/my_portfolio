'use client';
import { useEffect, useRef, useState } from "react";
import { GithubIcon } from "@/components/SocialIcons";

// ─── Nav links — id must match the `id` prop on each section element ──────────
const NAV_LINKS = [
  { label: "Home",     id: "hero" },
  { label: "About",    id: "about" },
  { label: "Skills",   id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact",  id: "contact" },
];

const GITHUB_URL   = "https://github.com/jasper-nyambichu";
const LINKEDIN_URL = "https://www.linkedin.com/in/dickson-moseti-94968b410";

// ─── Scroll-spy hook ──────────────────────────────────────────────────────────
// Watches all section ids and returns whichever one is currently most visible.
function useScrollSpy(ids: string[], offset = 80): string {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Track how much of each section is visible
    const visibility: Record<string, number> = {};
    ids.forEach((id) => { visibility[id] = 0; });

    const pickMostVisible = () => {
      let best = ids[0];
      let bestRatio = -1;
      ids.forEach((id) => {
        if (visibility[id] > bestRatio) {
          bestRatio = visibility[id];
          best = id;
        }
      });
      setActive(best);
    };

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibility[id] = entry.intersectionRatio;
          pickMostVisible();
        },
        {
          // Shrink the root viewport by the navbar height at the top
          rootMargin: `-${offset}px 0px 0px 0px`,
          threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids, offset]);

  return active;
}

// ─── Smooth scroll helper ─────────────────────────────────────────────────────
function scrollTo(id: string, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

// ─── Logo mark ────────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <button
      onClick={() => scrollTo("hero", 0)}
      className="flex items-center gap-2.5 group focus:outline-none"
      aria-label="Go to top"
    >
      {/* Monogram square */}
      <span
        className="relative flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden shrink-0"
        style={{
          background: "linear-gradient(135deg, #C9A84C 0%, #8B6914 100%)",
          boxShadow: "0 0 0 1px rgba(201,168,76,0.4)",
        }}
      >
        <span
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 16,
            fontWeight: 600,
            color: "#0F0E0D",
            lineHeight: 1,
            fontStyle: "italic",
          }}
        >
          J
        </span>
      </span>
      {/* Name */}
      <span
        className="leading-none"
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: 18,
          color: "#F0EBE1",
          letterSpacing: "0.02em",
          fontStyle: "italic",
        }}
      >
        Jasper<span style={{ color: "#C9A84C" }}>.</span>
      </span>
    </button>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const ids = NAV_LINKS.map((l) => l.id);
  const active = useScrollSpy(ids, 80);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Backdrop blur / border appears only after user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      {/* ── Fixed bar ──────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(15,14,13,0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px) saturate(160%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(201,168,76,0.12)"
            : "1px solid transparent",
        }}
      >
        <nav
          className="mx-auto flex items-center justify-between"
          style={{
            maxWidth: 1200,
            padding: "0 clamp(16px, 4vw, 32px)",
            height: 64,
          }}
        >
          {/* Logo */}
          <LogoMark />

          {/* Desktop nav links — centered */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="relative px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none group"
                    style={{
                      fontFamily: "Outfit",
                      fontSize: 13,
                      fontWeight: isActive ? 500 : 400,
                      letterSpacing: "0.04em",
                      color: isActive ? "#C9A84C" : "#9C9488",
                      background: isActive
                        ? "rgba(201,168,76,0.08)"
                        : "transparent",
                    }}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {label}

                    {/* Active underline pill */}
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300"
                      style={{
                        height: 2,
                        width: isActive ? "60%" : "0%",
                        background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop right side — social + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* GitHub icon link */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:text-[#C9A84C]"
              style={{ color: "#9C9488" }}
            >
              <GithubIcon size={16} />
            </a>

            {/* LinkedIn icon link */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:text-[#C9A84C]"
              style={{ color: "#9C9488" }}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* Divider */}
            <span
              className="w-px h-5"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />

            {/* Hire me CTA */}
            <button
              onClick={() => scrollTo("contact")}
              className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:opacity-90 focus:outline-none"
              style={{
                fontFamily: "Outfit",
                background: "linear-gradient(135deg, #C9A84C 0%, #8B6914 100%)",
                color: "#0F0E0D",
                letterSpacing: "0.04em",
                boxShadow: "0 2px 12px rgba(201,168,76,0.25)",
              }}
            >
              Hire Me
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block rounded-full transition-all duration-300"
                style={{
                  width: i === 1 ? (menuOpen ? 20 : 14) : 20,
                  height: 1.5,
                  background: menuOpen ? "#C9A84C" : "#9C9488",
                  transform:
                    menuOpen
                      ? i === 0
                        ? "translateY(5px) rotate(45deg)"
                        : i === 2
                        ? "translateY(-5px) rotate(-45deg)"
                        : "scaleX(0)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </nav>
      </header>

      {/* ── Mobile slide-down menu ─────────────────────────────────────── */}
      <div
        ref={menuRef}
        className="fixed top-[64px] left-0 right-0 z-40 md:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: menuOpen ? 400 : 0,
          opacity: menuOpen ? 1 : 0,
          background: "rgba(15,14,13,0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: menuOpen
            ? "1px solid rgba(201,168,76,0.15)"
            : "1px solid transparent",
        }}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map(({ label, id }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <button
                  onClick={() => {
                    scrollTo(id);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 focus:outline-none"
                  style={{
                    fontFamily: "Outfit",
                    fontSize: 15,
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? "#C9A84C" : "#9C9488",
                    background: isActive
                      ? "rgba(201,168,76,0.07)"
                      : "transparent",
                    letterSpacing: "0.03em",
                  }}
                >
                  {/* Active dot */}
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200"
                    style={{
                      background: isActive ? "#C9A84C" : "rgba(255,255,255,0.15)",
                      boxShadow: isActive ? "0 0 6px rgba(201,168,76,0.6)" : "none",
                    }}
                  />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile social + CTA row */}
        <div
          className="flex items-center gap-3 px-10 pb-5 pt-1"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors hover:text-[#C9A84C]"
            style={{
              color: "#9C9488",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <GithubIcon size={15} />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors hover:text-[#C9A84C]"
            style={{
              color: "#9C9488",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <button
            onClick={() => { scrollTo("contact"); setMenuOpen(false); }}
            className="ml-auto px-5 py-2 rounded-xl text-xs font-medium transition-opacity hover:opacity-90 focus:outline-none"
            style={{
              fontFamily: "Outfit",
              background: "linear-gradient(135deg, #C9A84C 0%, #8B6914 100%)",
              color: "#0F0E0D",
              letterSpacing: "0.04em",
              boxShadow: "0 2px 12px rgba(201,168,76,0.2)",
            }}
          >
            Hire Me
          </button>
        </div>
      </div>

      {/* ── Spacer so page content starts below the fixed bar ─────────── */}
      <div style={{ height: 64 }} aria-hidden="true" />
    </>
  );
}