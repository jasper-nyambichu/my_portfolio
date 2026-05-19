'use client';
import { Layers, Code2, Database, Palette, CreditCard, CloudUpload, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const SERVICES = [
  { icon: Layers, name: "Full-Stack Development", desc: "End-to-end product builds from database schema to polished interface.", span: "md:col-span-2" },
  { icon: Code2, name: "REST API Design", desc: "Type-safe, well-documented APIs that scale with your product." },
  { icon: Database, name: "Database Architecture", desc: "Relational schemas, migrations, and queries tuned for performance." },
  { icon: Palette, name: "UI/UX Implementation", desc: "Translating refined designs into pixel-precise, animated interfaces.", span: "md:col-span-2" },
  { icon: CreditCard, name: "Payment Integration", desc: "M-Pesa, Stripe, and custom flows with reconciliation built in." },
  { icon: CloudUpload, name: "Cloud Deployment", desc: "Edge-ready deploys, observability, and CI/CD pipelines you can trust." },
];

export default function ServicesSection() {
  return (
    <section className="relative w-full py-32" style={{ backgroundColor: "#0F0E0D" }}>
      <div className="relative mx-auto max-w-[1200px] px-8 flex flex-col gap-16">
        <SectionHeading
          label="Services"
          title="What I Can Build For You"
          subtitle="A small set of capabilities, executed with care — from first sketch to production deploy."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`group relative rounded-[20px] p-7 flex flex-col gap-4 transition-all duration-500 ${s.span ?? ""}`}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  minHeight: 220,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 30px 60px -30px rgba(201,168,76,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.04))",
                    border: "1px solid rgba(201,168,76,0.3)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <Icon size={22} style={{ color: "#C9A84C" }} />
                </div>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, color: "#F0EBE1", lineHeight: 1.15 }}>
                  {s.name}
                </h3>
                <p style={{ fontFamily: "Outfit", fontSize: 14, color: "#9C9488", lineHeight: 1.65 }}>
                  {s.desc}
                </p>
                <ArrowRight
                  size={16}
                  className="absolute bottom-6 right-6 transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: "#C9A84C" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
