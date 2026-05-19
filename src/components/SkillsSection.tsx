'use client';
import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import { useInView } from "@/hooks/useInView";

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
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: 128, height: 128 }}>
        <svg width={128} height={128} className="-rotate-90">
          <circle cx={64} cy={64} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={3} fill="none" />
          <circle
            cx={64}
            cy={64}
            r={r}
            stroke="#C9A84C"
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C - (progress / 100) * C}
            style={{ filter: "drop-shadow(0 0 6px rgba(201,168,76,0.4))" }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 24, color: "#C9A84C" }}
        >
          <CountUp to={pct} active={active} delay={delay} />
          <span style={{ fontSize: 14, marginLeft: 1 }}>%</span>
        </div>
      </div>
      <span style={{ fontFamily: "Outfit", fontSize: 12, color: "#9C9488", letterSpacing: "0.05em" }}>
        {name}
      </span>
    </div>
  );
}

function Bar({ name, pct, active, idx }: { name: string; pct: number; active: boolean; idx: number }) {
  const delay = idx * 80;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-[12px]" style={{ fontFamily: "Outfit" }}>
        <span style={{ color: "#F0EBE1" }}>{name}</span>
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

export default function SkillsSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  let barIdx = 0;
  return (
    <section className="relative w-full py-32" style={{ backgroundColor: "#1A1814" }}>
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-8 flex flex-col gap-16">
        <SectionHeading label="Expertise" title="Skills & Proficiency" align="left" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Rings */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-4">
            {RINGS.map((r, i) => (
              <Ring key={r.name} pct={r.pct} name={r.name} active={inView} idx={i} />
            ))}
          </div>
          {/* Bars */}
          <div className="flex flex-col gap-8">
            {BAR_GROUPS.map((g) => (
              <div key={g.name} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-px h-4" style={{ background: "#C9A84C" }} />
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
                <div className="flex flex-col gap-3 pl-4">
                  {g.items.map(([n, p]) => (
                    <Bar key={n as string} name={n as string} pct={p as number} active={inView} idx={barIdx++} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
