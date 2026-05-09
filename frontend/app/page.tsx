import ShrineChat from "@/components/ShrineChat";

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
          Some burdens are borne in silence—not because they deserve darkness, but because the world seldom
          offers a shrine.
        </p>
        <p className="lore">
          This place does not resemble any kingdom you have played through. It echoes one feeling only:
          reverence for the courage it takes to be soft with yourself—like a moth turning toward warmth in
          halls that forgot their name.
        </p>

        <ShrineChat />

        <p className="footer-whisper">
          You are not diminished for needing a voice that holds you steady.
        </p>
      </main>
    </div>
  );
}
