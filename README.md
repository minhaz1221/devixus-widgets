# Devixus Widgets

A SaaS widget platform — embed beautiful, customizable widgets on any website.

## Structure

```
devixus-widgets/
├── apps/
│   ├── web/           ← Dashboard + API (Next.js 14, port 3000)
│   └── marketing/     ← Landing page (Next.js 14, port 3001)
├── packages/
│   ├── widgets/       ← Widget React components
│   └── ui/            ← Shared UI (Button, Card, Input)
├── MILESTONES.md
└── package.json       ← npm workspaces root
```

## Getting Started

```bash
# Install all dependencies
npm install

# Run both apps in dev mode
npm run dev

# Run individual apps
npm run dev:web        # Dashboard on http://localhost:3000
npm run dev:marketing  # Marketing on http://localhost:3001
```

## Apps

| App | URL | Description |
|-----|-----|-------------|
| `apps/web` | http://localhost:3000 | User dashboard + widget management API |
| `apps/marketing` | http://localhost:3001 | Public landing page |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Monorepo**: npm workspaces

## Environment Variables

Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in your values.
