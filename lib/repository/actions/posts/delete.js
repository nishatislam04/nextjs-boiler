"use server";

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

		await invalidateUserCache("user:posts:*");
		revalidatePath(`/post/${authorId}`);
		return {
			status: "success",
			message: "Post Delete Success",
		};
	} catch (error) {
		return {
			status: "error",
			message: "Failed to delete the Post.",
		};
	}
}
