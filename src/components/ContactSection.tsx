'use client';

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { Mail, MapPin, Check, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/SocialIcons";

// ── Input shared style ─────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#F0EBE1",
  fontFamily: "Outfit",
  fontSize: 14,
  borderRadius: 8,
  padding: "12px 14px",
  width: "100%",
  outline: "none",
  transition: "all 0.2s",
};

// ── Social links data ──────────────────────────────────────────────────
const socials = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: (size: number) => <GithubIcon size={size} />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: (size: number) => <LinkedinIcon size={size} />,
  },
  {
    name: "X",
    href: "https://twitter.com/yourusername",
    icon: (size: number) => <XIcon size={size} />,
  },
];

// ── Main component ─────────────────────────────────────────────────────
export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Job Opportunity",
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 1200);
  };

  return (
    <section
      className="relative w-full py-32"
      style={{ backgroundColor: "#1A1814" }}
    >
      <div className="relative mx-auto max-w-[1200px] px-8 flex flex-col gap-16">

        {/* ── Section heading ─────────────────────────────────── */}
        <SectionHeading
          label="Contact"
          title={
            <>
              Let&apos;s Build Something
              <span style={{ color: "#C9A84C" }}>.</span>
            </>
          }
          subtitle="Open to roles, freelance briefs, and quietly ambitious side projects."
        />

        {/* ── Main grid ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* LEFT — info cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <InfoCard
              icon={<Mail size={18} style={{ color: "#C9A84C" }} />}
              label="Email"
              value="your@email.com"
            />
            <InfoCard
              icon={<MapPin size={18} style={{ color: "#C9A84C" }} />}
              label="Location"
              value="Nairobi, Kenya"
            />
            <InfoCard
              icon={
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background: "#4ade80",
                    boxShadow: "0 0 8px #4ade80",
                    animation: "pulse-glow 2s ease-in-out infinite",
                    display: "inline-block",
                  }}
                />
              }
              label="Status"
              value="Available for full-time, freelance & collaborations"
            />
          </div>

          {/* RIGHT — form */}
          <div
            className="lg:col-span-3 rounded-2xl p-7"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            {done ? (
              // ── Success state ──────────────────────────────────
              <div className="flex flex-col items-center justify-center text-center gap-4 py-14">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(201,168,76,0.12)",
                    border: "1px solid rgba(201,168,76,0.5)",
                    animation: "pulse-glow 2.5s ease-in-out infinite",
                  }}
                >
                  <Check size={28} style={{ color: "#C9A84C" }} />
                </div>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 28,
                    color: "#F0EBE1",
                  }}
                >
                  Message sent
                </h3>
                <p style={{ fontFamily: "Outfit", fontSize: 14, color: "#9C9488" }}>
                  I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setDone(false);
                    setForm({ name: "", email: "", subject: "Job Opportunity", message: "" });
                  }}
                  className="mt-2 text-sm underline underline-offset-4 transition-colors"
                  style={{ color: "#9C9488", fontFamily: "Outfit", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9C9488")}
                >
                  Send another message
                </button>
              </div>
            ) : (
              // ── Form ───────────────────────────────────────────
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <Field label="Full Name">
                  <input
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    placeholder="Your name"
                    onFocus={(e) =>
                      (e.currentTarget.style.boxShadow = "0 0 0 2px rgba(201,168,76,0.4)")
                    }
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </Field>

                <Field label="Email Address">
                  <input
                    required
                    type="email"
                    maxLength={255}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    placeholder="you@example.com"
                    onFocus={(e) =>
                      (e.currentTarget.style.boxShadow = "0 0 0 2px rgba(201,168,76,0.4)")
                    }
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </Field>

                <Field label="Subject">
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    style={inputStyle}
                  >
                    <option>Job Opportunity</option>
                    <option>Freelance Project</option>
                    <option>Collaboration</option>
                    <option>Just Saying Hi</option>
                  </select>
                </Field>

                <Field label="Message">
                  <textarea
                    required
                    maxLength={1000}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                    placeholder="Tell me about your project…"
                    onFocus={(e) =>
                      (e.currentTarget.style.boxShadow = "0 0 0 2px rgba(201,168,76,0.4)")
                    }
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 py-3 rounded-md transition-all"
                  style={{
                    background: "#C9A84C",
                    color: "#0F0E0D",
                    fontFamily: "Outfit",
                    fontWeight: 500,
                    fontSize: 14,
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.8 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) e.currentTarget.style.background = "#D9B85C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#C9A84C";
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <p
                  className="text-center"
                  style={{ fontFamily: "Outfit", fontSize: 12, color: "#9C9488" }}
                >
                  or reach out directly at{" "}
                  <a
                    href="mailto:your@email.com"
                    style={{ color: "#C9A84C" }}
                  >
                    your@email.com
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* ── Social row ───────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-8 pt-6">
          {socials.map(({ name, href, icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors"
              style={{ color: "#9C9488", fontFamily: "Outfit", fontSize: 13 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9C9488")}
            >
              {icon(16)}
              {name}
            </a>
          ))}
        </div>

        {/* ── Footer ───────────────────────────────────────────── */}
        <div className="pt-10 flex flex-col items-center gap-4">
          <div
            className="w-full h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
            }}
          />
          <p
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              color: "#5C574F",
            }}
          >
            © 2026 Your Name · Built with Next.js &{" "}
            <span style={{ color: "#C9A84C" }}>♥</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ── InfoCard sub-component ─────────────────────────────────────────────
function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="rounded-2xl p-5 flex items-start gap-4"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderLeft: "2px solid #C9A84C",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: "rgba(201,168,76,0.1)",
          border: "1px solid rgba(201,168,76,0.25)",
        }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span
          style={{
            fontFamily: "Outfit",
            fontSize: 10.5,
            letterSpacing: "0.25em",
            color: "#9C9488",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "Outfit",
            fontSize: 14,
            color: "#F0EBE1",
            lineHeight: 1.5,
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

// ── Field sub-component ────────────────────────────────────────────────
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        style={{
          fontFamily: "Outfit",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#9C9488",
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}