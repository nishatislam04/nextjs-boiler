"use server";

import prisma from "@/prisma/db";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// post slug is required

export async function createPost(authorId, formData) {
	const title = formData.get("title");
	const shortDescription = formData.get("shortDescription") || null;
	const description = formData.get("description") || null;
	const published = Boolean(formData.get("published"));
	const slug = convertToSlug(title);
	const metaTitle = title || null;
	const metaDescription = shortDescription || description || null;

	const post = await prisma.post.create({
		data: {
			title,
			shortDescription,
			description,
			published,
			slug,
			metaTitle,
			metaDescription,
			authorId,
		},
	});

	console.log(post);
	await flashMessage("post create success");
	revalidatePath("/post");
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
