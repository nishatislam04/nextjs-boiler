"use server";

import prisma from "@/prisma/db";
import { redirect } from "next/navigation";

export async function createUser(formData) {
	const name = formData.get("name");
	const email = formData.get("email");
	const bio = formData.get("bio") || null;

	const user = await prisma.user.create({
		data: {
			name,
			email,
			profile: {
				create: {
					bio,
				},
			},
		},
	});

	console.log(user);
	redirect("/user");
}
