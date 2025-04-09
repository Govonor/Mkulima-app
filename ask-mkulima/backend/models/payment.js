const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["M-Pesa", "Stripe", "PayPal"], required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  transactionId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
