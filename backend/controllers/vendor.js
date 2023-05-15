const Vendor = require("../models/vendor");
const Product = require("../models/product");
const {NotFoundError, UnauthorizedError} = require("../errors/index");

const getVendors = async (req, res) => {
    const vendors = await Vendor.find({});
    const vendorsWithoutPassword = vendors.map((vendor) => {
        const { password, ...vendorWithoutPassword } = vendor._doc;
        return vendorWithoutPassword;
    })
}

const getVendorProducts = async (req, res) => {
    const products = await Product.find({vendorID: req.user.userID});
    res.status(200).json({ products });
}

const addProduct = async (req, res) => {
    const {userID, role} = req.user;

    if (role !== "vendor") {
         throw new UnauthorizedError("You are not authorized to add a product");
    }
    const {name, price, imageURL, description } = req.body;
    
    const product = await Product.create(
        {name, price, imageURL, description, vendorID: userID}
    );
    res.status(201).json({ product });
}

const deleteProduct = async (req, res) => {
    const {userID, role} = req.user;

    if (role !== "vendor") {
            throw new UnauthorizedError("You are not authorized to delete a product");
    }
    const product = await Product.findOneAndDelete({ _id: req.params.id, vendorID: userID });

    if (!product) {
        throw new NotFoundError("Product not found");
    }
    return res.status(200).json({ product });
}

const updateProduct = async (req, res) => {
    const {userID, role} = req.user;

    if (role !== "vendor") { 
        throw new UnauthorizedError("You are not authorized to update a product");
    }

    const product = await Product.findOneAndUpdate({ _id: req.params.id, vendorID: userID }, req.body, { new: true });
    res.status(200).json({ product });
};

module.exports = {getVendorProducts, addProduct, deleteProduct, updateProduct}