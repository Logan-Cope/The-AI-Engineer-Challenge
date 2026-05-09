"use client";

import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, SVGAttributes } from "react";

/** API base URL: FastAPI default is http://localhost:8000 */
function getApiBase(): string {
  const fromEnv =
    typeof process.env.NEXT_PUBLIC_API_BASE_URL === "string"
      ? process.env.NEXT_PUBLIC_API_BASE_URL.trim().replace(/\/$/, "")
      : "";
  return fromEnv.length > 0 ? fromEnv : "http://localhost:8000";
}

type Msg = {
  role: "you" | "echo";
  text: string;
};

export default function EchoHall() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    queueMicrotask(() => listEndRef.current?.scrollIntoView({ behavior: "smooth" }));
  };

  const send = useCallback(async () => {
    const message = draft.trim();
    if (!message || loading) return;

    setDraft("");
    setError(null);
    setMessages((m) => [...m, { role: "you", text: message }]);
    scrollToBottom();
    setLoading(true);

    try {
      const base = getApiBase();
      const res = await fetch(`${base}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        let detail = res.statusText;
        try {
          const body = await res.json();
          if (body?.detail != null) detail = String(body.detail);
        } catch {
          try {
            detail = await res.text();
          } catch {
            /* keep statusText */
          }
        }
        throw new Error(detail || `Request failed (${res.status})`);
      }

      const data = (await res.json()) as { reply?: string };
      const reply = data.reply ?? "";
      setMessages((m) => [...m, { role: "echo", text: reply || "…" }]);
      scrollToBottom();
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : "Nothing returned from the deep. Check OPENAI_API_KEY and that the backend runs at "
            + `${getApiBase()}.`;
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [draft, loading]);

  const onKeyDown = (ev: KeyboardEvent<HTMLTextAreaElement>) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      void send();
    }
  };

  return (
    <div className="hall-panel-wrap">
      <div className="hall-panel-frame">
        <span className="corner-accent tl" aria-hidden />
        <span className="corner-accent tr" aria-hidden />
        <span className="corner-accent bl" aria-hidden />
        <span className="corner-accent br" aria-hidden />

        <div className="hall-panel-header">
          <LanternGlyph className="lantern-glyph" aria-hidden />
          <div>
            <h2>Whispers into the veil</h2>
            <p>
              Say it plainly. The voice below reads for what is true, not for polish.
            </p>
          </div>
        </div>

        <div className="messages" aria-live="polite" aria-busy={loading}>
          {messages.length === 0 ? (
            <p className="lore" style={{ marginBottom: "0", borderLeftColor: "rgba(109, 212, 200, 0.25)" }}>
              The hall is still. A sorrow, a hope, a stray thought—none of it needs to arrive dressed in
              eloquence.
            </p>
          ) : (
            messages.map((m, i) => (
              <div key={`${m.role}-${i}`} className={`turn ${m.role === "you" ? "you" : "echo"}`}>
                <div className="bubble-label">{m.role === "you" ? "You" : "Gentle echo"}</div>
                <div className="bubble">{m.text}</div>
              </div>
            ))
          )}
          <div ref={listEndRef} />
        </div>

        <div className="form-row">
          <div className="input-wrap">
            <label htmlFor="echo-hall-input">What lingers?</label>
            <textarea
              id="echo-hall-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Lay it down softly…"
              disabled={loading}
              rows={3}
            />
          </div>
          <button type="button" className="reach-btn" onClick={() => void send()} disabled={loading}>
            Reach
          </button>
        </div>

        {error ? (
          <p className="error-banner" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function LanternGlyph({
  className,
  ...rest
}: SVGAttributes<SVGElement> & { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {/* Abstract lantern emblem — solitude of light underground, original shapes */}
      <path
        d="M24 8L18 22h12L24 8z"
        fill="currentColor"
        fillOpacity="0.92"
      />
      <path
        d="M17 26h14v14a4 4 0 01-4 4h-6a4 4 0 01-4-4V26z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path
        d="M21 34h6"
        stroke="currentColor"
        strokeOpacity="0.85"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
