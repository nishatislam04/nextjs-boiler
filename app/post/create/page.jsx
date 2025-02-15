import PostCreateForm from "@/app/dashboard/post/create/Form";
import GoBack from "@/components/ui/GoBack";
import { checkAuthAndRoles } from "@/lib/authHelper";
import { fetchActiveCategories } from "@/lib/repository/category/dal";
import React from "react";

export default async function PostCreatePage({ searchParams }) {
	const authUser = await checkAuthAndRoles("/post/create");
	if (React.isValidElement(authUser)) return authUser;

	const authorId = (await searchParams).authorId;
	let categories = await fetchActiveCategories();
	categories = categories.map((category) => {
		return {
			value: String(category.id),
			label: category.name,
		};
	});
	// categories = categories.map((category) => category.name);

	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
			<div className="relative">
				<div className="mt-12 mb-8 absolute -top-24 right-2">
					<GoBack />
				</div>
				<h1 className="mb-5 text-2xl font-bold">Create Post</h1>

				<PostCreateForm
					authorId={authorId}
					categories={categories}
				/>
			</div>
		</div>
	);
}
