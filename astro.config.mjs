import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import db from "@astrojs/db";

import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  site: import.meta.env.SITE || "http://localhost:4321",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [db()],
  adapter: vercel(),
});
