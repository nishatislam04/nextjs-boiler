import prisma from "../prisma/db";

export default async function Home() {
	const users = await prisma.user.findMany({});
	return (
		<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			main page
		</div>
	);
}
