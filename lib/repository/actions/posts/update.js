"use server";

import FormErrorMessage from "@/lib/formErrorMessage";
import helpers from "@/lib/helpers";
import prisma from "@/lib/prisma";
import PrismaFormError from "@/lib/prismaValidationError";
import { updatePostSchema } from "@/lib/schema/post/update";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePost(postId, formData) {
	const validated = updatePostSchema.safeParse(formData);

	if (!validated.success) {
		let errors = validated.error.format();
		errors = helpers.formatFormErrors(errors);

		const state = { success: false, showNotification: false, errors };
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

	const id = postId;
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
		// await flashMessage("Failed to update the post", "error");
		if (FormErrorMessage.errorCodeExist(error.code)) {
			return {
				success: false,
				showNotification: false,
				errors: FormErrorMessage.generateMessage(error),
			};
		} else if (PrismaFormError.errorCodeExist(error.code)) {
			return {
				success: false,
				showNotification: true,
				errors: { general: PrismaFormError.getPrismaErrorMessage(error) },
			};
		} else {
			return {
				success: false,
				showNotification: true,
				errors: { general: "Something went wrong. Please try again." },
			};
		}
	}
	redirect(`/post/${author.authorId}`);
}
