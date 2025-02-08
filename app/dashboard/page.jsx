import { Text, Title } from "@mantine/core";
import { auth } from "../auth";
import Image from "next/image";
import prisma from "@/lib/prisma";
import Logger from "@/lib/logger";
import helpers from "@/lib/helpers";

export default async function DashboardPage() {
	const session = await helpers.getUserSession(); // Handles both OAuth & Credentials
	// Logger.info(session, "session in dashboard");

	// Logger.info(
	// 	await helpers.getAuthenticatedUser(session?.userId),
	// 	"auth user data"
	// );

	const loggedInStatus = session
		? "Logged in user Information"
		: "User Not Logged in";

	if (!session) {
		return (
			<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
				<Title order={1}>{loggedInStatus}</Title>
			</div>
		);
	}

	const authUser = await helpers.getAuthenticatedUser(session?.userId);
	return (
		<div className="relative mx-auto mt-12 flex max-w-screen-xl justify-center gap-2 p-4">
			<div className="mr-auto w-1/2">
				<Title
					className="w-full"
					order={1}>
					{loggedInStatus}
				</Title>
				<div className="mt-4 flex flex-col gap-2">
					<Text
						className="mt-44"
						size="xl"
						fw={600}
						variant="gradient"
						gradient={{ from: "red", to: "orange", deg: 0 }}>
						Name: {authUser.name}
					</Text>
					<Text
						className="mt-44"
						size="xl"
						fw={600}
						variant="gradient"
						gradient={{ from: "red", to: "orange", deg: 0 }}>
						Email: {authUser.email}
					</Text>
					<Text
						className="mt-44"
						size="xl"
						fw={600}
						variant="gradient"
						gradient={{ from: "red", to: "orange", deg: 0 }}>
						Username: {authUser.username}
					</Text>
					<Text
						className="mt-44"
						size="xl"
						fw={600}
						variant="gradient"
						gradient={{ from: "red", to: "orange", deg: 0 }}>
						Role: {authUser.roles.join(", ")}
					</Text>
				</div>
			</div>
			<div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-gray-100">
				<Image
					src={
						authUser.image ||
						"https://placehold.co/600x400?text=Placeholder"
					}
					alt={authUser.name || "User"}
					width={160}
					height={160}
					className="object-cover"
				/>
			</div>
		</div>
	);
}
