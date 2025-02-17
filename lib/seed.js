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
        password: await Bun.password.hash("123456"),
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
      }),
    );

    await Promise.all(postPromises); // Wait for all posts to be created
  });

  await Promise.all(userPromises); // Wait for all users and their posts to be created

  console.log("random user & posts creation complete!");

  // Fetch role IDs
  const superRole = await prisma.role.findUnique({
    where: { name: "super" },
  });
  const adminRole = await prisma.role.findUnique({
    where: { name: "admin" },
  });
  const memberRole = await prisma.role.findUnique({
    where: { name: "member" },
  });

  // Predefined users
  const users = [
    {
      name: "allrounder",
      username: "allrounder",
      email: "allrounder@allrounder.com",
      password: "123456",
      roles: [superRole.id, adminRole.id, memberRole.id], // All roles
    },
    {
      name: "super",
      username: "super",
      email: "super@super.com",
      password: "123456",
      roles: [superRole.id], // Only Super role
    },
    {
      name: "admin",
      username: "admin",
      email: "admin@admin.com",
      password: "123456",
      roles: [adminRole.id], // Only Admin role
    },
    {
      name: "member",
      username: "member",
      email: "member@member.com",
      password: "123456",
      roles: [memberRole.id], // Only Member role
    },
  ];

  // Hash passwords and create users
  for (const userData of users) {
    const hashedPassword = await Bun.password.hash(userData.password);

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        roles: {
          connect: userData.roles.map((id) => ({ id })),
        },
        profile: {
          create: {
            bio: `I am ${userData.username}`,
            website: `https://${userData.username}.com`,
            location: "Unknown",
          },
        },
      },
    });

    // Create an account entry for authentication (Auth.js Credentials Provider)
    await prisma.account.create({
      data: {
        userId: user.id,
        type: "credentials",
        provider: "credentials",
        providerAccountId: user.email, // Unique identifier for credentials
      },
    });
  }

  console.log("✅ Users & accounts seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
