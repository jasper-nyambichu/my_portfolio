export default function BackgroundOrbs() {
  return (
    <>
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 520,
          height: 520,
          top: "-12%",
          left: "-8%",
          background: "radial-gradient(circle, rgba(201,168,76,0.14), transparent 70%)",
          filter: "blur(90px)",
          opacity: 0.5,
          animation: "drift-1 24s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          bottom: "-15%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.45,
          animation: "drift-2 30s ease-in-out infinite",
        }}
      />
    </>
  );
}
