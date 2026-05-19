const D = (p: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${p}`;

export const TECH_ICONS: Record<string, string> = {
  JavaScript: D("javascript/javascript-original.svg"),
  TypeScript: D("typescript/typescript-original.svg"),
  Java: D("java/java-original.svg"),
  React: D("react/react-original.svg"),
  "React / Next.js": D("react/react-original.svg"),
  "Next.js": D("nextjs/nextjs-original.svg"),
  "Node.js": D("nodejs/nodejs-original.svg"),
  "Node.js / Express": D("nodejs/nodejs-original.svg"),
  Express: D("express/express-original.svg"),
  "Express.js": D("express/express-original.svg"),
  Tailwind: D("tailwindcss/tailwindcss-original.svg"),
  "Tailwind CSS": D("tailwindcss/tailwindcss-original.svg"),
  PostgreSQL: D("postgresql/postgresql-original.svg"),
  Supabase: D("supabase/supabase-original.svg"),
  Pocketbase: "https://cdn.simpleicons.org/pocketbase/B8DBE4",
  Git: D("git/git-original.svg"),
  Docker: D("docker/docker-original.svg"),
  Figma: D("figma/figma-original.svg"),
};

export function TechIcon({
  name,
  size = 22,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const src = TECH_ICONS[name];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={name}
      draggable={false}
      className={className}
      style={{
        width: size,
        height: size,
        filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.55))",
        userSelect: "none",
      }}
    />
  );
}

export function TechIconTile({
  name,
  size = 38,
  tile = 56,
  active = true,
}: {
  name: string;
  size?: number;
  tile?: number;
  active?: boolean;
}) {
  return (
    <div
      className="relative flex items-center justify-center rounded-2xl shrink-0"
      style={{
        width: tile,
        height: tile,
        background:
          "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.14), rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.35))",
        border: `1px solid ${active ? "rgba(201,168,76,0.45)" : "rgba(201,168,76,0.18)"}`,
        boxShadow:
          "0 10px 24px -10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)",
        backdropFilter: "blur(8px)",
      }}
    >
      <TechIcon name={name} size={size} />
    </div>
  );
}
