import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { CACHE_TTL } from "@/lib/settings";
import { headers } from "next/headers";

export async function GET(req, { params }) {
	const { userId } = await params;

	if (!userId) {
		return new Response(JSON.stringify({ error: "User ID is required" }), {
			status: 400,
		});
	}

	try {
		const headersList = await headers();

		const cacheKey = `user_session_client:${headersList.get("x-forwarded-for")}`;
		const cachedUser = await redis.get(cacheKey);

		if (cachedUser) {
			return new Response(cachedUser, { status: 200 });
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				name: true,
				email: true,
				username: true,
				image: true,
				roles: { select: { name: true } },
			},
		});

		if (!user) {
			return new Response(JSON.stringify({ error: "User not found" }), {
				status: 404,
			});
		}

		const userData = JSON.stringify({
			...user,
			roles: user.roles.map((role) => role.name),
		});

		await redis.setex(cacheKey, CACHE_TTL, userData);

		return new Response(userData, { status: 200 });
	} catch (error) {
		console.error("❌ Error fetching user data:", error);
		return new Response(
			JSON.stringify({ error: "Error fetching user data" }),
			{ status: 500 }
		);
	}
}

// import prisma from "@/lib/prisma";
// export async function GET(req, { params }) {
// 	const { userId } = await params; // Access userId from URL params

// 	if (!userId) {
// 		return new Response(JSON.stringify({ error: "User ID is required" }), {
// 			status: 400,
// 		});
// 	}

// 	try {
// 		const user = await prisma.user.findUnique({
// 			where: { id: userId },
// 			select: {
// 				id: true,
// 				name: true,
// 				email: true,
// 				username: true,
// 				image: true,
// 				roles: { select: { name: true } },
// 			},
// 		});

// 		if (!user) {
// 			return new Response(JSON.stringify({ error: "User not found" }), {
// 				status: 404,
// 			});
// 		}

// 		// Return the user data (with roles as array of names)
// 		return new Response(
// 			JSON.stringify({
// 				...user,
// 				roles: user.roles.map((role) => role.name),
// 			}),
// 			{ status: 200 }
// 		);
// 	} catch (error) {
// 		console.error("Error fetching user data:", error);
// 		return new Response(
// 			JSON.stringify({ error: "Error fetching user data" }),
// 			{
// 				status: 500,
// 			}
// 		);
// 	}
// }
