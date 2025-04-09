const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g., kg, liters, bunch
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String }, // Store product image URL
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
