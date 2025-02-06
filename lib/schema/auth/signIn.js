import { z } from "zod";

export const signInSchema = z.object({
	login_email_username: z
		.string()
		.min(4, "Email or Username must be at least 4 characters")
		.refine((val) => val.includes("@") || val.length >= 4, {
			message: "Invalid Email or Username",
		}),
	password: z.string().min(6, "Password must be at least 6 characters"),
});
