import {
	toSingleUserDto,
	toUsersDto,
	userPostDto,
} from "@/lib/repository/user/dto";
import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { CACHE_TTL, PER_PAGE } from "@/lib/settings";
import helpers from "@/lib/helpers";

/**
 * fetch all users with their posts
 * @param {*} currentPage  current requested page number EX: 1|2|3
 * @param {*} itemPerPage item per page to show (fetch from settings)
 * @param {*} query search query parameter
 * @param {*} orderBy order field | accept: name, email
 * @returns
 */
export async function fetchAll(
	currentPage,
	query = "",
	queryBy = "",
	orderBy
) {
	const cacheKey = helpers.buildCacheKey("users:listings", {
		currentPage,
		query,
		orderBy,
		queryBy,
	});
	let users = await redis.get(cacheKey);

	if (users) {
		users = helpers.decompress(Buffer.from(users, "base64"));
		return users;
	}

	const whereCondition =
		queryBy && query
			? {
					[queryBy]: {
						contains: query,
						mode: "insensitive", // Case-insensitive search
					},
				}
			: {};

	users = await prisma.user.findMany({
		where: whereCondition,
		select: {
			id: true,
			name: true,
			email: true,
		},
		orderBy,
		skip: (currentPage - 1) * PER_PAGE,
		take: PER_PAGE,
	});

	await redis.set(
		cacheKey,
		Buffer.from(helpers.compressData(users)).toString("base64"),
		"EX",
		CACHE_TTL
	);
	users = toUsersDto(users);
	return users;
}

/**
 * fetch total user count
 * @returns
 */
export async function fetchTotalCount() {
	return await prisma.user.count();
}

/**
 * Get post listings for a individual user
 * @param {*} currentPage
 * @param {*} id
 * @param {*} orderBy
 * @param {*} query
 * @returns
 */
export async function fetchUserPosts(
	currentPage,
	id,
	orderBy,
	query,
	queryBy
) {
	const whereCondition =
		queryBy && query
			? {
					[queryBy]: {
						contains: query,
						mode: "insensitive",
					},
				}
			: {};
	let user = await prisma.user.findUnique({
		where: {
			id,
		},
		include: {
			posts: {
				where: whereCondition,
				orderBy,
				skip: (currentPage - 1) * PER_PAGE,
				take: PER_PAGE,
			},
		},
	});

	user = userPostDto(user);
	return user;
}

/**
 * count posts for individual user
 * @param {*} id
 * @returns
 */
export async function fetchTotalPostsUserCount(id) {
	const result = await prisma.user.findUnique({
		where: {
			id,
		},
		select: {
			_count: {
				select: {
					posts: true,
				},
			},
		},
	});

	return {
		totalPages: result?._count.posts || 0,
	};
}

export async function fetchUser(id) {
	let user = await prisma.user.findUnique({
		where: {
			id,
		},
		include: {
			profile: true,
		},
	});

	user = toSingleUserDto(user);
	return user;
}
