import prisma from "@/prisma/db";

export default async function PostPage({ params }) {
	const id = await params.id;
	const posts = await prisma.post.findMany({
		where: {
			authorId: parseInt(id, 10),
		},
	});

	// console.log("posts", posts);
	return <div className="">PostPage</div>;
}
