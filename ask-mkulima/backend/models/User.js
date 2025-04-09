const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // hide on queries by default
    },

    phone: {
      type: String,
    },

    location: {
      type: String,
    },

    role: {
      type: String,
      enum: ["farmer", "business", "admin"],
      required: true,
    },

    profilePicture: {
      type: String,
      default: "", // URL or Cloudinary ref
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
