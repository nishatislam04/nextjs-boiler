"use server";

import helpers from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePost(postId) {
	const id = postId;
	try {
		const { authorId } = await prisma.post.findUnique({
			where: {
				id,
			},
			select: {
				authorId: true,
			},
		});

		await prisma.post.delete({
			where: {
				id,
			},
		});

		await helpers.invalidateUserCache("user:posts:*");
		revalidatePath(`/post/${authorId}`);
		return {
			status: "success",
			showNotification: true,
			message: "Post Delete Success",
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			showNotification: true,
			message: "Failed to delete the Post.",
		};
	}
}
