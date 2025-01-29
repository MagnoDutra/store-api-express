const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true });
  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
