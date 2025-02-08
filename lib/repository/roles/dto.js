function toRoleDto(role) {
	return {
		id: role.id,
		name: role.name,
	};
}

export function toRolesDto(roles) {
	return roles.map((role) => toRoleDto(role));
}
