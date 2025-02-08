import prisma from "@/lib/prisma";
import { toRolesDto } from "./dto";

export async function fetchAllRoles() {
	let roles = await prisma.role.findMany({
		select: {
			id: true,
			name: true,
		},
	});
	return toRolesDto(roles);
}
