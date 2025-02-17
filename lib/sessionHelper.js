import { auth } from "@/app/auth"; // Auth.js session
import prisma from "./prisma"; // Prisma ORM for database queries
import Logger from "./logger";
import redis from "./redis";
import { headers } from "next/headers";
import { CACHE_TTL } from "./settings";
import helpers from "./helpers";
import redisCacheKey from "./redisCacheKey";

class SessionHelper {
  /**
   * Retrieves the authenticated user session.
   * @returns {Promise<object | null>} The authenticated session object or null.
   */
  async getUserSession() {
    try {
      const headersList = await headers();
      const ipaddress = headersList.get("x-forwarded-for");
      const useragent = headersList.get("user-agent");
      const cacheKey = redisCacheKey.buildCacheKey(
        redisCacheKey.serverSession,
        {
          ipaddress,
          useragent,
        },
      );

      const cachedSession = await redis.get(cacheKey);
      if (cachedSession) return JSON.parse(cachedSession);

      const session = await auth();
      if (!session) return null;

      await redis.set(cacheKey, JSON.stringify(session), "EX", CACHE_TTL);

      return session;
    } catch (error) {
      console.error("❌ Error fetching session:", error);
      return null;
    }
  }

  async clearSessionCache() {
    try {
      const headersList = await headers();
      const ipaddress = headersList.get("x-forwarded-for");
      const useragent = headersList.get("user-agent");

      const cacheKeyServer = redisCacheKey.buildCacheKey(
        redisCacheKey.serverSession,
        {
          ipaddress,
          useragent,
        },
      );
      const cacheKeyClient = redisCacheKey.buildCacheKey(
        redisCacheKey.clientSession,
        {
          ipaddress,
          useragent,
        },
      );

      await redis.del(cacheKeyServer);
      await redis.del(cacheKeyClient);
    } catch (error) {
      console.error("❌ Error clearing session cache:", error);
    }
  }

  /**
   * Fetches the authenticated user's details, including roles.
   * @param {string} userId - The user's ID.
   * @returns {Promise<object | null>} The user object or null.
   */
  async getAuthenticatedUser(userId = null) {
    // if (userId) {
    //   try {
    //     const user = await prisma.user.findUnique({
    //       where: { id: userId },
    //       select: {
    //         id: true,
    //         name: true,
    //         email: true,
    //         username: true,
    //         image: true,
    //         roles: { select: { name: true } },
    //       },
    //     });

    //     if (!user) return null;

    //     // Convert roles to an array of names
    //     return { ...user, roles: user.roles.map((role) => role.name) };
    //   } catch (error) {
    //     Logger.error(error, "❌ Error fetching user:");
    //     return null;
    //   }
    // } else {
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
    // }
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

  async isUserAuthenticated() {
    const session = await auth();
    if (!session || !session.userId) return null;
    return session.userId;
  }
}

// Export as a singleton instance
export default new SessionHelper();
