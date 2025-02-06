import { z } from "zod";

export const signUpSchema = z.object({
	username: z.string().min(4, "Username must be at least 4 characters"),
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});
