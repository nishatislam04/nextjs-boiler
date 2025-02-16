import GoBack from "@/components/ui/GoBack";
import { fetchPost } from "@/lib/repository/post/dal";
import ShowPostForm from "./Form";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";
import { notFound } from "next/navigation";

export default async function ShowPostPage({ searchParams }) {
	const authUser = await checkAuthAndRoles("/private/post/show");
	if (React.isValidElement(authUser)) return authUser;

	const params = await searchParams;
	const id = +params.id;

	if (!id) notFound();

	const post = await fetchPost(id);

	return (
		<main className="relative flex justify-stretch items-center min-h-[calc(100vh-var(--nav-height))] mx-auto max-w-screen-xl ">
			{/* go back */}
			<section className="absolute top-0 right-0">
				<GoBack />
			</section>
			<section className="w-full h-full">
				<h1 className="mb-2 text-2xl font-bold">Show Post</h1>

				<ShowPostForm post={post} />
			</section>
		</main>
	);
}
