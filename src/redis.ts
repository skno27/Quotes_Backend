import { createClient } from "redis";
import env from "dotenv";
env.config();
console.log("REDIS_URL:", process.env.REDIS_URL); // Should print the Redis URL or undefined
let redisClient = createClient({
  url: `redis://${process.env.REDIS_URL}`, // or whatever the server url is
});

export default redisClient;
