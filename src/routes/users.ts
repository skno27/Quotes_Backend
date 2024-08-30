import Express from "express";
import * as usersController from "../controllers/users.js";
import cache from "./utilities/cacheGet.js";

import * as validation from "../middleware/validation.js";
import { isAdmin } from "../middleware/loginAuth.js";

const router = Express.Router();

router.get("/", (req, res, next) => {
  cache(req, res, next, usersController.getUsers);
});
router.get("/:id", (req, res, next) => {
  cache(req, res, next, usersController.getUser);
});
router.patch("/", validation.updateUser, usersController.updateUser);

router.delete("/", usersController.deleteUser);
router.delete("/:id", isAdmin, usersController.adminDeleteUser);

router.get("/:id/quotes", (req, res, next) => {
  cache(req, res, next, usersController.getUserQuotes);
});
router.get("/:id/quotes-liked", (req, res, next) => {
  cache(req, res, next, usersController.getUserLikedQuotes);
});
// ✅
// dont think this one is needed, no following relationship at this time // router.get("/:id/quotes-followed", usersController.getUserFollowedPosts);

export default router;
