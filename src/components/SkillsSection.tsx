'use client';
import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import { useInView } from "@/hooks/useInView";
import { TechIcon } from "./TechIcon";
import { BarChart3, Gauge, Activity, Layers } from "lucide-react";

const RINGS = [
  { name: "JavaScript", pct: 88 },
  { name: "TypeScript", pct: 75 },
  { name: "React / Next.js", pct: 82 },
  { name: "PostgreSQL", pct: 70 },
  { name: "Java", pct: 60 },
  { name: "Node.js / Express", pct: 80 },
];

const BAR_GROUPS = [
  { name: "Languages", items: [["JavaScript", 88], ["TypeScript", 75], ["Java", 60]] },
  { name: "Frameworks", items: [["React", 85], ["Next.js", 82], ["Express", 78]] },
  { name: "Databases", items: [["PostgreSQL", 70], ["Supabase", 78], ["Pocketbase", 65]] },
  { name: "Tools", items: [["Git", 85], ["Docker", 60], ["Figma", 72], ["Tailwind", 88]] },
] as const;

function CountUp({ to, active, delay = 0 }: { to: number; active: boolean; delay?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now() + delay;
    const dur = 1400;
    let raf = 0;
    const loop = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / dur));
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, to, delay]);
  return <>{v}</>;
}

function Ring({ pct, name, active, idx }: { pct: number; name: string; active: boolean; idx: number }) {
  const r = 52;
  const C = 2 * Math.PI * r;
  const delay = idx * 120;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now() + delay;
    const dur = 1400;
    let raf = 0;
    const loop = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / dur));
      setProgress(pct * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, pct, delay]);

  return (
    <div className="flex flex-col items-center gap-3 group">
      <div
         className="relative transition-transform duration-500 group-hover:-translate-y-1 w-[110px] h-[110px] sm:w-[140px] sm:h-[140px]"
        style={{ perspective: 600 }}
      >
       <svg viewBox="0 0 140 140" className="-rotate-90 absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E8C97A" />
              <stop offset="100%" stopColor="#C9A84C" />
            </linearGradient>
          </defs>
          <circle cx={70} cy={70} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={4} fill="none" />
          <circle
            cx={70}
            cy={70}
            r={r}
            stroke={`url(#grad-${idx})`}
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C - (progress / 100) * C}
            style={{ filter: "drop-shadow(0 0 8px rgba(201,168,76,0.5))" }}
          />
        </svg>
        {/* Glass orb */}
        <div
          className="absolute inset-3 rounded-full flex flex-col items-center justify-center gap-1"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.12), rgba(255,255,255,0.02) 55%, rgba(0,0,0,0.45))",
            border: "1px solid rgba(201,168,76,0.25)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.15), 0 10px 25px -10px rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
          }}
        >
          <TechIcon name={name} size={26} />
          <div
            className="flex items-baseline"
            style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 15, color: "#C9A84C" }}
          >
            <CountUp to={pct} active={active} delay={delay} />
            <span style={{ fontSize: 10, marginLeft: 1 }}>%</span>
          </div>
        </div>
      </div>
      <span className="text-center" style={{ fontFamily: "Outfit", fontSize: 12, color: "#9C9488", letterSpacing: "0.05em" }}>
        {name}
      </span>
    </div>
  );
}

function Bar({ name, pct, active, idx }: { name: string; pct: number; active: boolean; idx: number }) {
  const delay = idx * 80;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center text-[12px]" style={{ fontFamily: "Outfit" }}>
        <span className="flex items-center gap-2" style={{ color: "#F0EBE1" }}>
          <TechIcon name={name} size={16} />
          {name}
        </span>
        <span style={{ color: "#9C9488", fontFamily: "JetBrains Mono, monospace" }}>
          <CountUp to={pct} active={active} delay={delay} />%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: active ? `${pct}%` : "0%",
            background: "linear-gradient(90deg, #C9A84C, #E8C97A)",
            transition: `width 1.2s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
            boxShadow: "0 0 8px rgba(201,168,76,0.3)",
          }}
        />
      </div>
    </div>
  );
}

const CATEGORY_ICONS: Record<string, typeof BarChart3> = {
  Languages: Activity,
  Frameworks: Layers,
  Databases: Gauge,
  Tools: BarChart3,
};

export default function SkillsSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);
  let barIdx = 0;
  return (
     <section className="relative w-full py-20 sm:py-28 md:py-32" style={{ backgroundColor: "#1A1814" }}>
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 flex flex-col gap-12 sm:gap-16">
        <SectionHeading label="Expertise" title="Skills & Proficiency" align="left" />
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Rings */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-4">
            {RINGS.map((r, i) => (
              <Ring key={r.name} pct={r.pct} name={r.name} active={inView} idx={i} />
            ))}
          </div>
          {/* Bars */}
          <div className="flex flex-col gap-8">
            {BAR_GROUPS.map((g) => {
              const CIcon = CATEGORY_ICONS[g.name] ?? Layers;
              return (
                <div key={g.name} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center rounded-xl"
                      style={{
                        width: 32,
                        height: 32,
                        background:
                          "radial-gradient(circle at 30% 25%, rgba(201,168,76,0.25), rgba(201,168,76,0.04) 70%)",
                        border: "1px solid rgba(201,168,76,0.3)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.1), 0 6px 14px -8px rgba(0,0,0,0.7)",
                      }}
                    >
                      <CIcon size={15} style={{ color: "#C9A84C" }} />
                    </div>
                    <h3
                      className="uppercase"
                      style={{
                        fontFamily: "Outfit",
                        fontSize: 11,
                        letterSpacing: "0.3em",
                        color: "#9C9488",
                      }}
                    >
                      {g.name}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3 pl-11">
                    {g.items.map(([n, p]) => (
                      <Bar key={n as string} name={n as string} pct={p as number} active={inView} idx={barIdx++} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
