# ⚽ Mi Álbum FIFA — World Cup 2026

> **Find your sticker page in seconds. Track your collection. Never lose a swap again.**

Live at → **[mialbumfifa.com](https://mialbumfifa.com)**

---

## ✨ What is this?

A fast, mobile-first web app for collectors of the **FIFA World Cup 2026 Panini sticker album**. Look up any country's page number by code, name or page, track which stickers you already have, and share the tool with your swapping friends.

---

## 🚀 Features

### 🔍 Smart Search

- Search by **country code** (e.g. `GER`), **country name** (e.g. `Germany`) or **page number**
- Real-time filtering with instant results
- Clicking a card sets it as the **active country** — even when multiple results match the same substring (e.g. `AUS` → Australia, not Austria)

### 🗂️ Mi Álbum Digital _(requires login)_

- Log in with **Google** (one click, no password)
- Select any country → see its **20 sticker slots**
- Click a sticker to toggle it as **collected / missing**
- Progress counter per country (`X / 20`)
- Data synced to the cloud — access from **any device**

### 🌍 Country Cards

- **48 countries** across 12 groups (A–L)
- Country **flag**, **code**, **name**, **group badge** and **album page number**
- Visual group color coding

### 💡 Curiosities

- After selecting a country, scroll down to see a **Curiosity Carousel** with fun facts about that nation

### 📤 Share

- Share the app via **WhatsApp**, **Facebook**, **X (Twitter)**, **LinkedIn** or **copy link**

### 📱 Mobile-first UX

- Fully responsive layout
- Avatar dropdown menu for logged-in users (no crowded top bar)
- Scroll-to-top button
- Promo banners with dismiss (saved in `localStorage` — won't show again)
- Post-login welcome modal with onboarding instructions

---

## 🛠️ Tech Stack

| Layer         | Tech                                                                   |
| ------------- | ---------------------------------------------------------------------- |
| Frontend      | React 18 + Vite 5                                                      |
| Styling       | Vanilla CSS (custom design system, CSS variables, keyframe animations) |
| Auth          | Supabase Auth — Google OAuth 2.0                                       |
| Database      | Supabase (PostgreSQL) with Row-Level Security                          |
| Backend logic | Supabase Edge Functions (Deno / TypeScript)                            |
| Flags         | [`flag-icons`](https://github.com/lipis/flag-icons) by @lipis          |
| Hosting       | Vercel (production + staging preview deployments)                      |

---

## 🗄️ Database Schema

```sql
-- User profiles (upserted on every login via edge function)
profiles (id, email, display_name, last_login)

-- Sticker collection (RLS: each user can only read/write their own rows)
sticker_collection (user_id, country_code, sticker_number, collected, updated_at)
```

Row-Level Security is enabled on both tables. The `upsert-user` Edge Function runs with the service role key to write profiles securely.

---

## ⚙️ Local Development

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with Google OAuth enabled

### Setup

```bash
git clone https://github.com/robertoandres24/worldcup-album-index.git
cd worldcup-album-index
npm install
```

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

```bash
npm run dev
```

App runs at `http://localhost:5173` (or next available port).

### Deploy Edge Function

```bash
supabase link --project-ref your-project-ref
supabase functions deploy upsert-user
```

---

## 🚢 Deployment

The app is deployed on **Vercel**, connected to this GitHub repository. Every push triggers an automatic deployment:

- `master` → [mialbumfifa.com](https://mialbumfifa.com) (production)
- `staging` → Vercel preview URL (staging / QA)

No manual deploy steps needed — merge to `master` and Vercel takes care of the rest.

Build command: `npm run build` — output: `dist/`

---

## 🔒 Security Notes

- `VITE_SUPABASE_ANON_KEY` is intentionally public — it gives access only to data protected by RLS policies
- `SUPABASE_SERVICE_ROLE_KEY` lives exclusively in the Edge Function environment, never exposed to the client
- All sticker writes are validated server-side via JWT — users can only modify their own rows

---

Developed with ❤️ by [Studio84](https://ko-fi.com/studio84)
