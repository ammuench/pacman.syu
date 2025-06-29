import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import db from "@astrojs/db";

import vercel from "@astrojs/vercel";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [db()],
  adapter: vercel(),
});