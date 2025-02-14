import { NavLink, Text, Title } from "@mantine/core";
import Image from "next/image";
import sessionHelper from "@/lib/sessionHelper";
import NotAuthenticated from "@/components/ui/auth/NotAuthenticated";
import NotAuthorized from "@/components/ui/auth/NotAuthorized";
import { checkAuthAndRoles } from "@/lib/authHelper";
import Logger from "@/lib/logger";
import React from "react";
import { IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { headers } from "next/headers";

export default async function DashboardPage() {
	// Logger.info(req, "req from dash");
	const authUser = await checkAuthAndRoles("/dashboard");
	if (React.isValidElement(authUser)) return authUser;

	Logger.info(authUser, "auth from dash");

	return (
		<div className="relative mx-auto mt-12 flex min-h-[100vh-75px] flex-col max-w-screen-xl justify-center gap-2 p-4">
			<div className="flex ">
				<div className="mr-auto w-1/2">
					<Title
						className="w-full"
						order={1}>
						logged in user information:
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
			<div className="w-28 bg-gray-300 mt-28 text-black hover:bg-gray-400 rounded-md transition-all">
				<NavLink
					href="/dashboard/user"
					component={Link}
					label="Users"
					leftSection={<IconUser />}
					variant="subtle"
					className="flex items-center p-2 w-full "
				/>
			</div>
		</div>
	);
}
