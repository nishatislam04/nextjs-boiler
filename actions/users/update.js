"use server";

import prisma from "@/prisma/db";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateUser(userId, formData) {
	const id = userId;
	const name = formData.get("name");
	const email = formData.get("email");
	const bio = formData.get("bio");

	const user = await prisma.user.update({
		where: {
			id,
		},
		data: {
			name,
			email,
			profile: {
				update: {
					where: {
						userId: id,
					},
					data: {
						bio,
					},
				},
			},
		},
	});

	console.log(user);
	await flashMessage("user update success");
	revalidatePath("/user");
	redirect("/user");
}
