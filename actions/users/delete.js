"use server";

import prisma from "@/prisma/db";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteUser(userId, formData) {
	const id = userId;

	await prisma.user.delete({
		where: {
			id,
		},
	});

	await flashMessage("user delete success");
	revalidatePath("/user");
	redirect("/user");
}
