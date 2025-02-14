import { auth } from "@/app/auth"; // Auth.js session
import prisma from "./prisma"; // Prisma ORM for database queries
import Logger from "./logger";

class SessionHelper {
	/**
	 * Retrieves the authenticated user session.
	 * @returns {Promise<object | null>} The authenticated session object or null.
	 */
	async getUserSession() {
		try {
			const session = await auth(); // Get session
			return session || null;
		} catch (error) {
			Logger.error(error, "❌ Error fetching session:");
			return null;
		}
	}

	/**
	 * Fetches the authenticated user's details, including roles.
	 * @param {string} userId - The user's ID.
	 * @returns {Promise<object | null>} The user object or null.
	 */
	async getAuthenticatedUser() {
		let session;
		session = await this.getUserSession();

		if (!session) return null;

		try {
			const user = await prisma.user.findUnique({
				where: { id: session.userId },
				select: {
					id: true,
					name: true,
					email: true,
					username: true,
					image: true,
					roles: { select: { name: true } },
				},
			});

			if (!user) return null;

			// Convert roles to an array of names
			return { ...user, roles: user.roles.map((role) => role.name) };
		} catch (error) {
			Logger.error(error, "❌ Error fetching user:");
			return null;
		}
	}

	/**
	 * Checks if the authenticated user has the required roles.
	 * @param {string} userId - The user's ID.
	 * @param {string[]} allowedRoles - The roles required to access the resource.
	 * @returns {Promise<boolean>} Whether the user is authorized.
	 */
	async isUserAuthorized(userId, allowedRoles) {
		if (!userId) return false;

		try {
			const user = await prisma.user.findUnique({
				where: { id: userId },
				select: { roles: { select: { name: true } } },
			});

			if (!user || !user.roles) return false;

			// Get user roles
			const userRoles = user.roles.map((role) => role.name);

			// Check if user has at least one required role
			return allowedRoles.some((role) => userRoles.includes(role));
		} catch (error) {
			Logger.error(error, "❌ Error checking authorization:");
			return false;
		}
	}
}

// Export as a singleton instance
export default new SessionHelper();
