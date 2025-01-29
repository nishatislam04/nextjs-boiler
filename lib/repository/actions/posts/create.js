"use server";

import helpers from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { getPrismaErrorMessage } from "@/lib/prismaValidationError";
import { createPostSchema } from "@/lib/schema/post/create";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";

export async function createPost(authorId, formData) {
	const validated = createPostSchema.safeParse(formData);

	if (!validated.success) {
		let errors = validated.error.format();
		errors = helpers.formatFormErrors(errors);

		const state = { success: false, errors };
		return state;
	}

	let {
		data: {
			title,
			shortDescription,
			description,
			tags,
			published,
			categories,
		},
	} = validated;

	published = Boolean(parseInt(published, 10));
	shortDescription = shortDescription || title;
	const slug = convertToSlug(title);
	categories = categories.map((category) => {
		return { id: parseInt(category) };
	});

	try {
		await prisma.post.create({
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
		return { success: true };
	} catch (error) {
		console.log(error);
		if (error.code) {
			return {
				success: false,
				errors: { general: getPrismaErrorMessage(error) },
			};
		} else {
			return {
				success: false,
				errors: { general: "Something went wrong. Please try again." },
			};
		}
	}
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
