'use client';
import { useEffect, useMemo, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import BackgroundOrbs from "./BackgroundOrbs";

type Tech = { name: string; category: "Languages" | "Frameworks" | "Databases" | "Tools"; level: number };

const TECHS: Tech[] = [
  { name: "JavaScript", category: "Languages", level: 88 },
  { name: "TypeScript", category: "Languages", level: 75 },
  { name: "Java", category: "Languages", level: 60 },
  { name: "React", category: "Frameworks", level: 85 },
  { name: "Next.js", category: "Frameworks", level: 82 },
  { name: "Node.js", category: "Frameworks", level: 80 },
  { name: "Express.js", category: "Frameworks", level: 78 },
  { name: "Tailwind CSS", category: "Frameworks", level: 88 },
  { name: "PostgreSQL", category: "Databases", level: 70 },
  { name: "Supabase", category: "Databases", level: 78 },
  { name: "Pocketbase", category: "Databases", level: 65 },
  { name: "Git", category: "Tools", level: 85 },
  { name: "Docker", category: "Tools", level: 60 },
  { name: "Figma", category: "Tools", level: 72 },
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
  const radius = 200;
  const pts = useMemo(() => spherePoints(TECHS.length, radius), []);

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

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setPitch(-10 + cy * -20);
    setYaw((y) => y + cx * 0.6);
  };

  return (
    <section className="relative w-full py-32 overflow-hidden" style={{ backgroundColor: "#0F0E0D" }}>
      <BackgroundOrbs />
      <div className="relative mx-auto max-w-[1200px] px-8 flex flex-col items-center gap-16">
        <SectionHeading label="My Stack" title="Tools I Build With" />

        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          className="relative w-full"
          style={{ height: 520, perspective: 1200 }}
        >
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate(-50%,-50%) rotateX(${pitch}deg) rotateY(${yaw}deg)`,
              transition: "transform 0.1s linear",
            }}
          >
            {TECHS.map((tech, i) => {
              const p = pts[i];
              const active = tech.category === tab;
              return (
                <Chip key={tech.name} tech={tech} active={active} x={p.x} y={p.y} z={p.z} counterYaw={-yaw} counterPitch={-pitch} />
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
}: {
  tech: Tech;
  active: boolean;
  x: number;
  y: number;
  z: number;
  counterYaw: number;
  counterPitch: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="absolute"
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${counterYaw}deg) rotateX(${counterPitch}deg) translate(-50%,-50%)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${active || hover ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.2)"}`,
          color: active ? "#F0EBE1" : "rgba(240,235,225,0.85)",
          fontSize: 12,
          fontFamily: "Outfit",
          boxShadow: active || hover ? "0 0 20px rgba(201,168,76,0.35)" : "none",
          transform: hover ? "scale(1.08)" : "scale(1)",
          backdropFilter: "blur(6px)",
          opacity: active ? 1 : 0.65,
          cursor: "default",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#C9A84C", boxShadow: "0 0 6px #C9A84C" }}
        />
        {tech.name}
        {hover && (
          <span
            className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-[10px] whitespace-nowrap"
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
