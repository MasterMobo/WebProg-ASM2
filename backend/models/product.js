const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide product name"],
        minlenght: 10,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, "Please provide product price"],
        min: 0,
    },
    imageURL: {
        type: String,
        required: false,
        default: null,
    },
    description: {
        type: String,
        required: [true, "Please provide product description"],
        minlenght: 10,
        maxlength: 500,
    },
    vendorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: [true, "Please provide vendor ID"],
    },
});

module.exports = mongoose.model("Product", ProductSchema);
