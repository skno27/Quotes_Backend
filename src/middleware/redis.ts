import { RequestHandler } from "express";
import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379", // or whatever the server url is
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient
  .connect()
  .catch((err) => console.error("Failed to connect to Redis:", err)); // connect to Redis server

// Middleware to check cache
export const cacheMiddleware: RequestHandler = async (req, res, next) => {
  if (req.method === "GET") {
    const key = req.originalUrl; // Use the url as the Redis key

    try {
      /*
        we wont need it in this application,
        but in the case of needing user-specific caching
        to ensure data security, we would push this onto the front
        of the url-key to make unique redis access keys for the users
        */
      // const userId = req.user.id
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        console.log("Cache hit:", key);
        return res.json(JSON.parse(cachedData));
      }

      console.log("Cache miss:", key);
    } catch (error) {
      console.error("Redis error:", error);
    }
  }
  next();
};
