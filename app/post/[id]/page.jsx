import GoBack from "@/components/ui/GoBack";
import Logger from "@/lib/logger";
import { fetchPost } from "@/lib/repository/post/dal";
import {
	AspectRatio,
	Badge,
	Card,
	Container,
	Group,
	Image,
	Text,
} from "@mantine/core";
import NextImage from "next/image";

export default async function SinglePostPage({ searchParams }) {
	const params = await searchParams;
	const post = await fetchPost(+params.postId);
	return (
		<Container
			size="lg"
			className="relative mx-auto mt-12">
			{/* Go Back Button */}
			<div className="mt-12 mb-8 absolute -top-24 right-2">
				<GoBack />
			</div>

			{/* Cover Photo */}
			<AspectRatio
				ratio={16 / 9}
				className="rounded-lg overflow-hidden mb-6">
				<Image
					height={300}
					width={600}
					className="w-full h-full object-cover"
					alt={`${post.title} cover photo`}
					src={
						post.coverPhoto ||
						"https://placehold.co/600x400?text=No+Cover+Photo+Found"
					}
				/>
			</AspectRatio>

			{/* Post Meta */}
			<Group
				position="apart"
				className="mb-6">
				<div>
					<Text
						size="sm"
						color="dimmed">
						Posted on {new Date(post.createdAt).toLocaleDateString()}
					</Text>
					<Text
						size="sm"
						color="dimmed">
						Author: {post.author.name}
					</Text>
				</div>
			</Group>

			{/* Post Title */}
			<h1 className="text-3xl font-bold mb-4">{post.title}</h1>

			{/* Post Description */}
			<Text
				className="leading-4"
				size="sm">
				{post.description}
			</Text>

			{/* Tags & Categories */}
			<div className="my-6">
				<Text
					size="sm"
					className="font-semibold">
					Tags:
				</Text>
				<Group
					spacing={10}
					className="mt-2">
					{post.tags.map((tag) => (
						<Badge
							key={tag.value}
							variant="outline"
							color="blue">
							{tag.label}
						</Badge>
					))}
				</Group>
			</div>

			<div className="mb-6">
				<Text
					size="sm"
					className="font-semibold">
					Categories:
				</Text>
				<Group
					spacing={10}
					className="mt-2">
					{post.categories.map((category) => (
						<Badge
							key={category.value}
							variant="outline"
							color="green">
							{category.label}
						</Badge>
					))}
				</Group>
			</div>

			{/* Related Posts Section */}
			<Card
				shadow="sm"
				radius="md"
				className="mt-12">
				<Text
					size="lg"
					weight={500}
					className="mb-4">
					Related Posts
				</Text>
				{/* Here you can dynamically load related posts */}
				<div>
					{/* Map through related posts */}
					<Text color="dimmed">Related posts will go here.</Text>
				</div>
			</Card>
		</Container>
	);
}
