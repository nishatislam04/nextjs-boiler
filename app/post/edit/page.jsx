import GoBack from "@/components/ui/GoBack";
import PostEditPage from "./Form";
import { fetchPost } from "@/lib/repository/post/dal";
import { fetchActiveCategories } from "@/lib/repository/category/dal";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";

export default async function EditPostPage({ searchParams }) {
	const authUser = await checkAuthAndRoles("/private/post/edit");
	if (React.isValidElement(authUser)) return authUser;

	const params = await searchParams;
	const id = +params.id || "";
	let categories = await fetchActiveCategories();
	categories = categories.map((category) => {
		return {
			value: String(category.id),
			label: category.name,
		};
	});

	const post = await fetchPost(id);

	return (
		<main className="relative flex flex-col items-stretch justify-center min-h-[calc(100vh-var(--nav-height))] mx-auto max-w-screen-xl">
			{/* go back */}
			<section className="absolute top-0 right-0">
				<GoBack />
			</section>
			<section className="h-full">
				<h1 className="mb-2 text-2xl font-bold">Edit Post</h1>

				<PostEditPage
					post={post}
					categories={categories}
					authorId={authUser.id}
					postId={id}
				/>
			</section>
		</main>
	);
}
