import GoBack from "@/components/ui/GoBack";
import PostEditPage from "./Form";
import { fetchPost } from "@/lib/repository/post/dal";
import { fetchActiveCategories } from "@/lib/repository/category/dal";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";

export default async function EditPostPage({ searchParams }) {
	const authUser = await checkAuthAndRoles("dashboard");
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
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
			<div className="relative">
				<div className="mt-12 mb-8 absolute -top-24 right-2">
					<GoBack />
				</div>
				<h1 className="mb-5 text-2xl font-bold">Edit Post</h1>

				<PostEditPage
					post={post}
					categories={categories}
					authorId={id}
				/>
			</div>
		</div>
	);
}
