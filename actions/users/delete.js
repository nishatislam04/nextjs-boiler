"use server";

import prisma from "@/prisma/db";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteUser(userId, formData) {
	const id = +userId;

	const deletePosts = prisma.post.deleteMany({
		where: {
			authorId: id,
		},
	});

	const deleteProfile = prisma.profile.delete({
		where: {
			userId: id,
		},
	});

	const deleteUser = prisma.user.delete({
		where: {
			id,
		},
	});

	await prisma.$transaction([deletePosts, deleteProfile, deleteUser]);
	await flashMessage("user delete success");
	revalidatePath("/user");
	redirect("/user");
}
