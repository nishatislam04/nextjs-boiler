export function matchPath(configPath, requestPath) {
	// Convert `/post/:id` → `/post/([^/]+)`
	const regex = new RegExp(
		"^" + configPath.replace(/:[^/]+/g, "([^/]+)") + "$"
	);
	return regex.test(requestPath);
}
