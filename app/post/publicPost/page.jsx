import Logger from "@/lib/logger";
import {
	fetchPostListings,
	fetchTotalCount,
} from "@/lib/repository/post/dal";
import { CURRENT_PAGE, POSTLISTINGS_PER_PAGE } from "@/lib/settings";
import {
	AspectRatio,
	Card,
	Container,
	SimpleGrid,
	Text,
	Image,
} from "@mantine/core";
// import Image from "next/image";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";

export default async function PublicPostPage({ searchParams }) {
	const params = await searchParams;
	// const searchQuery = params?.query || "";
	// const queryBy = params?.queryBy || "";
	const currentPage = params?.page || CURRENT_PAGE;
	const posts = await fetchPostListings(currentPage);
	let totalPostCount = await fetchTotalCount();
	const totalPages = Math.ceil(totalPostCount / POSTLISTINGS_PER_PAGE);

	const cards = posts.map((post) => (
		<Card
			key={post.id}
			p="md"
			radius="md"
			component={Link}
			href={`/post/singlePost?postId=${post.id}`}
			className="transition-transform duration-150 ease-in-out transform hover:scale-[1.01] hover:shadow-md mb-5 bg-white border border-gray-200 rounded-lg">
			{/* Cover Photo */}
			<AspectRatio
				ratio={1920 / 1080}
				className="rounded-lg overflow-hidden">
				<Image
					alt="Cover Photo"
					height={300}
					width={400}
					className="w-full h-full object-cover"
					src={
						post.coverPhoto ||
						"https://placehold.co/600x400?text=No+Cover+Photo+Found"
					}
					// src={
					// 	post.coverPhoto ||
					// 	`https://picsum.photos/400/300?random=${post.id}`
					// }
				/>
			</AspectRatio>

			{/* Date */}
			<Text className="!text-xs !uppercase !font-semibold !text-gray-600 !tracking-wider !mt-4">
				{post.createdAt}
			</Text>

			{/* Title */}
			<Text className="!text-lg !font-bold !leading-6 !text-gray-900 !mt-2">
				{post.title}
			</Text>

			{/* Short Description */}
			<Text className="!text-sm !leading-6 !text-gray-700 !mt-3">
				{post.shortDescription}
			</Text>
		</Card>
	));

	return (
		<div className="max-w-screen-xl flex flex-col flex-wrap items-center justify-between mx-auto p-4">
			<div className="text-xl uppercase underline underline-offset-4">
				post listings action
			</div>
			<Container
				py="xl"
				fluid>
				<SimpleGrid
					className=""
					spacing="xs"
					cols={{ base: 1, sm: 2, lg: 3 }}>
					{cards}
				</SimpleGrid>
			</Container>

			<div className="py-8">
				<Pagination
					uri="post"
					totalPages={totalPages}
					currentPage={currentPage}
				/>
			</div>
		</div>
	);
}
