import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Create 10 users with profiles, posts, accounts, and sessions
	for (let i = 1; i <= 10; i++) {
		const user = await prisma.user.create({
			data: {
				email: `user${i}@example.com`,
				name: `User ${i}`,
				username: `user${i}`,
				emailVerified: i % 2 === 0 ? new Date() : null,
				image: `https://example.com/avatar${i}.png`,
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
				accounts: {
					create: {
						type: "oauth",
						provider: "google",
						providerAccountId: `google-${i}`,
						access_token: `access-token-${i}`,
						refresh_token: `refresh-token-${i}`,
						expires_at: Math.floor(Date.now() / 1000) + 3600, // Expire in 1 hour
						scope: "read write",
						id_token: `id-token-${i}`,
					},
				},
				sessions: {
					create: {
						sessionToken: `session-token-${i}`,
						expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expire in 1 day
					},
				},
			},
		});
		console.log(`Created User ${i} with associated data`);
	}

	// Create additional Verification Tokens for testing
	for (let i = 1; i <= 5; i++) {
		await prisma.verificationToken.create({
			data: {
				identifier: `user${i}@example.com`,
				token: `verification-token-${i}`,
				expires: new Date(Date.now() + 30 * 60 * 1000), // Expire in 30 minutes
			},
		});
	}

	console.log("Seed data created successfully!");
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
