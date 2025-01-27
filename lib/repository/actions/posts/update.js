"use server";

import helpers from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePost(postId, formData) {
	const id = postId;
	const title = formData.get("title");
	const shortDescription = formData.get("shortDescription") || null;
	const description = formData.get("description") || null;
	const published = Boolean(formData.get("published"));
	let categories = formData.get("categories").split(",");
	let tags = formData.get("tags").split(",");
	let author = null;

	try {
		author = await prisma.post.findUnique({
			where: {
				id,
			},
			select: {
				authorId: true,
			},
		});

		if (!author.authorId) {
			throw new Error("Post not found or invalid ID");
		}

		// Ensure tags are created if they don't exist
		const tagRecords = await Promise.all(
			tags.map(async (tagName) => {
				const tag = await prisma.tag.upsert({
					where: { name: tagName },
					update: {},
					create: { name: tagName },
				});
				return tag;
			})
		);

		await prisma.post.update({
			where: {
				id,
			},
			data: {
				title,
				shortDescription,
				description,
				published,
				categories: {
					set: categories.map((categoryId) => ({
						id: parseInt(categoryId, 10),
					})),
				},
				tags: {
					set: tagRecords.map((tag) => ({ id: tag.id })),
				},
			},
		});

		await helpers.invalidateUserCache("user:posts:*");
		await flashMessage("post update success", "success");
		revalidatePath(`/post/${author.authorId}`);
	} catch (error) {
		console.log(error);
		await flashMessage("Failed to update the post", "error");
	}
	redirect(`/post/${author.authorId}`);
}
