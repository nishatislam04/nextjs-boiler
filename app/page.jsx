import prisma from "@/prisma/db";

export default async function Home() {
	const users = await prisma.user.findMany();
	console.log(users);
	return <div className="">main page</div>;
}
