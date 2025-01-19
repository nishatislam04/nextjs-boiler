import { notFound } from "next/navigation";
import { cache } from "react";

async function fetchUser(id) {
	const user = cache(async () => {
		return await prisma.user.findUnique({
			where: {
				id: parseInt(id),
			},
			include: {
				profile: true,
			},
		});
	});

	return user;
}

export default async function ProfilePage({ searchParams }) {
	const params = await searchParams;
	const id = params.id;

	if (!Number.isInteger(id)) notFound();

	const user = await fetchUser(id);

	if (!user) notFound();

	// console.log(user);
	return <div className="">ProfilePage</div>;
}
