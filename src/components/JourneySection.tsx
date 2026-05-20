'use client';
import { useEffect, useRef, useState } from "react";
import { Code2, Server, Cpu, Database, Rocket, Trophy, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

const EVENTS = [
  { year: "2022", title: "Started Coding", desc: "Discovered programming and shipped first HTML & CSS experiments.", icon: Code2 },
  { year: "2023", title: "First Backend Project", desc: "Built first REST API with Node.js and Express, learning auth and persistence.", icon: Server },
  { year: "2023", title: "React & Next.js", desc: "Mastered modern frontend frameworks and shipped my first full-stack app.", icon: Cpu },
  { year: "2024", title: "Database & Cloud", desc: "Adopted PostgreSQL and Supabase, deployed my first production application.", icon: Database },
  { year: "2024", title: "BlessPay Launched", desc: "Built a complete fintech platform with end-to-end M-Pesa integration.", icon: Rocket },
  { year: "2025", title: "iGotaTalent.org", desc: "Launched a talent showcase platform live on a custom production domain.", icon: Trophy },
  { year: "2026", title: "Open to Work", desc: "Seeking full-stack roles, freelance projects, and collaborations.", icon: Sparkles, current: true },
];

export default function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh * 0.5;
      const passed = vh * 0.5 - r.top;
      setProgress(Math.max(0, Math.min(1, passed / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full py-20 sm:py-28 md:py-32" style={{ backgroundColor: "#1A1814" }}>
      <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 md:px-8 flex flex-col gap-16 sm:gap-20">
        <SectionHeading label="My Story" title="The Journey So Far" />

        <div ref={ref} className="relative">
          {/* center line (desktop) / left line (mobile) */}
          <div
            className="absolute top-0 bottom-0 w-px left-4 md:left-1/2 md:-translate-x-1/2"
            style={{ background: "rgba(156,148,136,0.18)" }}
          />
          <div
            className="absolute top-0 w-px left-4 md:left-1/2 md:-translate-x-1/2"
            style={{
              background: "linear-gradient(180deg, #C9A84C, rgba(201,168,76,0.3))",
              height: `${progress * 100}%`,
              boxShadow: "0 0 8px rgba(201,168,76,0.6)",
              transition: "height 0.1s linear",
            }}
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {EVENTS.map((e, i) => {
              const left = i % 2 === 0;
              const { icon, ...rest } = e;
              return <TimelineRow key={i} left={left} icon={icon} {...rest} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineRow({
  left,
  icon: Icon,
  year,
  title,
  desc,
  current,
}: {
  left: boolean;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  year: string;
  title: string;
  desc: string;
  current?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rowRef} className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center pl-12 md:pl-0">
      {/* Node */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center" style={{ top: 12 }}>
        {current && (
          <span
            className="absolute rounded-full"
            style={{
              width: 28,
              height: 28,
              border: "1px solid rgba(201,168,76,0.5)",
              animation: "pulse-glow 2.5s ease-in-out infinite",
            }}
          />
        )}
        <span
          className="rounded-full"
          style={{
            width: 12,
            height: 12,
            background: current ? "transparent" : "#C9A84C",
            border: current ? "2px solid #C9A84C" : "none",
            boxShadow: current ? "0 0 12px #C9A84C" : "0 0 6px rgba(201,168,76,0.5)",
          }}
        />
      </div>


      {/* Card */}
      <div
        className={left ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12"}
        style={{
          transform: vis ? "translateX(0)" : `translateX(${left ? -30 : 30}px)`,
          opacity: vis ? 1 : 0,
          transition: "all 0.7s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <div
          className="relative rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderLeft: "2px solid #C9A84C",
            backdropFilter: "blur(6px)",
          }}
        >
          <Icon size={16} style={{ color: "rgba(201,168,76,0.6)", position: "absolute", top: 18, right: 18 }} />
          <div className="flex items-center gap-2 mb-2">
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#C9A84C", letterSpacing: "0.1em" }}>
              {year}
            </span>
            {current && (
              <span
                className="px-1.5 py-0.5 rounded-full text-[9px] uppercase"
                style={{
                  background: "rgba(201,168,76,0.15)",
                  color: "#C9A84C",
                  border: "1px solid rgba(201,168,76,0.4)",
                  letterSpacing: "0.2em",
                  fontFamily: "Outfit",
                }}
              >
                Current
              </span>
            )}
          </div>
          <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, color: "#F0EBE1", marginBottom: 6 }}>
            {title}
          </h3>
          <p style={{ fontFamily: "Outfit", fontSize: 13.5, color: "#9C9488", lineHeight: 1.65 }}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
