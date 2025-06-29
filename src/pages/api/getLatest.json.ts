import type { APIRoute } from "astro";
import { db, DbRefresh, ArchUpdate, desc } from "astro:db";
import Parser from "rss-parser";
import { v4 as uuidv4 } from "uuid";
import type { ArchRSSUpdate } from "../../types/ArchRSSUpdate.type";

async function updateRss() {
  const parser = new Parser();
  const feed = await parser.parseURL("https://archlinux.org/feeds/news/");

  const dbRecords = (feed.items as ArchRSSUpdate[]).map((item) => {
    const record = {
      id: uuidv4(),
      title: item.title,
      link: item.link,
      publishDate: new Date(item.pubDate),
      html: item.content,
    };
    return record;
  });

  try {
    await db.insert(ArchUpdate).values(dbRecords);
  } catch (e) {
    console.error(e);
  }

  const now = new Date();

  try {
    await db.insert(DbRefresh).values([{ lastUpdate: now }]);
  } catch (e) {
    console.error(e);
  }
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
