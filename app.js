require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");

const productsRouter = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const app = express();

// middleware
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">products</a>');
});

app.use("/api/v1/products", productsRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
}

start();
