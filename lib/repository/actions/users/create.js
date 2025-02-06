"use server";

import prisma from "@/lib/prisma";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import helpers from "@/lib/helpers";
import { createUserSchema } from "@/lib/schema/user/create";
import { getPrismaErrorMessage } from "@/lib/prismaValidationError";
import Logger from "@/lib/logger";
import { promises as fs } from "fs";
import path from "path";

const UPLOAD_DIR = "/app/public/uploads/profilePictures/"; // Directory inside Docker container

export async function createUser(formData) {
	const validated = createUserSchema.safeParse(formData);

	if (!validated.success) {
		let errors = validated.error.format();
		errors = helpers.formatFormErrors(errors);

		const state = { success: false, errors };
		return state;
	}

	let { username, name, email, password, image } = validated.data;

	const role = "Member";
	const type = "credentials";
	const provider = "credentials";
	const providerAccountId = Bun.randomUUIDv7();
	const access_token = Bun.randomUUIDv7();

	// Generate unique filename
	const ext = image.name.split(".").pop();
	const fileName = `${username}_profilePicture_${await Bun.randomUUIDv7()}.${ext}`;
	const filePath = path.join(UPLOAD_DIR, fileName);

	try {
		// Ensure the upload directory exists
		await fs.mkdir(UPLOAD_DIR, { recursive: true });

		// Read and write file to Docker container
		const buffer = await image.arrayBuffer();
		await fs.writeFile(filePath, Buffer.from(buffer));

		password = await Bun.password.hash(password);

		await prisma.user.create({
			data: {
				username,
				password,
				name,
				email,
				role,
				image: `/uploads/profilePictures/${fileName}`,
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
