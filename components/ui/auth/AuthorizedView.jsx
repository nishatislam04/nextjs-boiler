import Logger from "@/lib/logger";
import { rolesConfig } from "@/lib/roleConfig";
import sessionHelper from "@/lib/sessionHelper";

export default async function AuthorizedView({ pathname, children }) {
	// Retrieve the authenticated user
	const authUser = await sessionHelper.getAuthenticatedUser();

	// Check if rolesConfig has the current pathname and get the required roles
	const targetViewRoles = rolesConfig[pathname];

	// If there are no roles for the given pathname, deny access
	if (!targetViewRoles) {
		return (
			<p className="text-xs font-light text-gray-300 uppercase">
				auth fail: No roles defined for this path
			</p>
		);
	}

	// Check if at least one role of the authenticated user is in the target roles
	const isEligible = authUser.roles.some((role) =>
		targetViewRoles.includes(role)
	);

	// If the user is authorized, render children or the protected content
	if (!isEligible) return null;
	// return (
	// 	<p className="text-gray-300 uppercase font-light text-xs">
	// 		You are not authorized to view this resource.
	// 	</p>
	// );

	return { children };
}
