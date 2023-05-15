const Product = require("../models/product");
const {NotFoundError, UnauthorizedError} = require("../errors/index");

const getProducts = async (req, res) => {
    const products = await Product.find({});
    return res.status(200).json({ products });
}

const getProductId = async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        throw new NotFoundError("Product not found");
    }
    return res.status(200).json({ product });
}

module.exports = {getProducts, getProductId}
