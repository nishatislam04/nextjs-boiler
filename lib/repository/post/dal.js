import prisma from "@/lib/prisma";
import { toPostDto } from "./dto";

export async function fetchPost(id) {
	let post = await prisma.post.findUnique({
		where: { id },
		include: {
			categories: true,
			tags: true,
			author: true,
		},
	});

	post = toPostDto(post);
	return post;
}
