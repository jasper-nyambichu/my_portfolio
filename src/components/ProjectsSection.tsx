'use client';
import { useRef, useState } from "react";
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
};

const PROJECTS: Project[] = [
  {
    name: "BlessPay",
    desc: "A modern church payment platform powering tithes, offerings, and event giving with M-Pesa.",
    stack: ["Next.js", "Express", "PostgreSQL", "Supabase", "M-Pesa"],
    featured: true,
    accent: "linear-gradient(135deg, #1a3a2e 0%, #0F0E0D 60%)",
  },
  {
    name: "iGotaTalent.org",
    desc: "Talent discovery and showcase platform with submissions, profiles, and live voting.",
    stack: ["Next.js", "Pocketbase", "TypeScript", "Tailwind"],
    accent: "linear-gradient(135deg, #3a2a1a 0%, #0F0E0D 60%)",
  },
  {
    name: "Portfolio Website",
    desc: "This site — handcrafted with intentional motion and a warm spatial design system.",
    stack: ["Next.js", "Three.js", "Framer Motion", "Tailwind"],
    accent: "linear-gradient(135deg, #2a1a3a 0%, #0F0E0D 60%)",
  },
  { name: "In the Studio", desc: "Something quiet in the works.", stack: ["TBD"], comingSoon: true },
  { name: "In the Studio", desc: "Another one cooking.", stack: ["TBD"], comingSoon: true },
];

function MockScreenshot({ accent, title }: { accent?: string; title: string }) {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: accent ?? "linear-gradient(135deg, #1a1814, #0F0E0D)" }}
    >
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.18), transparent 60%)",
      }} />
      <div className="absolute top-4 left-4 flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(201,168,76,0.5)" }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, color: "rgba(240,235,225,0.4)", fontStyle: "italic" }}>
          {title}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }} />
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
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }); }}
      className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${featured ? "lg:col-span-2" : ""}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${hover ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: hover ? "0 30px 80px -30px rgba(201,168,76,0.25), 0 0 0 1px rgba(201,168,76,0.15) inset" : "0 10px 30px -20px rgba(0,0,0,0.5)",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hover ? -4 : 0}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(201,168,76,0.4)" }} />

      {/* Screenshot */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: featured ? "16/8" : "16/10" }}>
        <div
          className="w-full h-full transition-transform duration-700"
          style={{ transform: hover ? "scale(1.04)" : "scale(1)" }}
        >
          <MockScreenshot accent={p.accent} title={p.name} />
        </div>
        {p.comingSoon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 backdrop-blur-md" style={{ background: "rgba(15,14,13,0.7)" }}>
            <Lock size={22} style={{ color: "#C9A84C" }} />
            <span style={{ fontFamily: "Outfit", fontSize: 11, color: "#C9A84C", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-7 flex flex-col gap-4">
        <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: featured ? 36 : 26, color: "#F0EBE1", lineHeight: 1.1 }}>
          {p.name}
        </h3>
        <p style={{ fontFamily: "Outfit", fontSize: 14, color: "#9C9488", lineHeight: 1.6 }}>
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
            <button
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs transition-colors"
              style={{
                background: "#C9A84C",
                color: "#0F0E0D",
                fontFamily: "Outfit",
                fontWeight: 500,
              }}
            >
              <ExternalLink size={12} /> Live Demo
            </button>
            <button
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs transition-colors"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#F0EBE1",
                fontFamily: "Outfit",
              }}
            >
              <GithubIcon size={12} /> GitHub
            </button>
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
        <SectionHeading label="Work" title="Projects I've Built" align="left" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {PROJECTS.map((p, i) => (
            <Card key={i} p={p} featured={p.featured} />
          ))}
        </div>
      </div>
    </section>
  );
}
