import { z } from "zod";

/**
 *
 * refine: if condition are false, then eror message shown.
 * username: nishat (6)
 * (val.length >= 3) => (6 >= 3) which is true, then we wont execute the second argument
 * username: no (2)
 * (val.length >= 3) => (2 >= 3) which is false, then we will execute the second argument
 *
 */
export const createUserSchema = z.object({
	username: z
		.string()
		.min(3, "username must be at least 3 characters long")
		.max(20, "username cannot be greater than 20 characters"),
	name: z
		.string()
		.min(3, "name must be at least 3 characters long")
		.max(30, "name cannot be greater than 30 characters"),
	email: z.string().email("Invalid email format"),
	password: z
		.string()
		.min(3, "password cannot be less than 3 characters")
		.max(30, "password cannot be greater than 30 characters"),
	image: z
		.any()
		.refine((file) => file.size <= 3 * 1024 * 1024, {
			message: "File must be less than 3MB",
		})
		.refine(
			(file) =>
				["image/jpeg", "image/png", "image/jpg"].includes(file.type),
			{ message: "Only JPEG and PNG images are allowed" }
		),
});
