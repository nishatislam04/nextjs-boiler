"use server";

import prisma from "@/prisma/db";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePost(postId, formData) {
	const id = postId;
	const title = formData.get("title");
	const shortDescription = formData.get("shortDescription") || null;
	const description = formData.get("description") || null;
	const published = Boolean(formData.get("published"));

	const { authorId } = await prisma.post.findUnique({
		where: {
			id,
		},
		select: {
			authorId: true,
		},
	});

	const post = await prisma.post.update({
		where: {
			id,
		},
		data: {
			title,
			shortDescription,
			description,
			published,
		},
	});

	console.log(post);
	await flashMessage("post update success");
	revalidatePath("/post");
	redirect(`/post/${authorId}`);
}
