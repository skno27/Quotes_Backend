import { createClient } from "redis";
let redisClient = createClient({
  url: "redis://localhost:6379", // or whatever the server url is
});

export default redisClient;
