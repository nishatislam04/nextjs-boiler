"use server";

import prisma from "@/lib/prisma";
import helpers from "@/lib/helpers";
import { revalidatePath } from "next/cache";
// import { flashMessage } from "@thewebartisan7/next-flash-message";

// this is handled by modal. so flash message is not integrated
export async function deleteUser(userId) {
	const id = userId;

	try {
		await prisma.user.delete({
			where: {
				id,
			},
		});

		await helpers.invalidateUserCache("users:listings:*");
		revalidatePath("/user");
		return {
			status: "success",
			showNotification: true,
			message: "user delete success.",
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			showNotification: true,
			errors: { general: "user delete fail" },
		};
	}
}
