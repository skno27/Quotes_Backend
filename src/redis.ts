import { createClient } from "redis";
import env from "dotenv";
env.config();
let redisClient = createClient({
  url: process.env.REDIS_URL, // or whatever the server url is
});

export default redisClient;
