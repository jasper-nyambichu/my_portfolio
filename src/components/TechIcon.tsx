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
      loading="lazy"
      decoding="async"
      className={className}
      style={{
        width: size,
        height: size,
        /*
         * drop-shadow triggers a filter composite step every frame it changes.
         * Moving it to a wrapping element's box-shadow (handled in TechIconTile)
         * keeps this img on its own GPU layer without a filter re-composite.
         */
        userSelect: "none",
        display: "block",
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
      className="relative flex items-center justify-center rounded-2xl shrink-0 tech-icon-tile"
      style={{
        width: tile,
        height: tile,
        /*
         * Performance notes:
         * - will-change: transform tells the browser to promote this element to
         *   its own compositor layer ahead of time, so scroll + hover transforms
         *   never trigger layout or paint.
         * - contain: layout style paint isolates this subtree from the rest of
         *   the page so its repaints don't bubble up and stall the scroll thread.
         * - backdrop-filter: blur() is intentionally removed from individual
         *   tiles — it's the #1 cause of scroll jank on repeated elements.
         *   Apply it only on a single parent wrapper if needed.
         * - box-shadow replaces the drop-shadow filter on the child <img> so
         *   the shadow is resolved in the compositor, not the filter pipeline.
         */
        willChange: "transform",
        contain: "layout style paint",
        background:
          "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.14), rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.35))",
        border: `1px solid ${active ? "rgba(201,168,76,0.45)" : "rgba(201,168,76,0.18)"}`,
        boxShadow:
          "0 10px 24px -10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)",
        /* No backdrop-filter here — see note above */
      }}
    >
      <TechIcon name={name} size={size} />
    </div>
  );
}