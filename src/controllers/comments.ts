import express, {
  NextFunction,
  Request,
  RequestHandler,
  response,
  Response,
} from "express";
import prisma from "../prisma.js";

const getId = (request: Request) => Number.parseInt(request.params.id);

export const getComment: RequestHandler = async (req, res) => {
  const commentId = getId(req);
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  res.json({ comment });
};

export const updateComment: RequestHandler = async (req, res) => {
  const commentId = getId(req);
  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: req.body,
  });
  res.json({ comment });
};

export const deleteComment: RequestHandler = async (req, res) => {
  const commentId = getId(req);
  const deleted = await prisma.comment.delete({
    where: { id: commentId },
  });
  console.log(`Post DELETED Successfully`);

  res.sendStatus(200);
};
