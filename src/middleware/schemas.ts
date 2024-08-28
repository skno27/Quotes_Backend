import z from "zod";
import { Roles, Color } from "@prisma/client";

// const { Roles } = pr;

const userLazy: z.ZodLazy<any> = z.lazy(() => User);
const quoteLazy: z.ZodLazy<any> = z.lazy(() => Quote);
const commentLazy: z.ZodLazy<any> = z.lazy(() => Comment);
// const authorLazy: z.ZodLazy<any> = z.lazy(() => Author);

// User Schema
export const User = z.object({
  id: z.number().int().nonnegative().optional(),
  email: z.string().email(),
  name: z.string().min(2, "at least 2 chars").max(60, "at most 60 chars"),
  username: z.string().min(5, "at least 5 chars").max(50, "at most 50 chars"),
  password: z.string(),
  verified: z.boolean().optional(),
  roles: z.nativeEnum(Roles).array().optional(),
  quotes: z.array(quoteLazy).optional(),
  quotesLiked: z.array(quoteLazy).optional(),
  quoteComments: z.array(quoteLazy).optional(),
});

function containsNumber(value: string): boolean {
  return /\d/.test(value);
}

function containsUppercase(value: string): boolean {
  return /[A-Z]/.test(value);
}

function containsSpecial(value: string): boolean {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
}

// for creating an account
export const Account = User.pick({
  name: true,
  username: true,
  email: true,
})
  .extend({
    password: z
      .string()
      .min(8, "at least 8 chars")
      .refine(containsNumber, "Must Contain a Number")
      .refine(containsUppercase, "Must Contain a Uppercase Letter")
      .refine(containsSpecial, "Must Contain a Special Character"),
  })
  .strict();

export const Login = User.pick({
  password: true,
})
  .extend({
    username: z
      .string()
      .min(5, "at least 5 chars")
      .max(50, " at most 50 chars"),
  })
  .strict();

export const UserUpdate = User.partial()
  .omit({
    roles: true,
  })
  .strict();

// Quote Schema
export const Quote = z.object({
  id: z.number().int().nonnegative().optional(),
  body: z.string().min(2),
  color: z.nativeEnum(Color),
  date: z.date().optional(),
  createdAt: z.date().optional(),
  userId: z.number().int().nonnegative().optional(),
  tags: z.string().array().optional(),
  likes: z.array(userLazy).optional(),
  authorId: z.number().int().nonnegative().optional(),
  author: z.string().optional(),
  uploader: userLazy.optional(),
  comments: z.array(commentLazy).optional(),
});

export const QuoteUpdate = Quote.pick({
  body: true,
  color: true,
  tags: true,
}).strict(); // so that no properties can be added, not that all are required for an update

export const Comment = z.object({
  id: z.number().int().nonnegative().optional(),
  userId: z.number().int().nonnegative().optional(),
  quoteId: z.number().int().nonnegative().optional(),
  body: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  author: userLazy.optional(),
  quote: quoteLazy.optional(),
});

// think we are done here
