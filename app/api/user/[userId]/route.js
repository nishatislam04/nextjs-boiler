import prisma from "@/lib/prisma";
export async function GET(req, { params }) {
	const { userId } = await params; // Access userId from URL params

	if (!userId) {
		return new Response(JSON.stringify({ error: "User ID is required" }), {
			status: 400,
		});
	}

	try {
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

		// Return the user data (with roles as array of names)
		return new Response(
			JSON.stringify({
				...user,
				roles: user.roles.map((role) => role.name),
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching user data:", error);
		return new Response(
			JSON.stringify({ error: "Error fetching user data" }),
			{
				status: 500,
			}
		);
	}
}
