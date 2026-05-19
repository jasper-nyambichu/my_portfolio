type Props = {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: Props) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-3 ${alignCls}`}>
      <span
        className="text-[11px] uppercase"
        style={{
          color: "#C9A84C",
          letterSpacing: "0.35em",
          fontFamily: "Outfit",
        }}
      >
        {label}
      </span>
      <h2
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: 56,
          lineHeight: 1.1,
          color: "#F0EBE1",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: "Outfit",
            fontSize: 15,
            color: "#9C9488",
            maxWidth: 560,
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
