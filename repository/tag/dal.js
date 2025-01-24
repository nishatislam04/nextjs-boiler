import { CACHE_TTL } from "@/config/settings";
import prisma from "@/lib/db";
import redis from "@/lib/redis";

export async function fetchAllTags() {}

export async function fetchActiveTags() {
  const cacheKey = `tags:fetchAll:active`;
  let tags = await redis.get(cacheKey);

  if (!tags) {
    tags = await prisma.tag.findMany({
      where: {
        status: true,
      },
      select: {
        id: true,
        name: true,
      },
    });
    await redis.set(cacheKey, JSON.stringify(tags), "EX", CACHE_TTL);
  } else {
    tags = JSON.parse(tags);
    return tags;
  }

  return tags;
}
