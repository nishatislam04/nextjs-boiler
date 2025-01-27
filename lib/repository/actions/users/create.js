"use server";

import prisma from "@/lib/prisma";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import helpers from "@/lib/helpers";
export async function createUser(formData) {
	const username = formData.get("username");
	let password = formData.get("password") || null;
	const name = formData.get("name");
	const email = formData.get("email");
	const bio = formData.get("bio") || null;
	const website = formData.get("website") || null;
	const location = formData.get("location") || null;
	const image = "https://xsgames.co/randomusers/avatar.php?g=male";
	const type = "credentials";
	const provider = "credentials";
	const providerAccountId = Bun.randomUUIDv7();
	const access_token = Bun.randomUUIDv7();

	// if (password) password = bcrypt.hashSync(password, 10);
	password = await Bun.password.hash(password);
	try {
		const user = await prisma.user.create({
			data: {
				username,
				password,
				name,
				email,
				image,
				profile: {
					create: {
						bio,
						website,
						location,
					},
				},
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
	} catch (error) {
		await flashMessage(
			"Failed to create the user. Please try again.",
			"error"
		);
	}
	redirect("/user");
}
