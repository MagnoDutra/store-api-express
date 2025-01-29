require("dotenv").config();

const connectDB = require("./db/connect");
const product = require("./models/product");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

async function start() {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Connected to the DB...");

    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Success");

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
