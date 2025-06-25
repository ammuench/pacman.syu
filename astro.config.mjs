import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import db from "@astrojs/db";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [db()],
});
