import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import prisma from "../prisma.js";

export const getQuotes: RequestHandler = async (req, res) => {
  const quotes = await prisma.quote.findMany();
  res.json({ quotes });
};

export const createQuote: RequestHandler = async (req, res) => {
  const body = req.body;
  body.userId = req.user.id;
  const quote = await prisma.quote.create({
    data: body,
  });
  res.status(201).json(quote);
};

export const getQuote: RequestHandler = async (req, res, next) => {
  const quoteId = Number.parseInt(req.params.id);
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
  });

  if (!quote) {
    return next(new Error("404"));
  }
  console.log("Quote Found!");
  res.json({ quote });
};

export const updateQuote: RequestHandler = async (req, res) => {
  const quoteId = Number.parseInt(req.params.id);
  const quote = await prisma.quote.update({
    where: { id: quoteId },
    data: req.body,
  });
  console.log("Update Successful!");
  res.json({ quote });
};

export const deleteQuote: RequestHandler = async (req, res) => {
  const quoteId = Number.parseInt(req.params.id);
  const result = await prisma.quote.delete({
    where: { id: quoteId },
  });
  console.log(`Quote Deleted...`);
  res.sendStatus(200);
};

export const createLike: RequestHandler = async (req, res) => {
  const quoteId = Number.parseInt(req.params.id);
  const userId = req.user.id;

  const quote = await prisma.quote.update({
    where: { id: quoteId },
    data: {
      likes: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      _count: true,
    },
  });
  console.log("Liked Quote");
  res.status(201).json({ quoteLikeCount: quote._count.likes });
};

export const deleteLike: RequestHandler = async (req, res) => {
  const quoteId = Number.parseInt(req.params.id);
  const userId = req.user.id;
  const quote = await prisma.quote.update({
    where: { id: quoteId },
    data: {
      likes: {
        disconnect: {
          id: userId,
        },
      },
    },
    include: {
      _count: true,
    },
  });
  console.log("Unliked Quote");
  res.status(201).json({ quoteLikeCount: quote._count.likes });
};

export const getComments: RequestHandler = async (req, res, next) => {
  const quoteId = Number.parseInt(req.params.id);
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    include: {
      comments: true,
      _count: true,
    },
  });
  if (!quote) {
    return next(new Error("404"));
  }
  res.json({ comments: quote.comments });
};

// we may make this part of the comments controller instead...
export const createComment: RequestHandler = async (req, res, next) => {
  const quoteId = Number.parseInt(req.params.id);
  const body = req.body;
  body.userId = req.user.id;
  const comment = await prisma.comment.create({
    data: body,
  });
  res.json({ comment });
};
