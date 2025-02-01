const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .select("name price")
    .limit();
  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) queryObject.featured = featured === "true" ? true : false;
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: "i" };
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|>|>=|=|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];

    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        queryObject[field] = { [operator]: +value };
      }
    });
  }

  let result = Product.find(queryObject);

  if (sort) {
    result = result.sort(sort.split(",").join(" "));
  }

  if (fields) {
    result = result.select(fields.split(",").join(" "));
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = page * limit - limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, length: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
