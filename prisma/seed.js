import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	// Create 10 users
	for (let i = 1; i <= 10; i++) {
		const user = await prisma.user.create({
			data: {
				email: `user${i}@example.com`,
				name: `User ${i}`,
				profile: {
					create: {
						bio: `This is the bio of User ${i}.`,
					},
				},
				posts: {
					create: Array.from({ length: 5 }, (_, j) => ({
						title: `Post ${j + 1} by User ${i}`,
						content: `This is the content of post ${j + 1} by User ${i}.`,
						published: j % 2 === 0, // Alternate published status
					})),
				},
			},
		});
		console.log(`Created User ${i} with Profile and Posts`);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
