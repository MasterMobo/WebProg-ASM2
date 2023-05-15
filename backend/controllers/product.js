const Product = require("../models/product");
const { NotFoundError, UnauthorizedError } = require("../errors/index");

const getProducts = async (req, res) => {
    const { name, minPrice, maxPrice } = req.query;

    let query = {};
    if (name) {
        query.name = { $regex: name, $options: "i" };
    }
    if (minPrice) {
        query.price = { $gte: minPrice };
    }
    if (maxPrice) {
        query.price = { ...query.price, $lte: maxPrice };
    }
    console.log(query);
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
