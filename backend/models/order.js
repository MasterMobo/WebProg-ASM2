const Product = require("./product");

const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, "Please provide customer ID"],
    },
    products: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "Please provide product ID"],
            },
            quantity: {
                type: Number,
                required: [true, "Please provide quantity"],
                min: 1,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: [true, "Please provide total price"],
        min: 0,
    },
    status: {
        type: String,
        required: [true, "Please provide status"],
        enum: ["active", "delivered", "canceled"],
        default: "pending",
    },
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
