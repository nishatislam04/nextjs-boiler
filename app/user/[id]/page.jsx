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

export default async function ProfilePage({ params }) {
	const id = (await params).id;

	if (!id) return notFound();
	const user = await fetchUser(id);

	if (!user) return notFound();

	// console.log(user);
	return <div className="">ProfilePage</div>;
}
