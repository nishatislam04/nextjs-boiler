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

export const updateUserSchema = z.object({
	username: z
		.string()
		.min(1, "username is required")
		.refine((val) => val.length >= 3 || val.length === 0, {
			message: "username must be at least 3 character long",
		})
		.refine((val) => val.length <= 20, {
			message: "username can not be grater than 20 character",
		}),
	name: z
		.string()
		.min("1", "name is required")
		.refine((val) => val.length >= 3 || val.length === 0, {
			message: "name must be at least 3 charcter long",
		})
		.refine((val) => val.length <= 30, {
			message: "name can not be grater than 30 character",
		}),
	email: z.string().email("Invalid email format"),
	bio: z.string().optional(),
	website: z.optional(z.string().url({ message: "Invalid url" })),
	location: z.string().optional({ message: "invalid format" }),
	image: z
		.any()
		.optional() // ✅ Makes the image field optional
		.refine(
			(file) => !file || file.size <= 3 * 1024 * 1024, // ✅ Only validate if file exists
			{ message: "File must be less than 3MB" }
		)
		.refine(
			(file) =>
				!file ||
				["image/jpeg", "image/png", "image/jpg"].includes(file.type), // ✅ Only validate if file exists
			{ message: "Only JPEG and PNG images are allowed" }
		),
});
