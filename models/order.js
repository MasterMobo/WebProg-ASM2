// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978482, s3979081

const Product = require("./product");
const DistributionHub = require("./distributionHub");
const Customer = require("./customer");

const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "Please provide customer ID"],
  },

  distributionHubId: {
    // Distribution hub will be automatically picked (randomly) before saving to database
    type: mongoose.Schema.Types.ObjectId,
    ref: "DistributionHub",
    required: false,
  },
  customerAddress: {
    // Customer address will be automatically set before saving to database
    type: String,
    required: false,
  },
  products: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Please provide product ID"],
      },
      name: {
        // Product name will be automatically set before saving to database
        type: String,
        required: false,
      },
      imageURL: {
        // Image URL will be automatically set before saving to database
        type: String,
        required: false,
      },
      quantity: {
        type: Number,
        required: [true, "Please provide quantity"],
        min: 1,
      },
    },
  ],
  totalPrice: {
    // Total price will be automatically calculated before saving to database
    type: Number,
    required: false,
    min: 0,
  },
  status: {
    type: String,
    required: [true, "Please provide status"],
    enum: ["active", "delivered", "canceled"],
    default: "active",
  },
});

// set imageURL
OrderSchema.pre("save", async function (next) {
  for (let i = 0; i < this.products.length; i++) {
    const product = this.products[i];
    const productModel = await Product.findById(product.productID);
    product.imageURL = productModel.imageURL;
    product.name = productModel.name;
  }
  next();
});

// Randomly pick a distribution hub
OrderSchema.pre("save", async function (next) {
  const distributionHubs = await DistributionHub.find();
  const randomIndex = Math.floor(Math.random() * distributionHubs.length);
  this.distributionHubId = distributionHubs[randomIndex]._id;
  next();
});

// Set customer address before saving to database
OrderSchema.pre("save", async function (next) {
  const customer = await Customer.findById(this.customerID);
  this.customerAddress = customer.address;
  next();
});

// Calculate total price before saving to database
OrderSchema.pre("save", async function (next) {
  let totalPrice = 0;
  for (let i = 0; i < this.products.length; i++) {
    const product = this.products[i];
    const productModel = await Product.findById(product.productID);
    totalPrice += productModel.price * product.quantity;
  }
  this.totalPrice = totalPrice;
  next();
});

module.exports = mongoose.model("Order", OrderSchema);
