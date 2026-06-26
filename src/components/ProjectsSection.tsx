'use client';
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Lock } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import SectionHeading from "./SectionHeading";

type Project = {
  name: string;
  desc: string;
  stack: string[];
  featured?: boolean;
  comingSoon?: boolean;
  accent?: string;
  liveUrl?: string;
  githubUrl?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Manish Households",
    desc: "A full-featured e-commerce catalogue for a Kenyan home goods retailer — with WhatsApp ordering, flash sales, rich SEO schema, and Cloudflare-backed performance.",
    stack: ["React", "Node.js", "MongoDB", "Cloudflare", "WhatsApp API"],
    featured: true,
    accent: "linear-gradient(135deg, #1a3020 0%, #0F0E0D 60%)",
    liveUrl: "https://www.manishhouseholds.co.ke",
    githubUrl: "https://github.com/jasper-nyambichu",
  },
  {
    name: "iGotaTalent",
    desc: "Talent discovery and showcase platform with submissions, public profiles, and live voting — built for the East African creative community.",
    stack: ["Next.js", "Pocketbase", "TypeScript", "Tailwind"],
    accent: "linear-gradient(135deg, #3a2a1a 0%, #0F0E0D 60%)",
    liveUrl: "https://igotatalent.org",
    githubUrl: "https://github.com/jasper-nyambichu",
  },
  {
    name: "ElectroPro POS",
    desc: "Offline-first point-of-sale PWA for a Kenyan electronics retailer — thermal printing, barcode scanning, sales analytics, and IndexedDB sync.",
    stack: ["Next.js", "Tailwind", "Dexie.js", "Chart.js", "ESC/POS"],
    accent: "linear-gradient(135deg, #1a2a3a 0%, #0F0E0D 60%)",
    liveUrl: "https://electropos.vercel.app",
    githubUrl: "https://github.com/jasper-nyambichu",
  },
  {
    name: "ClinCare",
    desc: "AI-powered clinical middleware for Kenyan private hospitals — AI-assisted note generation, QR patient record retrieval, and offline-first PWA architecture.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "OpenAI", "Tailwind"],
    accent: "linear-gradient(135deg, #1a1a3a 0%, #0F0E0D 60%)",
    liveUrl: "https://clincare1.vercel.app",
    githubUrl: "https://github.com/jasper-nyambichu",
  },
  {
    name: "JasperFlix",
    desc: "A Netflix-inspired movie streaming interface with dynamic browsing, search, and watchlist management.",
    stack: ["React", "TypeScript", "TMDB API", "Tailwind"],
    accent: "linear-gradient(135deg, #3a1a1a 0%, #0F0E0D 60%)",
    liveUrl: "https://jasperflix.vercel.app",
    githubUrl: "https://github.com/jasper-nyambichu",
  },
  {
    name: "Tuinuane Digitals",
    desc: "Agency site with an integrated AI chatbot 'Kali' powered by Google Gemini — built for a Nairobi digital agency.",
    stack: ["Next.js", "Google Gemini", "TypeScript", "Tailwind"],
    accent: "linear-gradient(135deg, #2a1a3a 0%, #0F0E0D 60%)",
    liveUrl: "https://tuinuanedigitals.vercel.app",
    githubUrl: "https://github.com/jasper-nyambichu",
  },
  {
    name: "Fahari",
    desc: "A high-end digital presence for a luxury boutique hotel and restaurant — featuring room reservations, fine-dining table bookings, an immersive gallery, and curated experiences. Designed to evoke elegance and draw guests in from the very first scroll.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    accent: "linear-gradient(135deg, #2a1e10 0%, #0F0E0D 60%)",
    liveUrl: "https://fahari-five.vercel.app",
    githubUrl: "https://github.com/jasper-nyambichu",
  },
];

const GITHUB_URL = "https://github.com/jasper-nyambichu";
const LINKEDIN_URL = "https://www.linkedin.com/in/dickson-moseti-94968b410";

// ─── Fallback gradient shown when iframe is blocked or URL is missing ─────────
function PreviewFallback({ accent, title }: { accent?: string; title: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: accent ?? "linear-gradient(135deg, #1a1814, #0F0E0D)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.18), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(18px, 3vw, 36px)",
            color: "rgba(240,235,225,0.35)",
            fontStyle: "italic",
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

// ─── Live iframe preview that scales to fill any container size ───────────────
//
// Strategy:
//   1. The outer wrapper is a block div with position:relative and a fixed
//      aspect ratio enforced via padding-bottom (%). This means it always has
//      a defined pixel height before any JS runs — no overlap.
//   2. Inside that, we place an iframe at 1280 × 800 and use a ResizeObserver
//      to track the wrapper's actual pixel width, then apply CSS scale() so
//      the iframe shrinks to exactly fill the wrapper. No layout thrashing.
//   3. overflow:hidden on the wrapper clips any sub-pixel bleed.

const IFRAME_W = 1280;
const IFRAME_H = 800;

function LivePreview({
  url,
  accent,
  title,
}: {
  url?: string;
  accent?: string;
  title: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0); // 0 = not measured yet
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !url) return;

    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setScale(w / IFRAME_W);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [url]);

  // Aspect ratio: 16:9 expressed as padding-bottom percentage
  // paddingBottom = (H/W)*100 = (800/1280)*100 = 62.5%
  const ASPECT_PB = `${(IFRAME_H / IFRAME_W) * 100}%`;

  return (
    /*
      Outer shell — block-level, takes full card width, height is driven by
      padding-bottom so it is always defined before JS fires.
    */
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden"
      style={{ paddingBottom: ASPECT_PB }}
    >
      {/* Fallback / loading layer — sits in the same absolute space */}
      {(!url || failed || scale === 0) && (
        <PreviewFallback accent={accent} title={title} />
      )}

      {/* Loading shimmer while iframe is fetching */}
      {url && !failed && !loaded && scale > 0 && (
        <div
          className="absolute inset-0 z-10 animate-pulse"
          style={{ background: accent ?? "linear-gradient(135deg, #1a1814, #0F0E0D)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.1), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(14px, 2vw, 20px)",
                color: "rgba(240,235,225,0.3)",
                fontStyle: "italic",
              }}
            >
              Loading preview…
            </span>
          </div>
        </div>
      )}

      {/* The actual iframe — only rendered once we have a valid scale */}
      {url && !failed && scale > 0 && (
        <iframe
          src={url}
          title={title}
          scrolling="no"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: IFRAME_W,
            height: IFRAME_H,
            border: "none",
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            // Pointer events off so card hover/tilt still works
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      )}

      {/* Bottom fade vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: "30%",
          background: "linear-gradient(to bottom, transparent, rgba(15,14,13,0.6))",
        }}
      />
    </div>
  );
}

// ─── Fake browser chrome bar ──────────────────────────────────────────────────
function BrowserBar({ url }: { url: string }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 shrink-0"
      style={{
        background: "rgba(15,14,13,0.82)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
      }}
    >
      {/* Traffic lights */}
      <div className="flex gap-1.5 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28CA41" }} />
      </div>
      {/* URL pill */}
      <div
        className="flex items-center gap-1.5 min-w-0 flex-1 px-2.5 py-0.5 rounded"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          maxWidth: 300,
          margin: "0 auto",
        }}
      >
        {/* Lock icon */}
        <svg
          width={9}
          height={9}
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(201,168,76,0.7)"
          strokeWidth={2.5}
          className="shrink-0"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span
          className="truncate"
          style={{
            fontFamily: "Outfit, monospace",
            fontSize: 10,
            color: "rgba(240,235,225,0.45)",
          }}
        >
          {url.replace(/^https?:\/\//, "")}
        </span>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ p, featured }: { p: Project; featured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -cy * 5, y: cx * 5 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setTilt({ x: 0, y: 0 });
      }}
      className={`relative rounded-3xl overflow-hidden flex flex-col transition-all duration-500 ${
        featured ? "lg:col-span-2" : ""
      }`}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${
          hover ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.08)"
        }`,
        boxShadow: hover
          ? "0 30px 80px -30px rgba(201,168,76,0.25), 0 0 0 1px rgba(201,168,76,0.15) inset"
          : "0 10px 30px -20px rgba(0,0,0,0.5)",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${
          hover ? -4 : 0
        }px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Top gold accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10 pointer-events-none"
        style={{ background: "rgba(201,168,76,0.4)" }}
      />

      {/* ── Preview section ───────────────────────────────────────────── */}
      {/*
        We wrap browser chrome + iframe preview together so the chrome
        is part of the flow, not overlapping the preview.
      */}
      <div className="relative w-full flex flex-col overflow-hidden">
        {/* Browser chrome — always in flow, never overlapping */}
        {!p.comingSoon && p.liveUrl && <BrowserBar url={p.liveUrl} />}

        {/* Iframe preview box — scales itself, never overflows */}
        <div
          className="relative w-full overflow-hidden transition-transform duration-700"
          style={{ transform: hover ? "scale(1.025)" : "scale(1)" }}
        >
          <LivePreview url={p.liveUrl} accent={p.accent} title={p.name} />
        </div>

        {/* Coming-soon overlay */}
        {p.comingSoon && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 backdrop-blur-md z-30"
            style={{ background: "rgba(15,14,13,0.7)" }}
          >
            <Lock size={22} style={{ color: "#C9A84C" }} />
            <span
              style={{
                fontFamily: "Outfit",
                fontSize: 11,
                color: "#C9A84C",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* ── Card body ─────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 lg:p-7 flex flex-col gap-3 flex-1">
        <h3
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: featured ? "clamp(22px, 3vw, 36px)" : "clamp(18px, 2.5vw, 26px)",
            color: "#F0EBE1",
            lineHeight: 1.15,
          }}
        >
          {p.name}
        </h3>
        <p
          style={{
            fontFamily: "Outfit",
            fontSize: "clamp(12px, 1.2vw, 14px)",
            color: "#9C9488",
            lineHeight: 1.65,
          }}
        >
          {p.desc}
        </p>
        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-full"
              style={{
                fontFamily: "Outfit",
                fontSize: "clamp(9px, 1vw, 10.5px)",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.35)",
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </span>
          ))}
        </div>
        {/* CTA buttons */}
        {!p.comingSoon && (
          <div className="flex flex-wrap gap-2 pt-1 mt-auto">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs transition-opacity hover:opacity-80 shrink-0"
                style={{
                  background: "#C9A84C",
                  color: "#0F0E0D",
                  fontFamily: "Outfit",
                  fontWeight: 500,
                }}
              >
                <ExternalLink size={12} /> Live Demo
              </a>
            )}
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs transition-opacity hover:opacity-70 shrink-0"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#F0EBE1",
                  fontFamily: "Outfit",
                }}
              >
                <GithubIcon size={12} /> GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 lg:py-32" style={{ backgroundColor: "#0F0E0D" }}>
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 flex flex-col gap-12 lg:gap-16">
        {/* Header row */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <SectionHeading label="Work" title="Projects I've Built" align="left" />
          <div className="flex items-center gap-3 pb-1">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all hover:border-[rgba(201,168,76,0.5)] hover:text-[#C9A84C]"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#9C9488",
                fontFamily: "Outfit",
                letterSpacing: "0.04em",
              }}
            >
              <GithubIcon size={14} /> GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all hover:border-[rgba(201,168,76,0.5)] hover:text-[#C9A84C]"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#9C9488",
                fontFamily: "Outfit",
                letterSpacing: "0.04em",
              }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {PROJECTS.map((p, i) => (
            <Card key={i} p={p} featured={p.featured} />
          ))}
        </div>
      </div>
    </section>
  );
}