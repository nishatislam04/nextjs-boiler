"use server";

import prisma from "@/lib/prisma";
import helpers from "@/lib/helpers";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateUser(userId, formData) {
	const id = userId;
	const name = formData.get("name");
	const email = formData.get("email");
	const bio = formData.get("bio");
	const username = formData.get("username");
	const website = formData.get("webiste");
	const location = formData.get("location");
	try {
		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				username,
				profile: {
					update: {
						where: {
							userId: id,
						},
						data: {
							bio,
							website,
							location,
						},
					},
				},
			},
		});

		await helpers.invalidateUserCache("users:listings:*");
		await flashMessage("user update success", "success");
		revalidatePath("/user");
	} catch (error) {
		await flashMessage("user update fail", "fail");
	}
	redirect("/user");
}
