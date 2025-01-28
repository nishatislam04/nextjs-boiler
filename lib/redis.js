import Redis from "ioredis";

class RedisSingleton {
	// Static variable to hold the Redis instance
	static instance = null;

	// Private constructor to ensure the class can't be instantiated directly
	constructor() {
		if (RedisSingleton.instance) {
			return RedisSingleton.instance;
		}

		// Initialize the Redis client
		this.redis = new Redis({
			host: process.env.REDIS_HOST || "localhost",
			port: Number(process.env.REDIS_PORT) || 6379,
			password: process.env.REDIS_PASSWORD || "", // Password for Upstash Redis
			maxRetriesPerRequest: 5, // Retry up to 5 times before giving up
			enableAutoPipelining: true, // Automatically batch commands
			lazyConnect: true, // Connect only when commands are executed
			connectTimeout: 10000, // Set timeout to 10 seconds
			retryStrategy: (times) => Math.min(times * 50, 2000), // Retry logic
		});

		// Middleware to log `get` commands
		this.redis.monitor((err, monitor) => {
			if (err) {
				console.error("Redis monitoring failed:", err);
				return;
			}

			monitor.on("monitor", (time, args) => {
				if (args[0] === "get") {
					const startTime = Date.now();
					console.log(`Redis cache hit: Key => ${args[1]}`);
					const endTime = Date.now();
					console.log(
						`Time taken for cache hit: ${endTime - startTime}ms`
					);
				}
			});
		});

		this.redis.on("connect", () => console.log("Connected to Redis"));
		this.redis.on("error", (err) => console.error("Redis Error:", err));

		// Store the instance to the static property
		RedisSingleton.instance = this.redis;
	}

	// Method to get the Redis instance
	static getInstance() {
		if (!RedisSingleton.instance) {
			new RedisSingleton(); // Lazy initialize the instance
		}
		return RedisSingleton.instance;
	}
}

// Export the Singleton instance
export default RedisSingleton.getInstance();
