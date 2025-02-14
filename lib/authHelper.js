import { rolesConfig } from "@/lib/roleConfig";
import sessionHelper from "@/lib/sessionHelper";
import { matchPath } from "@/lib/matchPath"; // Function to match dynamic routes
import NotAuthenticated from "@/components/ui/auth/NotAuthenticated";
import RoleErrorPage from "@/components/ui/auth/RoleErrorPage";
import NotAuthorized from "@/components/ui/auth/NotAuthorized";
import Logger from "./logger";
import { headers } from "next/headers";

export async function checkAuthAndRoles(pathname = "") {
	// ! automatically fetch current request pathname in server side
	// ! by using refer property, dashboard page is not authorized peroperly
	// 🔹 Retrieve the request headers (contains URL information)
	// const requestHeaders = await headers();
	// Logger.debug(requestHeaders, "req header");
	// const fullUrl = requestHeaders.get("referer") || ""; // Extract full
	// const urlObj = new URL(fullUrl); // Convert string URL into an object
	// const pathname = urlObj.pathname;

	// Logger.info(pathname, "Current Path");

	// 🔹Get the user session
	const session = await sessionHelper.getUserSession();
	if (!session) return <NotAuthenticated />;

	// 🔹Find matching route in config (supports dynamic `[id]` paths)
	const matchedPath = Object.keys(rolesConfig).find((route) =>
		matchPath(route, pathname)
	);

	Logger.debug(pathname, "match path");

	// 🔹 If no config found, show role config not setup page
	if (!matchedPath) return <RoleErrorPage />;

	// 🔹Check user authorization
	const requiredRoles = rolesConfig[matchedPath];
	const isAuthorized = await sessionHelper.isUserAuthorized(
		session.userId,
		requiredRoles
	);

	Logger.info(isAuthorized, "is authorize");

	// 🔹 Return authentication result
	if (!isAuthorized) return <NotAuthorized />;

	// 🔹Get authenticated user details
	const authUser = await sessionHelper.getAuthenticatedUser();

	return authUser;
}
