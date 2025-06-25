import type { APIRoute } from "astro";
import { db, DbRefresh, ArchUpdate, desc } from "astro:db";

async function updateRss() {
  console.log("updateRss stub");
}

export const GET: APIRoute = async () => {
  const refresh = await db
    .select({ lastUpdate: DbRefresh.lastUpdate })
    .from(DbRefresh)
    .all();
  const lastUpdate = refresh[0]?.lastUpdate;
  const now = new Date();
  if (!lastUpdate || now.getTime() - lastUpdate.getTime() > 15 * 60 * 1000) {
    await updateRss();
    // TODO: refetch or update lastUpdate timestamp and return updated items
  }
  const updates = await db
    .select()
    .from(ArchUpdate)
    .orderBy(desc(ArchUpdate.publishDate))
    .limit(1)
    .all();
  const latest = updates[0];
  return new Response(JSON.stringify(latest), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
