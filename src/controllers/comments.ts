import { RequestHandler, Request } from "express";
import prisma from "../prisma.js";

const getId = (req: Request) => Number.parseInt(req.params.id);

// Get a specific comment by ID
export const getComment: RequestHandler = async (req, res) => {
  try {
    const commentId = getId(req);
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ comment });
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ error: "Failed to fetch comment" });
  }
};

// Update a comment by ID
export const updateComment: RequestHandler = async (req, res) => {
  try {
    const commentId = getId(req);
    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: req.body,
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ comment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

// Delete a comment by ID
export const deleteComment: RequestHandler = async (req, res) => {
  try {
    const commentId = getId(req);
    const deleted = await prisma.comment.delete({
      where: { id: commentId },
    });

    console.log(`Comment DELETED Successfully`);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
