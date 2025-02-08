import helpers from "@/lib/helpers";
import { title } from "node:process";

/**
 * accept a single post from `toPostsDto()`
 * @param {*} post
 * @returns
 */
export function toPostDto(post) {
	const categories = post.categories.map((category) => {
		return {
			value: String(category.id),
			label: category.name,
		};
	});
	const tags = post.tags.map((tag) => {
		return { value: String(tag.id), label: tag.name };
	});
	return {
		id: post.id,
		title: post.title,
		description: post.description,
		shortDescription: post.shortDescription,
		coverPhoto: post.coverPhoto,
		published: post.published,
		createdAt: `${helpers.formatDate(post.createdAt)} (${helpers.formatHumanReadableDate(post.createdAt)})`,
		tags,
		categories,
		author: {
			name: post.author.name,
		},
	};
}
/**
 *  accept multple posts
 * @param {*} posts
 * @returns
 */
export function toPostsDto(posts) {
	return posts.map((post) => toPostDto(post));
}

/**
 * post listings dto
 */
export function toPostListingsDto(posts) {
	return posts.map((post) => ({
		id: post.id,
		title: post.title,
		shortDescription: post.shortDescription,
		createdAt: helpers.formatHumanReadableDate(post.createdAt),
		authorName: post.author.name,
		coverPhoto: post?.coverPhoto,
	}));
}
