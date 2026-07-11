# CodeCanvas — Frontend

A premium React + Vite frontend for CodeCanvas, "The Developer's Second Brain" —
inspired by the design language of Linear, Stripe, Notion, and Apple.

## Stack
- React 18 + Vite
- React Router v6
- Axios
- Fraunces + Inter typography
- Custom design system (no UI framework — hand-built for a distinctive premium look)

## Getting Started
```bash
npm install
npm run dev
```
Runs at http://localhost:5173

## Environment
Copy `.env.example` to `.env` and set your backend URL:
```
VITE_API_BASE_URL=https://codecanvas-backend-jtss.onrender.com/api
```

## Structure
```
src/
├── components/
│   ├── landing/   # Marketing site sections (Hero, FeatureGrid, AiHighlight, etc.)
│   └── app/       # Authenticated app shell (Sidebar, Topbar, Modal, etc.)
├── context/       # AuthContext (JWT session state)
├── layouts/       # AppLayout (Sidebar + Topbar wrapper)
├── pages/         # One folder per route
├── services/      # API calls (one file per backend module)
└── utils/         # Date formatting helpers
```

## Pages
- `/` — Landing page (marketing site)
- `/login`, `/signup` — Auth
- `/app` — Dashboard (stats + learning timeline)
- `/app/notes` — Notes (with AI quiz generation + PDF export)
- `/app/snippets` — Code snippets
- `/app/sql` — SQL playground
- `/app/api-collection` — Saved API requests
- `/app/search` — Cross-entity search
