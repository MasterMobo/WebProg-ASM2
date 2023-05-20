// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

const Product = require("../models/product");
const { NotFoundError, UnauthorizedError } = require("../errors/index");

const getProducts = async (req, res) => {
    const { name, minPrice, maxPrice, category } = req.query;

    let query = {};
    if (name) {
        query.name = { $regex: name, $options: "i" };
    }
    if (category) {
        query.category = { $regex: category, $options: "i" };
    }
    if (minPrice) {
        query.price = { $gte: minPrice };
    }
    if (maxPrice) {
        query.price = { ...query.price, $lte: maxPrice };
    }
    const products = await Product.find(query);
    return res.status(200).json({ products });
};

const getProductId = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new NotFoundError("Product not found");
    }
    return res.status(200).json({ product });
};

module.exports = { getProducts, getProductId };
