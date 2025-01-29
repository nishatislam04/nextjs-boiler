import { z } from "zod";

export const updatePostSchema = z
	.object({
		title: z
			.string()
			.min(1, "title is required")
			.refine((val) => val.length >= 10 || val.length === 0, {
				message: "title must be at least 10 characters long",
			})
			.refine((val) => val.length <= 150, {
				message: "title can not be grater than 150 characters",
			}),
		shortDescription: z.string().optional(),
		description: z.string().optional().nullable(),
		tags: z.array(z.string()).optional(),
		published: z.enum(["0", "1"], {
			required_error: "Publish status is required",
		}),
		categories: z.array(z.string()).optional(),
	})
	.superRefine((data, ctx) => {
		// Validate shortDescription only if it is provided
		if (data.shortDescription && data.shortDescription.length < 10) {
			ctx.addIssue({
				code: z.ZodIssueCode.too_small,
				type: "string",
				minimum: 10,
				message: "short description cannot be less than 10 characters",
				path: ["shortDescription"],
			});
		}
		if (data.shortDescription && data.shortDescription.length > 300) {
			ctx.addIssue({
				code: z.ZodIssueCode.too_big,
				type: "string",
				maximum: 300,
				message: "short description cannot be greater than 300 characters",
				path: ["shortDescription"],
			});
		}

		// Validate description only if it is provided
		if (data.description && data.description.length < 10) {
			ctx.addIssue({
				code: z.ZodIssueCode.too_small,
				type: "string",
				minimum: 10,
				message: "description cannot be less than 10 characters",
				path: ["description"],
			});
		}
	});
