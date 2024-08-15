const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    roomid: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    aadhar: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    roomNumbers: {
      type: Number,
      required: true,
      default: 1,
    },
    checkinDate: {
      type: Date,
      required: true,
    },
    checkoutDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
