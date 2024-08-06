import express from "express";

const app = express();
const port = 80;

app.use(express.json());
// other middlewares

// base route for testing connection
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

// routes with controllers goes here

// error handling middleware goes here

app.listen(port, () => {
  console.log(`App listening...: http://localhost:${port} .`);
});
