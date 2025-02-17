import { CACHE_TTL } from "@/lib/settings";
import prisma from "@/lib/prisma";
import redis from "@/lib/redis";

export async function fetchAllCategories() {}

export async function fetchActiveCategories() {
	const cacheKey = `categories:all:active`;
	let categories = await redis.get(cacheKey);

	if (!categories) {
		categories = await prisma.category.findMany({
			where: {
				status: true,
			},
			select: {
				id: true,
				name: true,
			},
		});
		await redis.set(cacheKey, JSON.stringify(categories), "EX", CACHE_TTL);
	} else {
		categories = JSON.parse(categories);
		return categories;
	}

	return categories;
}
