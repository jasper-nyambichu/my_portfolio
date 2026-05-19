'use client';
import { useEffect, useState } from "react";
// ✅ Replace with
import { Download, ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/SocialIcons";
import Image from "next/image";
import profileImg from "@/assets/profile.jpg";

const ROLES = [
  "Full-Stack Developer",
  "UI/UX Engineer",
  "Backend Architect",
  "React & Next.js Dev",
  "API & Database Expert",
];

function Typewriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIdx];
    const speed = deleting ? 40 : 75;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDeleting(true), 1600);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, roleIdx]);

  return (
    <p
      className="italic"
      style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: 28,
        color: "#C9A84C",
        minHeight: 40,
      }}
    >
      {text}
      <span
        className="inline-block ml-1 align-middle"
        style={{
          width: 2,
          height: 26,
          background: "#C9A84C",
          animation: "blink 1s steps(1) infinite",
        }}
      />
    </p>
  );
}

function CornerBracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "top-6 left-6 border-t border-l",
    tr: "top-6 right-6 border-t border-r",
    bl: "bottom-6 left-6 border-b border-l",
    br: "bottom-6 right-6 border-b border-r",
  } as const;
  return (
    <div
      className={`absolute w-10 h-10 ${map[pos]}`}
      style={{ borderColor: "rgba(201,168,76,0.2)" }}
      aria-hidden
    />
  );
}

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0F0E0D" }}
    >
      {/* Radial warm tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, rgba(15,14,13,0) 60%)",
        }}
      />

      {/* Drifting gold orbs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 520,
          height: 520,
          top: "-10%",
          left: "-8%",
          background: "radial-gradient(circle, rgba(201,168,76,0.18), transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.6,
          animation: "drift-1 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          bottom: "-15%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(201,168,76,0.16), transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.55,
          animation: "drift-2 28s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 420,
          height: 420,
          top: "40%",
          left: "45%",
          background: "radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%)",
          filter: "blur(90px)",
          opacity: 0.5,
          animation: "drift-3 32s ease-in-out infinite",
        }}
      />

      <CornerBracket pos="tl" />
      <CornerBracket pos="tr" />
      <CornerBracket pos="bl" />
      <CornerBracket pos="br" />

      {/* Content */}
      <div className="relative mx-auto max-w-[1200px] min-h-screen px-8 py-20 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
          {/* LEFT */}
          <div className="flex flex-col gap-8">
            {/* Pill badge */}
            <div
              className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#4ade80",
                  boxShadow: "0 0 8px #4ade80",
                }}
              />
              <span
                className="text-xs tracking-wide"
                style={{ color: "#C9A84C", fontFamily: "Outfit" }}
              >
                Available for opportunities
              </span>
            </div>

            {/* Heading */}
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 72,
                lineHeight: 1.05,
                color: "#F0EBE1",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              Hi, I'm <span style={{ color: "#C9A84C" }}>Dickson</span>
            </h1>

            <Typewriter />

            <p
              style={{
                fontFamily: "Outfit",
                fontSize: 16,
                color: "#9C9488",
                lineHeight: 1.8,
                maxWidth: 480,
              }}
            >
              I craft thoughtful, performant digital products from idea to
              deployment. Blending elegant interfaces with resilient backends
              to ship software that feels effortless.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                className="group px-6 py-3 rounded-md transition-all duration-300 text-sm tracking-wide"
                style={{
                  border: "1px solid #C9A84C",
                  color: "#C9A84C",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#C9A84C";
                  e.currentTarget.style.color = "#0F0E0D";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#C9A84C";
                }}
              >
                View My Work
              </button>
              <button
                className="px-6 py-3 rounded-md transition-all duration-300 text-sm tracking-wide"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F0EBE1",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                Hire Me
              </button>
            </div>

            {/* Social row */}
            <div className="flex items-center gap-5 pt-2">
              {[GithubIcon, LinkedinIcon, XIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="transition-colors"
                  style={{ color: "#5C574F" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#C9A84C")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#5C574F")
                  }
                >
                  <Icon size={18} />
                </a>
              ))}
              <span
                className="h-4 w-px"
                style={{ background: "rgba(255,255,255,0.12)" }}
              />
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm transition-colors"
                style={{ color: "#9C9488", fontFamily: "Outfit" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#C9A84C")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#9C9488")
                }
              >
                Download CV <Download size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center gap-10">
            <div className="relative" style={{ width: 360, height: 360 }}>
              {/* Dashed orbit */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px dashed rgba(201,168,76,0.2)",
                  animation: "spin-slow 40s linear infinite",
                }}
              >
                <span
                  className="absolute rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: "#C9A84C",
                    top: -4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    boxShadow: "0 0 10px #C9A84C",
                  }}
                />
              </div>

              {/* Inner rotating ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: 20,
                  border: "1px dashed rgba(201,168,76,0.12)",
                  animation: "spin-rev 60s linear infinite",
                }}
              />

              {/* Photo */}
              <div
                className="absolute rounded-full overflow-hidden"
                style={{
                  inset: 40,
                  border: "2px solid #C9A84C",
                  animation: "pulse-glow 4s ease-in-out infinite",
                }}
              >
                <Image
               src="/profile.jpeg"
               alt="Portrait — full-stack developer"
               fill
               className="object-cover"
               priority
                />
              </div>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-2 rounded-2xl p-2"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {[
                { n: "2+", l: "Years" },
                { n: "8+", l: "Projects" },
                { n: "10+", l: "Skills" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="px-6 py-4 text-center rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: 32,
                      color: "#C9A84C",
                      lineHeight: 1,
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    style={{
                      fontFamily: "Outfit",
                      fontSize: 11,
                      color: "#9C9488",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: 6,
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(240,235,225,0.3)", fontFamily: "Outfit" }}
        >
          Scroll
        </span>
        <div
          className="flex items-start justify-center rounded-full"
          style={{
            width: 22,
            height: 36,
            border: "1px solid rgba(201,168,76,0.4)",
            padding: 4,
          }}
        >
          <span
            className="rounded-full"
            style={{
              width: 4,
              height: 6,
              background: "#C9A84C",
              animation: "scroll-bounce 1.8s ease-in-out infinite",
            }}
          />
        </div>
        <ArrowDown size={12} style={{ color: "rgba(201,168,76,0.4)" }} />
      </div>
    </section>
  );
}
