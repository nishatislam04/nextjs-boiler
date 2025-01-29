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
	password: z
		.string()
		.min(1, "password is required")
		.refine((val) => val.length >= 3 || val.length === 0, {
			message: "password can not be less than 3 character",
		})
		.refine((val) => val.length <= 30, {
			message: "password can not be grater than 30 character",
		}),
});
