import { PrismaClient } from "@prisma/client";

/**
 * @type {PrismaClient}
 */
let prisma;

if (!global.prisma) {
	global.prisma = new PrismaClient({
		// log: ["query", "info", "warn", "error"],
	});
}

prisma = global.prisma;

export default prisma;
