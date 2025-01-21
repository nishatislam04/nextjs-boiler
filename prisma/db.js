import { PrismaClient } from "@prisma/client";

/**
 * @type {PrismaClient}
 */
let prisma;

if (!global.prisma) {
	global.prisma = new PrismaClient();
}

prisma = global.prisma;

export default prisma;
