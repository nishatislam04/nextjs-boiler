import prisma from "@/lib/prisma";
import { toPostDto, toPostListingsDto } from "./dto";
import { POSTLISTINGS_PER_PAGE } from "@/lib/settings";

/**
 * post listings
 */
export async function fetchPostListings(currentPage) {
	let posts = await prisma.post.findMany({
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

	// Transform the result into DTO format
	return toPostListingsDto(posts);
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
