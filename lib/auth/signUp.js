"use server";

import { signIn } from "@/app/auth";
import helpers from "../helpers";
import Logger from "../logger";
import prisma from "../prisma";
import { signUpSchema } from "../schema/auth/SignUp";

export async function signUp(formData) {
	const validated = signUpSchema.safeParse(formData);
	Logger.info(Object.entries(formData), "user upload form");
	Logger.info(validated, "validated signup data");

	if (!validated.success) {
		let errors = validated.error.format();
		errors = helpers.formatFormErrors(errors);

		const state = { success: false, errors };
		return state;
	}

	const { username, email, password } = validated.data;

	try {
		// Check if the user exists in the database
		const userExist = await prisma.user.findFirst({
			where: {
				OR: [{ email }, { username }],
			},
		});

		if (userExist)
			return {
				success: false,
				errors: {
					username: "Email or Username already in use.",
				},
			};

		// create the user
		const user = await prisma.user.create({
			data: {
				name: username,
				username,
				email,
				password: await Bun.password.hash(password),
				role: "Member",
				image: "https://xsgames.co/randomusers/avatar.php?g=male",
			},
		});

		// now signin
		const result = await signIn("credentials", {
			email: user.email,
			username: user.username,
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
