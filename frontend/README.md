# Front end · Hall of Gentle Echoes

Next.js UI for **The AI Engineer Challenge**: a moody, “forgotten-kingdom” atmosphere (inspired loosely by melancholic indie metroidvania tone—**original** art and copy only).

## Prerequisites

- **Node.js** 18+ recommended (20+ preferred for Next.js 15)
- **npm** (or swap commands for `pnpm` / `yarn`)
- For local full-stack: FastAPI on port 8000 — see repo root README

## Run locally

From this `frontend/` directory:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

1. Terminal A (repo root): `export OPENAI_API_KEY=sk-...` then `uv run uvicorn api.index:app --reload`
2. Terminal B (`frontend/`): `npm run dev`

`next.config.ts` rewrites `/api/*` → `http://127.0.0.1:8000/api/*` when **not** on Vercel, so the UI can call relative `/api/chat` without setting `NEXT_PUBLIC_API_BASE_URL`.

## Configure API URL (optional)

- **Default:** Same-origin `/api/chat` (works on Vercel and local dev with rewrites).
- **Custom backend host:** set in `.env.local`:

  ```bash
  NEXT_PUBLIC_API_BASE_URL=https://your-api.example.com
  ```

## Build

```bash
npm run build
npm start
```

## Deploy on Vercel (unified with FastAPI)

Deploy from the **repository root** (leave **Root Directory** empty / `.` in the Vercel project so repo-root `vercel.json` applies).

1. Set **`OPENAI_API_KEY`** in the Vercel project (required for chat).
2. You usually **do not** need `NEXT_PUBLIC_API_BASE_URL` — the app calls `/api/chat` on the same deployment.
3. The platform uses **`experimentalServices`** in `vercel.json`: Next.js serves `/`, Python FastAPI serves `/api/*`.

If your team uses an older Vercel setup without Services, upgrade the project or ask Vercel support — polyglot deploys need this (or an equivalent) configuration.
