const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    uname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    }, 
    date: {
      type: String,
      required: true,
    },
    subcontinents: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
    imageCode: {
      type: String,
    },
    description: {
      type: String,
      // minlength: [20, "Description must be at least 20 characters long."],
      maxlength: [300, "Description cannot exceed 300 characters."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
