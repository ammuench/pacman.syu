import { ArchUpdate, db, DbRefresh } from "astro:db";
import Parser from "rss-parser";
import type { ArchRSSUpdate } from "../src/types/ArchRSSUpdate.type";
import { v4 as uuidv4 } from "uuid";

export default async function seed() {
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
