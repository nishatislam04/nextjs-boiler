"use server";

import prisma from "@/lib/prisma";
import helpers from "@/lib/helpers";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { updateUserSchema } from "@/lib/schema/user/update";
import { getPrismaErrorMessage } from "@/lib/prismaValidationError";

export async function updateUser(userId, formData) {
	const validated = updateUserSchema.safeParse(formData);

	if (!validated.success) {
		let errors = validated.error.format();
		errors = helpers.formatFormErrors(errors);

		const state = { success: false, errors };
		return state;
	}

	let {
		data: { username, name, email, bio, website, location },
	} = validated;

	const id = userId;
	// const name = formData.get("name");
	// const email = formData.get("email");
	// const username = formData.get("username");
	// const bio = formData.get("bio");
	// const website = formData.get("webiste");
	// const location = formData.get("location");

	try {
		await prisma.user.update({
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
		return { success: true };
	} catch (error) {
		console.log(error);
		if (error.code) {
			return {
				success: false,
				errors: { general: getPrismaErrorMessage(error) },
			};
		} else {
			return {
				success: false,
				errors: { general: "Something went wrong. Please try again." },
			};
		}
	}
}
