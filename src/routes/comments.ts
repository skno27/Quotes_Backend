import Express from "express";
import * as commentsController from "../controllers/comments.js";
import cache from "./utilities/cacheGet.js";
// import * as validation from "../middleware/validation.js";

const router = Express.Router();

router.get("/:id", (req, res, next) => {
  cache(req, res, next, commentsController.getComment);
});
router.patch("/:id", commentsController.updateComment);
router.delete("/:id", commentsController.deleteComment);

export default router;
