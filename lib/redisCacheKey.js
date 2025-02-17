import helpers from "./helpers";
import Logger from "./logger";
import redis from "./redis";

class RedisCacheKey {
  publicPostListings = "public:post:listings";
  userPostListings = "user:post:listings";
  userProfilePage = "user:profile:page";
  userListings = "user:listings";
  serverSession = "user_session_server";
  clientSession = "user_session_client";

  buildCacheKey(baseKey, params) {
    const serializedParams = JSON.stringify(params);
    const encodedParams = Buffer.from(serializedParams).toString("base64url"); // Use base64url
    return `${baseKey}:${encodedParams}`;
  }

  async invalidateCache(pattern) {
    let cursor = "0";
    let keys = [];

    do {
      const reply = await redis.scan(
        cursor,
        "MATCH",
        `${pattern}:*`,
        "COUNT",
        100,
      );
      cursor = reply[0]; // Update cursor position
      keys = keys.concat(reply[1]); // Collect matching keys
    } while (cursor !== "0"); // Continue until all keys are scanned

    if (keys.length > 0) {
      await redis.del(...keys);
      Logger.info(keys, "✅ Invalidated cache keys");
    }
  }
}

export default new RedisCacheKey();
