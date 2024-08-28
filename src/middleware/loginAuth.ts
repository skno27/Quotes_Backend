import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const auth: RequestHandler = (req, res, next) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET!;
    const authHeader = req.headers.authorization!;
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("Decoded:", decoded.roles);
    req.user = decoded;

    next();
  } catch (err) {
    res.sendStatus(401).json();
  }
};

export const isAdmin: RequestHandler = (req, res, next) => {
  if (!req?.user?.roles?.includes("ADMIN")) {
    return res.status(403).json({ error: "You're not allowed here!" });
  }
  next();
};

export default auth;
