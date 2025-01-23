import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Seed Roles
	const roles = [
		"Super",
		"Admin",
		"Moderator",
		"Writer",
		"Viewer",
		"Member",
	];
	for (const role of roles) {
		await prisma.role.upsert({
			where: { role },
			update: {},
			create: { role },
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
	// Fetch all roles from the database
	const allRoles = await prisma.role.findMany();

	// Function to create random users and posts
	const userPromises = Array.from({ length: 10 }).map(async () => {
		const user = await prisma.user.create({
			data: {
				email: faker.internet.email(),
				name: faker.person.fullName(),
				username: faker.internet.username(),
				image: faker.image.avatar(),
				password: faker.internet.password(),
				roles: {
					connect: [{ role: "Member" }], // Assign Member role
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

		// Assign random roles to the user
		const userRoles = faker.helpers.arrayElements(
			allRoles,
			faker.number.int({ min: 1, max: 3 })
		); // Assign 1 to 3 roles
		await prisma.user.update({
			where: { id: user.id },
			data: {
				roles: {
					connect: userRoles.map((role) => ({ id: role.id })),
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
