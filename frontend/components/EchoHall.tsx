"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, SVGAttributes } from "react";

const STORAGE_MESSAGES = "echo-hall-messages-v1";
const STORAGE_PIN = "echo-hall-pin-v1";
const MAX_STORED_MESSAGES = 40;

/**
 * Chat API origin.
 * - Production (Vercel): omit `NEXT_PUBLIC_API_BASE_URL` → same-origin `/api/chat`.
 * - Custom API host: set `NEXT_PUBLIC_API_BASE_URL` (no trailing slash).
 * - Local `next dev`: omit env → same-origin `/api/...` (rewritten to uvicorn :8000 in next.config).
 */
function getApiBase(): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (typeof raw !== "string") return "";
  const trimmed = raw.trim().replace(/\/$/, "");
  return trimmed;
}

type Msg = {
  role: "you" | "echo";
  text: string;
};

function isMsgArray(x: unknown): x is Msg[] {
  if (!Array.isArray(x)) return false;
  return x.every(
    (row) =>
      row &&
      typeof row === "object" &&
      (row as Msg).role !== undefined &&
      (row as Msg).text !== undefined &&
      ["you", "echo"].includes((row as Msg).role) &&
      typeof (row as Msg).text === "string"
  );
}

export default function EchoHall() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [pinnedContext, setPinnedContext] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listEndRef = useRef<HTMLDivElement>(null);
  /** After load-from-storage runs; avoids writing [] over saved thread on first paint. */
  const storageReady = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_MESSAGES);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (isMsgArray(parsed) && parsed.length > 0) {
          setMessages(parsed.slice(-MAX_STORED_MESSAGES));
        }
      }
      const pin = localStorage.getItem(STORAGE_PIN);
      if (pin) setPinnedContext(pin);
    } catch {
      /* ignore corrupt storage */
    }
    queueMicrotask(() => {
      storageReady.current = true;
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !storageReady.current) return;
    try {
      localStorage.setItem(
        STORAGE_MESSAGES,
        JSON.stringify(messages.slice(-MAX_STORED_MESSAGES))
      );
    } catch {
      /* quota or private mode */
    }
  }, [messages]);

  const persistPin = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const t = pinnedContext.trim();
      if (t) localStorage.setItem(STORAGE_PIN, pinnedContext);
      else localStorage.removeItem(STORAGE_PIN);
    } catch {
      /* ignore */
    }
  }, [pinnedContext]);

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

    const pin = pinnedContext.trim();

    try {
      const base = getApiBase();
      const url = base ? `${base}/api/chat` : "/api/chat";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          session_context: pin.length > 0 ? pin : undefined,
        }),
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
  }, [draft, loading, pinnedContext]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setError(null);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_MESSAGES);
      } catch {
        /* ignore */
      }
    }
  }, []);

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

        <details className="session-pin">
          <summary>Pinned context (this device only)</summary>
          <p className="session-pin-hint">
            Names, facts, or tone notes persist in your browser and are sent with each message. They are not
            stored on the server.
          </p>
          <textarea
            className="session-pin-input"
            value={pinnedContext}
            onChange={(e) => setPinnedContext(e.target.value)}
            onBlur={persistPin}
            placeholder="e.g. The Forgotten Knight; Echo’s Whisper; formal second person…"
            rows={3}
            disabled={loading}
            aria-label="Pinned session context"
          />
        </details>

        <div className="messages-toolbar">
          <button type="button" className="text-btn" onClick={clearConversation} disabled={loading || messages.length === 0}>
            Clear conversation
          </button>
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
