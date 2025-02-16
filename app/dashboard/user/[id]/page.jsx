import GoBack from "@/components/ui/GoBack";
import Image from "next/image";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import UserShowForm from "../show/Form";
import { AspectRatio } from "@mantine/core";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";
import { fetchUserProfile } from "@/lib/repository/user/dal";
import Logger from "@/lib/logger";

export default async function ProfilePage({ params }) {
	const id = (await params).id;
	const authUser = await checkAuthAndRoles(`/user/show/${id}`);
	if (React.isValidElement(authUser)) return authUser;

	if (!id) return notFound();
	const user = await fetchUserProfile(id);

	if (!user) return notFound();

	return (
		<div className="relative mx-auto max-w-screen-xl p-4">
			<div className="relative">
				<div className="mt-12 mb-8 absolute -top-24 right-2">
					<GoBack />
				</div>
				<div className="mt-16 grid h-full w-full grid-cols-10 items-stretch rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
					<div className="relative col-span-4 flex h-full items-center justify-center">
						<AspectRatio
							ratio={1080 / 720}
							maw={200}
							className="w-full">
							<Image
								src={
									user.image ||
									"https://placehold.co/600x400?text=Default+Profile+Picture"
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
