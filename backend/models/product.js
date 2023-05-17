const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide product name"],
        minlenght: 10,
        maxlength: 20,
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
    category: {
        type: String,
        required: [true, "Please provide product category"],
        enum: ["Cats", "Dogs", "Birds", "Fish", "Reptiles", "Others"],
        default: "Others",
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
