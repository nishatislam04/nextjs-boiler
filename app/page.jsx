import Logger from "@/lib/logger";
import sessionHelper from "@/lib/sessionHelper";
import { Button, Card, Text } from "@mantine/core";
import Link from "next/link";

export default async function Home() {
	const authUser = await sessionHelper.getAuthenticatedUser();
	// Logger.info(authUser, "auth user");
	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
			{authUser ? (
				<div className="p-4">
					<div className="flex flex-wrap gap-4 justify-start">
						{/* Profile Card */}
						<div className="w-full sm:w-1/2 md:w-1/3">
							<Card
								shadow="sm"
								p="lg"
								radius="md"
								withBorder
								className="flex flex-col">
								<div className="flex items-center mb-4">
									<Text
										weight={500}
										size="lg">
										My Profile
									</Text>
								</div>
								<Text
									size="sm"
									color="dimmed">
									View your profile information
								</Text>
								<Link href={`/dashboard/user/${authUser.id}`}>
									<Button
										variant="light"
										color="blue"
										fullWidth
										mt="md">
										View Profile
									</Button>
								</Link>
							</Card>
						</div>

						{/* Posts Card */}
						<div className="w-full sm:w-1/2 md:w-1/3">
							<Card
								shadow="sm"
								p="lg"
								radius="md"
								withBorder
								className="flex flex-col">
								<div className="flex items-center mb-4">
									<Text
										weight={500}
										size="lg">
										My Posts
									</Text>
								</div>
								<Text
									size="sm"
									color="dimmed">
									View all your posts here
								</Text>
								<Button
									variant="light"
									color="green"
									fullWidth
									mt="md">
									View Posts
								</Button>
							</Card>
						</div>

						{/* You can add more cards in the future */}
					</div>
				</div>
			) : (
				<p className="text-center text-2xl text-gray-400 font-light uppercase">
					you are not logged in
				</p>
			)}
		</div>
	);
}
