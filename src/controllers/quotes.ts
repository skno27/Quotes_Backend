import express, { RequestHandler } from "express";
import prisma from "../prisma.js";

// Fetch all quotes
export const getQuotes: RequestHandler = async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany();
    res.json({ quotes });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
};

// Create a new quote
export const createQuote: RequestHandler = async (req, res) => {
  try {
    const { color, body, author } = req.body;
    const userId = req.user.id;

    const result = await prisma.$transaction(async (prisma) => {
      const authorRecord = await prisma.author.upsert({
        where: { name: author || "Unknown" },
        update: {},
        create: { name: author || "Unknown" },
      });

      return await prisma.quote.create({
        data: {
          body,
          color,
          userId,
          authorId: authorRecord.id,
        },
      });
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating quote:", error);
    res.status(500).json({ error: "Failed to create quote" });
  }
};

// Fetch a single quote by ID
export const getQuote: RequestHandler = async (req, res, next) => {
  try {
    const quoteId = Number.parseInt(req.params.id);
    const quote = await prisma.quote.findUnique({
      where: { id: quoteId },
    });

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    console.log("Quote Found!");
    res.json({ quote });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
};

// Update a quote by ID
export const updateQuote: RequestHandler = async (req, res) => {
  try {
    const quoteId = Number.parseInt(req.params.id);
    const quote = await prisma.quote.update({
      where: { id: quoteId },
      data: req.body,
    });

    console.log("Update Successful!");
    res.json({ quote });
  } catch (error) {
    console.error("Error updating quote:", error);
    res.status(500).json({ error: "Failed to update quote" });
  }
};

// Delete a quote by ID
export const deleteQuote: RequestHandler = async (req, res) => {
  try {
    const quoteId = Number.parseInt(req.params.id);
    const result = await prisma.quote.delete({
      where: { id: quoteId },
    });

    console.log(`Quote Deleted...`);
    res.sendStatus(200).json(result);
  } catch (error) {
    console.error("Error deleting quote:", error);
    res.status(500).json({ error: "Failed to delete quote" });
  }
};

// Like a quote
export const createLike: RequestHandler = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error liking quote:", error);
    res.status(500).json({ error: "Failed to like quote" });
  }
};

// Unlike a quote
export const deleteLike: RequestHandler = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error unliking quote:", error);
    res.status(500).json({ error: "Failed to unlike quote" });
  }
};

// Fetch comments for a quote
export const getComments: RequestHandler = async (req, res, next) => {
  try {
    const quoteId = Number.parseInt(req.params.id);
    const quote = await prisma.quote.findUnique({
      where: { id: quoteId },
      include: {
        comments: true,
        _count: true,
      },
    });

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    res.json({ comments: quote.comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// Create a new comment for a quote
export const createComment: RequestHandler = async (req, res, next) => {
  try {
    const quoteId = Number.parseInt(req.params.id);
    const { body } = req.body;
    const userId = req.user.id;

    const comment = await prisma.comment.create({
      data: {
        body,
        quote: {
          connect: { id: quoteId },
        },
        author: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json({ comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};
