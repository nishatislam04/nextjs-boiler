"use server";

import prisma from "@/lib/prisma";
import helpers from "@/lib/helpers";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { updateUserSchema } from "@/lib/schema/user/update";
import FormErrorMessage from "@/lib/formErrorMessage";
import PrismaFormError from "@/lib/prismaValidationError";
import { promises as fs } from "fs";
import path from "path";

const UPLOAD_DIR = "/app/public/uploads/profilePictures/"; // Directory inside Docker container

export async function updateUser(userId, formData) {
	const validated = updateUserSchema.safeParse(formData);

	if (!validated.success) {
		let errors = validated.error.format();
		errors = helpers.formatFormErrors(errors);

		const state = { success: false, showNotification: false, errors };
		return state;
	}

	let { username, name, email, bio, website, location, image } =
		validated.data;

	const id = userId;
	let imagePath = null;

	try {
		// ✅ Handle image upload only if provided
		if (image) {
			const ext = image.name.split(".").pop();
			const fileName = `${username}_profilePicture_${await Bun.randomUUIDv7()}.${ext}`;
			const filePath = path.join(UPLOAD_DIR, fileName);

			// Ensure the upload directory exists
			await fs.mkdir(UPLOAD_DIR, { recursive: true });

			// Read and write file to Docker container
			const buffer = await image.arrayBuffer();
			await fs.writeFile(filePath, Buffer.from(buffer));

			imagePath = `/uploads/profilePictures/${fileName}`;
		}

		await prisma.user.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				username,
				image: imagePath,
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
