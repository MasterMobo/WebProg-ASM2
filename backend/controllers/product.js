const Product = require("../models/product");
const {NotFoundError} = require("../errors/index");

const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ products });
}

const getProductId = async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        throw new NotFoundError("Product not found");
    }
    return res.status(200).json({ product });
}

const addProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
}

const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
        
    if (!product) {
        throw new NotFoundError("Product not found");
    }
    return res.status(200).json({ product });
}

module.exports = {getProducts, getProductId, addProduct, deleteProduct}
