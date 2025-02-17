import GoBack from "@/components/ui/GoBack";
import { checkAuthAndRoles } from "@/lib/authHelper";
import Logger from "@/lib/logger";
import { fetchActiveCategories } from "@/lib/repository/category/dal";
import React from "react";
import PostCreateForm from "./Form";

/**
 * POST CREATE PUBLIC
 *
 * @param param0 - AUTHOR ID
 */
export default async function PostCreatePage({ searchParams }) {
	const authUser = await checkAuthAndRoles("/post/create");
	if (React.isValidElement(authUser)) return authUser;

	const authorId = (await searchParams).id;
	let categories = await fetchActiveCategories();
	categories = categories.map((category) => {
		return {
			value: String(category.id),
			label: category.name,
		};
	});
	return (
		<main className="relative flex flex-col items-stretch justify-center min-h-[calc(100vh-var(--nav-height))] mx-auto max-w-screen-xl">
			{/* go back */}
			<section className="absolute top-0 right-0">
				<GoBack />
			</section>
			<section className="h-full">
				<h1 className="mb-2 text-2xl font-bold">Create Post</h1>

				<PostCreateForm
					authorId={authorId}
					categories={categories}
				/>
			</section>
		</main>
	);
}
