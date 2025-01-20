import GoBack from "@/components/GoBack";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import prisma from "@/prisma/db";
import { auth } from "@/app/auth";

async function fetchUser(id) {
	return prisma.user.findUnique({
		where: {
			id: id,
		},
		include: {
			profile: true,
			accounts: true, // Use `accounts` as defined in the schema
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
	const session = await auth();

	console.log("xxx", user, session);

	const computeUserName =
		user.username || user.name.toLowerCase().replaceAll(" ", "-");

	const formattedDate = format(new Date(user.createdAt), "dd - MM - yyyy");

	return (
		<div className="max-w-screen-xl h-96 mx-auto p-4 mt-12 relative">
			<GoBack />

			<div className="grid grid-cols-10 items-stretch bg-white border border-gray-200 rounded-lg shadow w-full h-full mt-16 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
				<div className="col-span-4 h-full relative">
					<Image
						fill
						priority={false}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover rounded-t-lg md:rounded-none md:rounded-s-lg"
						src={
							user.image ||
							"https://via.placeholder.com/150/0000FF/808080?text=Default+Avatar"
						}
						alt="User Avatar"
					/>
				</div>

				{/* User Information Section */}
				<div className="col-span-6 p-6">
					<div className="grid grid-cols-2 gap-4">
						<div className="col-span-full">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								{user.name}
								<span className="text-gray-400 text-base pl-2">
									{user.username || computeUserName}
								</span>
							</h5>
						</div>

						<div>
							<p className="text-gray-700 dark:text-gray-400">
								<strong>Email:</strong> {user.email}
							</p>
						</div>
						<div>
							<p className="text-gray-700 dark:text-gray-400">
								<strong>Joined On:</strong> {formattedDate}
							</p>
						</div>
						<div>
							<p className="text-gray-700 dark:text-gray-400">
								<strong>Total Posts:</strong> 10
							</p>
						</div>
						<div>
							<p className="text-gray-700 dark:text-gray-400">
								<strong>Logged in via:</strong> {user.accounts.provider}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
