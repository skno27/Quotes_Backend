import { NextFunction, Request, Response } from "express";
import cacheAndResponse from "./setKey.js";

const cache = async (
  req: Request,
  res: Response,
  next: NextFunction,
  controller: (req: Request, res: Response, next: NextFunction) => void
) => {
  const key = req.originalUrl;
  await cacheAndResponse(res, key, async () => {
    return new Promise((resolve, reject) => {
      const originalJson = res.json.bind(res);
      res.json = (data) => {
        resolve(data);
        return originalJson(data);
      };
      controller(req, res, next);
    });
  });
};

export default cache;
