"use server";

import prisma from "@/lib/prisma";
import helpers from "@/lib/helpers";
import { revalidatePath } from "next/cache";

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
			message: "User Delete Success",
		};
	} catch (error) {
		return {
			status: "error",
			message: "Failed to delete the user.",
		};
	}
}
