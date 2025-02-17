import Redis from "ioredis";

class RedisSingleton {
	static instance = null;

	constructor() {
		if (RedisSingleton.instance) {
			return RedisSingleton.instance;
		}

		// Check if using Upstash Redis
		const isUpstash = process.env.REDIS_HOST?.includes("upstash.io");

		this.redis = new Redis({
			host: process.env.REDIS_HOST,
			port: Number(process.env.REDIS_PORT) || 6379,
			password: process.env.REDIS_PASSWORD || "",
			tls: isUpstash ? { rejectUnauthorized: false } : undefined, // Only for Upstash
			maxRetriesPerRequest: 3,
			retryStrategy(times) {
				const delay = Math.min(times * 50, 2000);
				console.log(
					`🔄 Redis retry attempt ${times}, retrying in ${delay}ms`
				);
				return delay;
			},
			reconnectOnError(err) {
				console.error("⚠️ Redis Reconnection Error:", err);
				return err.message.includes("READONLY");
			},
			connectTimeout: 5000,
			enableAutoPipelining: true,
		});

		this.redis.on("connect", () => {
			console.log(
				`✅ Connected to Redis (${isUpstash ? "Upstash" : "Local"})`
			);
		});

		this.redis.on("error", (err) => {
			console.error("❌ Redis Error:", err);
		});

		// 🟢 Hook to auto-log Redis operations
		this._attachLogging();

		RedisSingleton.instance = this.redis;
	}

	/**
	 * Attaches logging to all Redis commands
	 */
	_attachLogging() {
		const redisClient = this.redis;

		// Intercept all Redis commands
		const originalSendCommand = redisClient.sendCommand;
		redisClient.sendCommand = async function (command) {
			const startTime = Date.now();
			const commandName = command.name.toUpperCase();
			const args = command.args.join(", ");
			const cacheKey = command.args[0];

			try {
				const result = await originalSendCommand.apply(
					redisClient,
					arguments
				);
				const executionTime = Date.now() - startTime;

				// Log HIT/MISS for GET commands
				if (commandName === "GET") {
					if (result) {
						console.log(
							`✅ [Redis] Cache HIT: ${cacheKey} (Time: ${executionTime}ms)`
						);
					} else {
						console.log(
							`❌ [Redis] Cache MISS: ${cacheKey} (Time: ${executionTime}ms)`
						);
					}
				}

				return result;
			} catch (error) {
				console.error(`⚠️ [Redis] ${commandName} Error:`, error);
				throw error;
			}
		};
	}

	/**
	 * Checks Redis health status
	 */
	async isHealthy() {
		try {
			const ping = await this.redis.ping();
			return ping === "PONG";
		} catch (error) {
			console.error("❌ Redis health check failed:", error);
			return false;
		}
	}

	/**
	 * Ensures only one instance exists
	 */
	static getInstance() {
		if (!RedisSingleton.instance) {
			new RedisSingleton();
		}
		return RedisSingleton.instance;
	}
}

// ✅ Export singleton instance
export default RedisSingleton.getInstance();

// import Redis from "ioredis";

// class RedisSingleton {
// 	static instance = null;

// 	constructor() {
// 		if (RedisSingleton.instance) {
// 			return RedisSingleton.instance;
// 		}

// 		// Initialize the Redis client with improved configuration
// 		this.redis = new Redis({
// 			host: process.env.REDIS_HOST,
// 			port: Number(process.env.REDIS_PORT),
// 			password: process.env.REDIS_PASSWORD || "",
// 			tls: {}, // Required for Upstash Redis
// 			maxRetriesPerRequest: 3, // Limit retries to avoid hanging
// 			retryStrategy(times) {
// 				const delay = Math.min(times * 50, 2000);
// 				console.log(`Retry attempt ${times} with delay ${delay}ms`);
// 				return delay;
// 			},
// 			reconnectOnError(err) {
// 				console.error("Redis reconnection error:", err);
// 				const targetError = "READONLY";
// 				if (err.message.includes(targetError)) {
// 					return true; // Only reconnect on specific errors
// 				}
// 				return false;
// 			},
// 			connectTimeout: 5000, // Reduced timeout for faster failure detection
// 			enableAutoPipelining: true,
// 		});

// 		// Enhanced error handling
// 		this.redis.on("connect", () => {
// 			console.log("Successfully connected to Redis");
// 		});

// 		this.redis.on("ready", () => {
// 			console.log("Redis client is ready to receive commands");
// 		});

// 		this.redis.on("error", (err) => {
// 			console.error("Redis client error:", err);
// 			if (err.code === "ECONNREFUSED") {
// 				console.error(
// 					"Redis connection refused. Please check your Redis server status."
// 				);
// 			} else if (err.code === "ETIMEDOUT") {
// 				console.error(
// 					"Redis connection timed out. Please check your network connectivity."
// 				);
// 			}
// 		});

// 		this.redis.on("end", () => {
// 			console.log("Redis connection ended");
// 		});

// 		// Simple health check method
// 		this.isHealthy = async () => {
// 			try {
// 				const ping = await this.redis.ping();
// 				return ping === "PONG";
// 			} catch (error) {
// 				console.error("Redis health check failed:", error);
// 				return false;
// 			}
// 		};

// 		RedisSingleton.instance = this.redis;
// 	}

// 	static getInstance() {
// 		if (!RedisSingleton.instance) {
// 			new RedisSingleton();
// 		}
// 		return RedisSingleton.instance;
// 	}
// }

// // Export the singleton instance
// export default RedisSingleton.getInstance();
