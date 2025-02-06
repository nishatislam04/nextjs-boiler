"use server";

import { signIn } from "@/app/auth";
import helpers from "../helpers";
import Logger from "../logger";
import { signInSchema } from "../schema/auth/signIn";
import prisma from "../prisma";

export async function signInAction(formData) {
	const validated = signInSchema.safeParse(formData);

	if (!validated.success) {
		let errors = validated.error.format();
		errors = helpers.formatFormErrors(errors);

		const state = { success: false, errors };
		return state;
	}

	const { login_email_username, password } = validated.data;

	try {
		// Check if the user exists in the database
		const user = await prisma.user.findFirst({
			where: {
				OR: [
					{ email: login_email_username },
					{ username: login_email_username },
				],
			},
		});

		if (!user)
			return {
				success: false,
				errors: {
					login_email_username: "Invalid email/username or password.",
				},
			};

		// Verify the password
		const isValidPassword = await Bun.password.verify(
			password,
			user.password
		);

		if (!isValidPassword)
			return {
				success: false,
				errors: {
					login_email_username: "Invalid email/username or password.",
				},
			};

		// Use Auth.js signIn function for credentials-based authentication
		const result = await signIn("credentials", {
			email: login_email_username,
			username: login_email_username,
			password,
			redirect: false,
		});

		if (result?.error) {
			return { success: false };
		}

		return { success: true };
	} catch (error) {
		Logger.error(error, "Sign-in error");
		return {
			success: false,
			errors: { general: "Something went wrong, please try again." },
		};
	}
}
