import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// roles
	const roles = ["super", "admin", "member"];

	for (const role of roles) {
		await prisma.role.upsert({
			where: { name: role },
			update: {},
			create: { name: role },
		});
	}

	// Seed Categories
	const categories = [
		"Technology",
		"Health",
		"Finance",
		"Education",
		"Entertainment",
	];
	for (const name of categories) {
		await prisma.category.upsert({
			where: { name },
			update: {},
			create: { name, status: true },
		});
	}

	// Seed Tags
	const tags = ["AI", "Wellness", "Investing", "E-learning", "Movies"];
	for (const name of tags) {
		await prisma.tag.upsert({
			where: { name },
			update: {},
			create: { name, status: true },
		});
	}

	// Function to create random users and posts
	const userPromises = Array.from({ length: 10 }).map(async () => {
		const memebrRoleId = await prisma.role.findFirst({
			where: { name: "member" },
		});

		const user = await prisma.user.create({
			data: {
				email: faker.internet.email(),
				name: faker.person.fullName(),
				username: faker.internet.username(),
				image: faker.image.avatar(),
				password: faker.internet.password(),
				roles: {
					connect: { id: memebrRoleId.id },
				},
				profile: {
					create: {
						bio: faker.lorem.sentence(),
						website: faker.internet.url(),
						location: faker.location.city(),
					},
				},
			},
		});

		// Create posts for each user
		const postPromises = Array.from({ length: 5 }).map(() =>
			prisma.post.create({
				data: {
					title: faker.lorem.sentence(),
					slug: faker.lorem.slug(),
					description: faker.lorem.paragraph(),
					shortDescription: faker.lorem.sentence(),
					published: faker.datatype.boolean(),
					publishedAt: faker.date.recent(),
					authorId: user.id,
					categories: {
						connect: [{ name: faker.helpers.arrayElement(categories) }], // Connect a random category
					},
					tags: {
						connect: [{ name: faker.helpers.arrayElement(tags) }], // Connect a random tag
					},
				},
			})
		);

		await Promise.all(postPromises); // Wait for all posts to be created
	});

	await Promise.all(userPromises); // Wait for all users and their posts to be created

	console.log("Database seeding completed!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
