import Redis from "ioredis";

const redis = new Redis({
	host: process.env.REDIS_HOST || "localhost",
	port: Number(process.env.REDIS_PORT) || 6379,
	maxRetriesPerRequest: 5, // Retry up to 5 times before giving up
	enableAutoPipelining: true, // Automatically batch commands
	lazyConnect: true, // Connect only when commands are executed
	connectTimeout: 10000, // Set timeout to 10 seconds
	retryStrategy: (times) => Math.min(times * 50, 2000), // Retry logic
});

// Middleware to log `get` commands
redis.monitor((err, monitor) => {
	if (err) {
		console.error("Redis monitoring failed:", err);
		return;
	}

	monitor.on("monitor", (time, args) => {
		if (args[0] === "get") {
			const startTime = Date.now();
			console.log(`Redis cache hit: Key => ${args[1]}`);
			const endTime = Date.now();
			console.log(`Time taken for cache hit: ${endTime - startTime}ms`);
		}
	});
});

redis.on("connect", () => console.log("Connected to Redis"));
redis.on("error", (err) => console.error("Redis Error:", err));

export default redis;
