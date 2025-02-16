import prisma from "@/lib/prisma";
import { toPostDto, toPostListingsDto } from "./dto";
import { CACHE_TTL_SHORT, POSTLISTINGS_PER_PAGE } from "@/lib/settings";
import helpers from "@/lib/helpers";
import redis from "@/lib/redis";
import Logger from "@/lib/logger";

/**
 * post listings
 */
export async function fetchPostListings(currentPage) {
	const cacheKey = helpers.buildCacheKey("post:listings", {
		currentPage,
	});

	let posts = await redis.get(cacheKey);

	if (posts) {
		posts = helpers.decompress(Buffer.from(posts, "base64"));
		return posts;
	}

	posts = await prisma.post.findMany({
		select: {
			id: true,
			title: true,
			shortDescription: true,
			createdAt: true,
			coverPhoto: true,
			author: {
				select: {
					name: true,
				},
			},
		},
		skip: (currentPage - 1) * POSTLISTINGS_PER_PAGE,
		take: POSTLISTINGS_PER_PAGE,
	});
	posts = toPostListingsDto(posts);

	await redis.set(
		cacheKey,
		Buffer.from(helpers.compressData(posts)).toString("base64"),
		"EX",
		CACHE_TTL_SHORT
	);
	return posts;
}

/**
 * post listings for a user
 * @param {*} id
 * @returns
 */
export async function fetchPost(id) {
	let post = await prisma.post.findUnique({
		where: { id },
		include: {
			categories: true,
			tags: true,
			author: true,
		},
	});

	post = toPostDto(post);
	return post;
}

export async function fetchTotalCount() {
	return await prisma.post.count();
}
