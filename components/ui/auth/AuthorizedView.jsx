"use client";

import { rolesConfig } from "@/lib/roleConfig";
import { useContext } from "react";
import { UserContext } from "@/context/AuthUserContext";

export default function AuthorizedView({ pathname, children }) {
	const { userData } = useContext(UserContext);

	// Check if rolesConfig has the current pathname and get the required roles
	const targetViewRoles = rolesConfig[pathname];

	if (!targetViewRoles) {
		return (
			<p className="text-xs font-light text-gray-300 uppercase">
				auth fail: No roles defined for this path
			</p>
		);
	}

	// Check if at least one role of the authenticated user is in the target roles
	const isEligible = userData?.roles?.some((role) =>
		targetViewRoles.includes(role)
	);

	if (!isEligible) return null;

	return <>{children}</>;
}
