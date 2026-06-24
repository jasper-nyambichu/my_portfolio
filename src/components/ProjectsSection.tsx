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
];

const GITHUB_URL = "https://github.com/jasper-nyambichu";
const LINKEDIN_URL = "https://www.linkedin.com/in/dickson-moseti-94968b410";

// The virtual desktop width we render the iframe at before scaling it down.
const FRAME_W = 1280;

/**
 * ScaledIframe
 * ------------
 * Renders an iframe at FRAME_W × frameH then uses a CSS scale() transform
 * to shrink it so it fills the card's actual pixel width.
 *
 * Key fixes vs the original:
 * 1. The wrapper uses `aspectRatio` for its initial size so the card never
 *    collapses to 0 height before the ResizeObserver fires.
 * 2. The iframe is absolutely positioned inside the wrapper so it can never
 *    escape its clipping boundary regardless of scale timing.
 * 3. The wrapper's explicit `height` is derived from `scale × frameH` once
 *    the observer has measured the container — this is the single source of
 *    truth for height; no outer div also tries to set aspectRatio.
 */
function ScaledIframe({
  url,
  frameH,
  onLoad,
  onError,
}: {
  url: string;
  frameH: number;
  onLoad: () => void;
  onError: () => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = (w: number) => {
      if (w > 0) setScale(w / FRAME_W);
    };

    // Read synchronously after first paint so cards don't flash.
    update(el.getBoundingClientRect().width);

    roRef.current = new ResizeObserver(([entry]) => {
      update(entry.contentRect.width);
    });
    roRef.current.observe(el);

    return () => roRef.current?.disconnect();
  }, []);

  // While scale is unknown, hold space with the correct aspect ratio so the
  // card never has a 0-height preview area.
  const wrapperStyle: React.CSSProperties =
    scale === null
      ? {
          width: "100%",
          aspectRatio: `${FRAME_W} / ${frameH}`,
          position: "relative",
          overflow: "hidden",
        }
      : {
          width: "100%",
          // Explicit pixel height derived from the true scale — single source
          // of truth. No outer container should also set aspectRatio.
          height: Math.round(frameH * scale),
          position: "relative",
          overflow: "hidden",
        };

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      {scale !== null && (
        <iframe
          src={url}
          title={url}
          scrolling="no"
          loading="lazy"
          onLoad={onLoad}
          onError={onError}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: FRAME_W,
            height: frameH,
            border: "none",
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            // Pointer events disabled so card tilt/hover still works.
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      )}
    </div>
  );
}

/**
 * Fallback shown when no URL is provided or the iframe fails to load.
 * Uses the same aspect ratio as the iframe would have so the card shape
 * stays consistent across all states.
 */
function PreviewFallback({
  accent,
  title,
  frameH,
}: {
  accent?: string;
  title: string;
  frameH: number;
}) {
  return (
    <div
      className="w-full relative overflow-hidden"
      style={{
        background: accent ?? "linear-gradient(135deg, #1a1814, #0F0E0D)",
        aspectRatio: `${FRAME_W} / ${frameH}`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.18), transparent 60%)",
        }}
      />
      {/* Fake traffic lights */}
      <div className="absolute top-4 left-4 flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(201,168,76,0.5)" }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 36,
            color: "rgba(240,235,225,0.4)",
            fontStyle: "italic",
          }}
        >
          {title}
        </span>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
        }}
      />
    </div>
  );
}

/**
 * LivePreview
 * -----------
 * Orchestrates the three possible preview states:
 *   1. No URL / load failure → PreviewFallback
 *   2. Loading             → shimmer overlay on top of ScaledIframe
 *   3. Loaded              → ScaledIframe (shimmer hidden)
 *
 * IMPORTANT: This component owns NO height/aspectRatio of its own.
 * It lets ScaledIframe (or PreviewFallback) define the height so there
 * is exactly one authority on that dimension.
 */
function LivePreview({
  url,
  accent,
  title,
  featured,
}: {
  url?: string;
  accent?: string;
  title: string;
  featured?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const frameH = featured ? 640 : 800;
  const fallbackBg = accent ?? "linear-gradient(135deg, #1a1814, #0F0E0D)";

  if (!url || failed) {
    return (
      <PreviewFallback accent={accent} title={title} frameH={frameH} />
    );
  }

  return (
    // ✅ width: 100%, overflow: hidden — NO height or aspectRatio here.
    //    ScaledIframe is the single source of truth for height.
    <div className="w-full relative overflow-hidden">
      {/* Loading shimmer — absolutely fills whatever height ScaledIframe sets */}
      {!loaded && (
        <div
          className="absolute inset-0 z-10 animate-pulse"
          style={{ background: fallbackBg }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.12), transparent 60%)",
            }}
          />
          <div className="absolute top-4 left-4 flex gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "rgba(201,168,76,0.5)" }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 22,
                color: "rgba(240,235,225,0.3)",
                fontStyle: "italic",
                letterSpacing: "0.05em",
              }}
            >
              Loading preview…
            </span>
          </div>
        </div>
      )}

      <ScaledIframe
        url={url}
        frameH={frameH}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />

      {/* Bottom vignette — blends preview into card body */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(15,14,13,0.55))",
        }}
      />
      {/* Gold hairline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
        }}
      />
    </div>
  );
}

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
      className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
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
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: "rgba(201,168,76,0.4)" }}
      />

      {/* Preview area — no fixed height/aspectRatio wrapper here */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle zoom on hover */}
        <div
          className="w-full transition-transform duration-700"
          style={{ transform: hover ? "scale(1.03)" : "scale(1)" }}
        >
          <LivePreview
            url={p.liveUrl}
            accent={p.accent}
            title={p.name}
            featured={featured}
          />
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

        {/* Fake browser address bar */}
        {!p.comingSoon && p.liveUrl && (
          <div
            className="absolute top-0 left-0 right-0 z-20 flex items-center gap-2 px-3 py-2"
            style={{
              background: "rgba(15,14,13,0.75)",
              backdropFilter: "blur(6px)",
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
              className="flex-1 flex items-center gap-1.5 px-3 py-0.5 rounded"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                maxWidth: 280,
                margin: "0 auto",
              }}
            >
              <svg
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(201,168,76,0.7)"
                strokeWidth={2.5}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span
                style={{
                  fontFamily: "Outfit, monospace",
                  fontSize: 10,
                  color: "rgba(240,235,225,0.5)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {p.liveUrl.replace(/^https?:\/\//, "")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-7 flex flex-col gap-4">
        <h3
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: featured ? 36 : 26,
            color: "#F0EBE1",
            lineHeight: 1.1,
          }}
        >
          {p.name}
        </h3>
        <p
          style={{
            fontFamily: "Outfit",
            fontSize: 14,
            color: "#9C9488",
            lineHeight: 1.6,
          }}
        >
          {p.desc}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-full text-[10.5px]"
              style={{
                fontFamily: "Outfit",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.35)",
                letterSpacing: "0.05em",
              }}
            >
              {s}
            </span>
          ))}
        </div>
        {!p.comingSoon && (
          <div className="flex gap-2 pt-2">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs transition-opacity hover:opacity-80"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs transition-opacity hover:opacity-70"
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

export default function ProjectsSection() {
  return (
    <section className="relative w-full py-32" style={{ backgroundColor: "#0F0E0D" }}>
      <div className="relative mx-auto max-w-[1200px] px-8 flex flex-col gap-16">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <SectionHeading label="Work" title="Projects I've Built" align="left" />

          {/* Social links */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {PROJECTS.map((p, i) => (
            <Card key={i} p={p} featured={p.featured} />
          ))}
        </div>
      </div>
    </section>
  );
}