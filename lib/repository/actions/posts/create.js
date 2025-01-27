"use server";

import helpers from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(authorId, formData) {
	const title = formData.get("title");
	const shortDescription = formData.get("shortDescription") || null;
	const description = formData.get("description") || null;
	const published = Boolean(parseInt(formData.get("published")));
	const slug = convertToSlug(title);
	let categories = formData.get("categories").split(",");
	let tags = formData.get("tags").split(",");

	categories = categories.map((category) => {
		return { id: parseInt(category) };
	});

	try {
		const post = await prisma.post.create({
			data: {
				title,
				shortDescription,
				description,
				published,
				slug,
				authorId,
				categories: {
					connect: categories,
				},
				tags: {
					connectOrCreate: tags.map((tag) => ({
						where: { name: tag },
						create: { name: tag },
					})),
				},
			},
		});
		await helpers.invalidateUserCache("user:posts:*");
		await flashMessage("post create success", "success");
		revalidatePath(`/post${authorId}`);
	} catch (error) {
		await flashMessage("Failed to create the post", "error");
	}
	redirect(`/post/${authorId}`);
}

function convertToSlug(title) {
	if (!title || typeof title !== "string") {
		throw new Error("Input must be a non-empty string");
	}

	return title
		.toLowerCase() // Convert to lowercase
		.trim() // Remove leading and trailing spaces
		.replace(/[\s_]+/g, "-") // Replace spaces or underscores with a single dash
		.replace(/[^\w\-]+/g, "") // Remove all non-word characters except dashes
		.replace(/--+/g, "-") // Replace multiple dashes with a single dash
		.replace(/^-+|-+$/g, ""); // Remove leading or trailing dashes
}
