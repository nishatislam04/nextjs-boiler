import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost", // Redis container hostname
  port: Number(process.env.REDIS_PORT) || 6379, // Redis container port
});

redis.on("connect", () => console.log("Connected to Redis"));
redis.on("error", (err) => console.error("Redis Error:", err));

export default redis;
