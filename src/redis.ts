import { createClient } from "redis";
import env from "dotenv";
env.config();
let redisClient = createClient({
  url: `redis://${process.env.REDIS_URL}`, // or whatever the server url is
});

export default redisClient;
