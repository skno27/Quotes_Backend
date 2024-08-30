import { RequestHandler } from "express";
import z, { ZodType } from "zod";
import * as schemas from "./schemas.js";
import { ValidationError } from "./errors.js";

export const validateParamId: RequestHandler = (req, res, next) => {
  const result = z
    .number()
    .int()
    .nonnegative()
    .safeParse(parseInt(req.params.id));

  if (!result.success) {
    return next(new ValidationError(result.error.issues));
  }
  next();
};

// returns a function
export const validateBody =
  (schema: ZodType<any>): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new ValidationError(result.error.issues)); // error case
    }

    next();
  };

import { Color } from "@prisma/client";

// set default color if not provided
export const setDefaultColor: RequestHandler = (req, res, next) => {
  if (req.body.color === undefined) {
    req.body.color = Color.RED;
  }

  next();
};

export const createUser = validateBody(schemas.Account);
export const login = validateBody(schemas.Login);
export const updateUser = validateBody(schemas.UserUpdate);
export const createQuote = validateBody(schemas.Quote);
export const updateQuote = [validateParamId, validateBody(schemas.QuoteUpdate)];
