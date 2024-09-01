import express from "express";
import cors from "cors";
// ROUTERS
import usersRouter from "./routes/users.js";
import quotesRouter from "./routes/quotes.js";
import commentsRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
// MIDDLEWARE
import logging from "./middleware/logging.js";
import errors from "./middleware/errors.js";
import xss from "./middleware/xss.js";
import notFound from "./middleware/notFound.js";
import authenticated from "./middleware/loginAuth.js";
import { cacheMiddleware } from "./middleware/redis.js";

const app = express();
const port = 8080;

app.use(express.json()); // express json data processing protocols

// configure cors
const corsOptions = {
  origin: "quotesocial.com",
  methods: "GET, POST, PATCH, DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(xss); // sanitize everything !
app.use(logging.logRequest); // custom logging

app.use(cacheMiddleware);

// call base route for testing connection
app.get("/", (req, res) => {
  res.json({
    message: `Welcome to the Quotes API. New version successfully deployed!
    Please visit the /info route in order to see how to use this application
    `,
  });
});

app.get("/info", (req, res) => {
  res.json({
    message: `Info route HIT -- New Deployment successful`,
  });
});

// routes
// app.use("/v1/social", socialRouter);
app.use("/v1/auth", authRouter);
app.use(authenticated); // auth middleware
app.use("/v1/users", usersRouter);

app.use("/v1/quotes", quotesRouter);
app.use("/v1/comments", commentsRouter);

// error handling middleware goes here
app.use(errors.errorHandler); // custom error handling
app.use(notFound); // 404

app.listen(port, () => {
  console.log(`App listening... @ http://localhost:${port}`);
});
