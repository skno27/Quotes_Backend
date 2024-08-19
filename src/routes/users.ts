import Express from "express";
import * as usersController from "../controllers/users.js";

import * as validation from "../middleware/validation.js";
import { isAdmin } from "../middleware/loginAuth.js";

const router = Express.Router();

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUser);
router.patch("/", validation.updateUser, usersController.updateUser);

router.delete("/", usersController.deleteUser);
router.delete("/:id", isAdmin, usersController.adminDeleteUser);

router.get("/:id/quotes", usersController.getUserQuotes);
router.get("/:id/quotes-liked", usersController.getUserLikedQuotes);
// dont think this one is needed, no following relationship at this time // router.get("/:id/quotes-followed", usersController.getUserFollowedPosts);

export default router;
