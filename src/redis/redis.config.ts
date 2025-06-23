// src/config/redisClient.ts
import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host:  'redis', 
    port:  6379,
  },
});

redisClient.on("error", (err) => console.error("Redis error:", err));
redisClient.on("connect", () => console.log("Redis connected"));

export default redisClient;
