import { Request, Response } from "express";
import { createClient } from "redis";
import redisClient from "../../redis.js";

const cacheAndResponse = async (
  res: Response,
  key: string,
  fetchFunction: () => Promise<any>
) => {
  try {
    if (!redisClient.isOpen) {
      console.log("Redis client is closed. Attempting to reconnect...");
      await redisClient.connect().catch((err) => {
        console.error("Failed to reconnect to Redis:", err);
        throw new Error("Redis connection failed");
      });
    }
    const data = await fetchFunction();

    await redisClient.set(key, JSON.stringify(data), {
      EX: 3600, // expire cache in 1hr
    });
    // res.json(data);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      console.error("Error occurred after headers were sent:", error);
    }
  }
};

export default cacheAndResponse;
