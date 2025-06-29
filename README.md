# pacman -Syu

A minimal Astro site that fetches and displays the latest Arch Linux news item from the official RSS feed.  
Keeps a local SQLite cache (via @astrojs/db) and auto-refreshes every 15 minutes.

## Getting started

1. Clone the repo
   ```bash
   git clone <your-repo-url>
   cd pacman.syu
   ```
2. Install dependencies
   ```bash
   pnpm install
   ```
3. Start dev server
   ```bash
   pnpm dev
   ```
4. Open `http://localhost:4321` in your browser

## Build & Deploy

```bash
pnpm build
pnpm preview
```

## Local Dev

By default this will use the `db/seed.ts` file to seed a local sqlite database according to the [Astro DB](https://docs.astro.build/en/guides/astro-db/) docs

## Remote Dev

To do remote dev, create a `.env` file with the following:

```bash
ASTRO_DB_REMOTE_URL=libsql://some-url.to-turso.io
ASTRO_DB_APP_TOKEN=super.secret.token.asasdufiy1nkj2124y12512.seeeeecret
```

This project is configured with [Turso](https://turso.tech), but any libsql compliant db should be usable here
