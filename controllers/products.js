const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find().sort("name price");
  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const queryObject = {};

  if (featured) queryObject.featured = featured === "true" ? true : false;
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: "i" };

  let result = Product.find(queryObject);
  if (sort) {
    result = result.sort(sort.split(",").join(" "));
  }

  const products = await result;
  res.status(200).json({ products, length: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
