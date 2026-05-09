# Front end · Hall of Gentle Echoes

Next.js UI for **The AI Engineer Challenge**: a moody, “forgotten-kingdom” atmosphere (inspired loosely by melancholic indie metroidvania tone—**original** art and copy only).

## Prerequisites

- **Node.js** 18+ recommended (20+ preferred for Next.js 15)
- **npm** (or swap commands for `pnpm` / `yarn`)
- Backend running separately — see repo root README (`uv run uvicorn api.index:app --reload`)

## Run locally

From this `frontend/` directory:

```bash
npm install
cp .env.example .env.local   # optional: edit if API is not on localhost:8000
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

1. Terminal A (repo root): `export OPENAI_API_KEY=sk-...` then `uv run uvicorn api.index:app --reload`
2. Terminal B (`frontend/`): `npm run dev`

## Configure API URL

- **Local:** Default is `http://localhost:8000`. Override with `.env.local`:

  ```bash
  NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
  ```

- **Production (Vercel):** Add the same env var pointing at your deployed FastAPI URL (no trailing slash).

## Build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push the repo and import it in Vercel.
2. Set **Root Directory** to `frontend`.
3. Set `NEXT_PUBLIC_API_BASE_URL` to your API’s public origin.
4. Deploy.

> The repo-root `vercel.json` sends all routes to the Python handler. If you deploy **only** this Next app by setting Root Directory to `frontend`, Vercel uses Next’s defaults for that subdirectory—align with however you host the FastAPI backend (separate deployment is common).
