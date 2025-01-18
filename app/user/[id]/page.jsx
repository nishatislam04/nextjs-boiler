import { notFound } from "next/navigation";

async function fetchUser(id) {
	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(id),
		},
		include: {
			profile: true,
		},
	});

	return user;
}

export default async function ProfilePage({ params }) {
	const id = (await params).id;
	const user = await fetchUser(id);

	if (!user) notFound();

	// console.log(user);
	return <div className="">ProfilePage</div>;
}
