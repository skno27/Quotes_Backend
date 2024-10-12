import { createClient } from "redis";
import env from "dotenv";
env.config();

let redisClient = createClient({
  url: process.env.REDIS_URL, // or use the full URL if needed
});

export default redisClient;
