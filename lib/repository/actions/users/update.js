"use server";

import prisma from "@/lib/prisma";
import helpers from "@/lib/helpers";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { updateUserSchema } from "@/lib/schema/user/update";
import FormErrorMessage from "@/lib/formErrorMessage";
import PrismaFormError from "@/lib/prismaValidationError";

export async function updateUser(userId, formData) {
	const validated = updateUserSchema.safeParse(formData);

	if (!validated.success) {
		let errors = validated.error.format();
		errors = helpers.formatFormErrors(errors);

		const state = { success: false, showNotification: false, errors };
		return state;
	}

	let { username, name, email, bio, website, location } = validated.data;

	const id = userId;

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
		if (FormErrorMessage.errorCodeExist(error.code)) {
			return {
				success: false,
				showNotification: false,
				errors: FormErrorMessage.generateMessage(error),
			};
		} else if (PrismaFormError.errorCodeExist(error.code)) {
			return {
				success: false,
				showNotification: true,
				errors: { general: PrismaFormError.getPrismaErrorMessage(error) },
			};
		} else {
			return {
				success: false,
				showNotification: true,
				errors: { general: "Something went wrong. Please try again." },
			};
		}
	}
}
