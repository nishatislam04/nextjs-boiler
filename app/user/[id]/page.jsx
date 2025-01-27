import GoBack from "@/components/GoBack";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import prisma from "@/lib/db";
import UserShowForm from "../show/Form";
import { AspectRatio } from "@mantine/core";

async function fetchUser(id) {
	return prisma.user.findUnique({
		where: {
			id: id,
		},
		include: {
			profile: true,
			account: true, // Use `accounts` as defined in the schema
			_count: {
				select: { posts: true },
			},
		},
	});
}

export default async function ProfilePage({ params }) {
	const id = (await params).id;

	if (!id) return notFound();
	const user = await fetchUser(id);

	if (!user) return notFound();

	return (
		<div className="relative mx-auto max-w-screen-xl p-4">
			<div className="relative">
				<GoBack />

				<div className="mt-16 grid h-full w-full grid-cols-10 items-stretch rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
					<div className="relative col-span-4 flex h-full items-center justify-center">
						<AspectRatio
							ratio={1080 / 720}
							maw={200}
							className="w-full">
							<Image
								src={
									user.image ||
									"https://via.placeholder.com/150/0000FF/808080?text=Default+Avatar"
								}
								alt="User Avatar"
								className="rounded-lg object-cover"
								fill
							/>
						</AspectRatio>
					</div>

					{/* User Information Section */}
					<div className="col-span-6 p-6">
						<UserShowForm user={user} />
					</div>
				</div>
			</div>
		</div>
	);
}
