const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Must provide product name"] },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, "Must provide product price"] },
  createdAt: { type: Date, default: Date.now() },
  featured: { type: Boolean, default: false },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
