import { column, defineDb, defineTable } from "astro:db";

export const DbRefresh = defineTable({
  columns: {
    lastUpdate: column.date(),
  },
});

export const ArchUpdate = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    link: column.text(),
    publishDate: column.date(),
    html: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    DbRefresh,
    ArchUpdate,
  },
});
