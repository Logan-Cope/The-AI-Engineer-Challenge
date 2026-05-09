import EchoHall from "@/components/EchoHall";

/** Drifting luminance specs — deterministic positions for SSR / hydration parity */
const SPORES = Array.from({ length: 26 }, (_, i) => ({
  key: i,
  leftPct: (((i * 37) % 100) / 100) * 94 + 3,
  delayS: ((i * 2.41) % 14) + (i % 5) * 0.33,
}));

export default function Home() {
  return (
    <div className="realm">
      <div className="vignette" aria-hidden />

      <div className="spores" aria-hidden>
        {SPORES.map(({ key, leftPct, delayS }) => (
          <span
            key={key}
            className="spore"
            style={{
              left: `${leftPct}%`,
              animationDelay: `${delayS}s`,
            }}
          />
        ))}
      </div>

      <main className="inner">
        <p className="eyebrow">Beneath the surface of thought</p>
        <h1 className="title">Hall of Gentle Echoes</h1>
        <p className="subtitle">
          Some burdens stay quiet. The world rarely makes room for them. Here you can speak without having to
          explain.
        </p>
        <p className="lore">
          No borrowed kingdom. No borrowed story. Only the thin courage of being kind to yourself in the
          dark—moths toward a small warmth, in corridors whose names wore away ages ago.
        </p>

        <EchoHall />

        <p className="footer-whisper">
          The hall keeps no ledger of who needed soft ground.
        </p>
      </main>
    </div>
  );
}
