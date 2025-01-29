"use server";

import prisma from "@/lib/prisma";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import helpers from "@/lib/helpers";
import { createUserSchema } from "@/lib/schema/user/create";
import { getPrismaErrorMessage } from "@/lib/prismaValidationError";

export async function createUser(formData) {
	const validated = createUserSchema.safeParse(formData);

	if (!validated.success) {
		let errors = validated.error.format();
		errors = helpers.formatFormErrors(errors);

		const state = { success: false, errors };
		return state;
	}

	let {
		data: { username, name, email, password },
	} = validated;

	const role = "Member";
	const image = "https://xsgames.co/randomusers/avatar.php?g=male";
	const type = "credentials";
	const provider = "credentials";
	const providerAccountId = Bun.randomUUIDv7();
	const access_token = Bun.randomUUIDv7();
	password = await Bun.password.hash(password);

	try {
		await prisma.user.create({
			data: {
				username,
				password,
				name,
				email,
				image,
				role,
				account: {
					create: {
						type,
						provider,
						providerAccountId,
						access_token,
					},
				},
			},
		});
		await helpers.invalidateUserCache("users:listings:*");
		await flashMessage("user create success", "success");
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
