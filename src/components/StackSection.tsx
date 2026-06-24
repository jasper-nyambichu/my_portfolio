'use client';
import { useEffect, useMemo, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import BackgroundOrbs from "./BackgroundOrbs";

type Tech = {
  name: string;
  category: "Languages" | "Frameworks" | "Databases" | "Tools";
  level: number;
  icon: string; // devicon CDN url
};

// Using devicon (colorful, "3D-ish" official brand logos)
const D = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

const TECHS: Tech[] = [
  { name: "JavaScript", category: "Languages", level: 88, icon: D("javascript/javascript-original.svg") },
  { name: "TypeScript", category: "Languages", level: 75, icon: D("typescript/typescript-original.svg") },
  { name: "Java", category: "Languages", level: 60, icon: D("java/java-original.svg") },
  { name: "React", category: "Frameworks", level: 85, icon: D("react/react-original.svg") },
  { name: "Next.js", category: "Frameworks", level: 82, icon: D("nextjs/nextjs-original.svg") },
  { name: "Node.js", category: "Frameworks", level: 80, icon: D("nodejs/nodejs-original.svg") },
  { name: "Express.js", category: "Frameworks", level: 78, icon: D("express/express-original.svg") },
  { name: "Tailwind CSS", category: "Frameworks", level: 88, icon: D("tailwindcss/tailwindcss-original.svg") },
  { name: "PostgreSQL", category: "Databases", level: 70, icon: D("postgresql/postgresql-original.svg") },
  { name: "Supabase", category: "Databases", level: 78, icon: D("supabase/supabase-original.svg") },
  { name: "Pocketbase", category: "Databases", level: 65, icon: "https://cdn.simpleicons.org/pocketbase/B8DBE4" },
  { name: "Git", category: "Tools", level: 85, icon: D("git/git-original.svg") },
  { name: "Docker", category: "Tools", level: 60, icon: D("docker/docker-original.svg") },
  { name: "Figma", category: "Tools", level: 72, icon: D("figma/figma-original.svg") },
];

const TABS = ["Languages", "Frameworks", "Databases", "Tools"] as const;
type Tab = (typeof TABS)[number];

// Fibonacci sphere distribution
function spherePoints(n: number, radius: number) {
  const pts: { x: number; y: number; z: number }[] = [];
  const offset = 2 / n;
  const inc = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * inc;
    pts.push({ x: Math.cos(phi) * r * radius, y: y * radius, z: Math.sin(phi) * r * radius });
  }
  return pts;
}

export default function StackSection() {
  const [tab, setTab] = useState<Tab>("Languages");
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(-10);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(520);
  // Responsive radius based on container width
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      // Keep sphere comfortably inside the viewport, accounting for chip size
      const chip = w < 480 ? 64 : 88;
      const target = Math.max(140, Math.min(240, (w - chip - 24) / 2));
      setSize(target);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const radius = size;
  const pts = useMemo(() => spherePoints(TECHS.length, radius), [radius]);
  const isCompact = size < 200;
  const chipSize = isCompact ? 64 : 88;
  const tileSize = isCompact ? 48 : 64;
  const iconSize = isCompact ? 28 : 38;
  const containerHeight = Math.round(radius * 2 + chipSize + 40);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      setYaw((y) => (y + dt * 18) % 360);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setPitch(-10 + cy * -20);
    setYaw((y) => y + cx * 0.6);
  };

  return (
    <section className="relative w-full py-20 sm:py-28 md:py-32 overflow-hidden" style={{ backgroundColor: "#0F0E0D" }}>
      <BackgroundOrbs />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 flex flex-col items-center gap-12 sm:gap-16">
        <SectionHeading label="My Stack" title="Tools I Build With" />

        <div
          ref={containerRef}
          onPointerMove={onPointerMove}
          className="relative w-full touch-none"
          style={{ height: containerHeight, perspective: 1200 }}
        >
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate(-50%,-50%) rotateX(${pitch}deg) rotateY(${yaw}deg)`,
              transition: "transform 0.1s linear",
              willChange: "transform",
            }}
          >
            {TECHS.map((tech, i) => {
              const p = pts[i];
              const active = tech.category === tab;
              return (
                <Chip
                  key={tech.name}
                  tech={tech}
                  active={active}
                  x={p.x}
                  y={p.y}
                  z={p.z}
                  counterYaw={-yaw}
                  counterPitch={-pitch}
                  chipSize={chipSize}
                  tileSize={tileSize}
                  iconSize={iconSize}
                />
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-10 justify-center">
          {TABS.map((t) => {
            const isActive = t === tab;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative pb-2 transition-colors text-sm tracking-wide"
                style={{
                  color: isActive ? "#F0EBE1" : "#9C9488",
                  fontFamily: "Outfit",
                }}
              >
                {t}
                <span
                  className="absolute left-0 right-0 -bottom-px h-px transition-all"
                  style={{
                    background: "#C9A84C",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Chip({
  tech,
  active,
  x,
  y,
  z,
  counterYaw,
  counterPitch,
  chipSize,
  tileSize,
  iconSize,
}: {
  tech: Tech;
  active: boolean;
  x: number;
  y: number;
  z: number;
  counterYaw: number;
  counterPitch: number;
  chipSize: number;
  tileSize: number;
  iconSize: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="absolute"
      style={{
        left: "0px",
        top: "0px",
        transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${counterYaw.toFixed(2)}deg) rotateX(${counterPitch.toFixed(2)}deg) translate(-50%,-50%)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative flex flex-col items-center justify-center gap-2 transition-all duration-300"
        style={{
          width: chipSize,
          height: chipSize,
          transform: hover ? "scale(1.18)" : "scale(1)",
          opacity: active ? 1 : 0.55,
          cursor: "default",
        }}
      >
        <div
          className="relative flex items-center justify-center rounded-2xl"
          style={{
            width: tileSize,
            height: tileSize,
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.14), rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.35))",
            border: `1px solid ${active || hover ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.18)"}`,
            boxShadow:
              active || hover
                ? "0 10px 25px -8px rgba(0,0,0,0.6), 0 0 22px rgba(201,168,76,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"
                : "0 8px 18px -10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <img
            src={tech.icon}
            alt={tech.name}
            draggable={false}
            style={{
              width: iconSize,
              height: iconSize,
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.55))",
              userSelect: "none",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.06em",
            color: active ? "#F0EBE1" : "#9C9488",
            fontFamily: "Outfit",
            whiteSpace: "nowrap",
          }}
        >
          {tech.name}
        </span>
        {hover && (
          <span
            className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-[10px] whitespace-nowrap"
            style={{
              background: "#0F0E0D",
              border: "1px solid rgba(201,168,76,0.4)",
              color: "#C9A84C",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {tech.level}% proficient
          </span>
        )}
      </div>
    </div>
  );
}
