const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find().select("name price").limit();
  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) queryObject.featured = featured === "true" ? true : false;
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: "i" };

  let result = Product.find(queryObject);

  if (sort) {
    result = result.sort(sort.split(",").join(" "));
  }

  if (fields) {
    result = result.select(fields.split(",").join(" "));
  }

  const products = await result;
  res.status(200).json({ products, length: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
