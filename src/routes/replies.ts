import Express from "express";
import * as commentsController from "./controllers/comments.js";

import * as validation from "../middleware/validation.js";

const router = Express.Router();

router.get("/:id", commentsController.getComment);
router.patch("/:id", commentsController.updateComment);
router.delete("/:id", commentsController.deleteComment);
