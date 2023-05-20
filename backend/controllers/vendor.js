// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

const Vendor = require("../models/vendor");
const Product = require("../models/product");
const {
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
} = require("../errors/index");

const getVendors = async (req, res) => {
    // Get all vendors
    const vendors = await Vendor.find({});
    const vendorsWithoutPassword = vendors.map((vendor) => {
        const { password, ...vendorWithoutPassword } = vendor._doc;
        return vendorWithoutPassword;
    });
    return res.status(200).json({ vendors: vendorsWithoutPassword });
};

const getVendorId = async (req, res) => {
    // Get a vendor by id
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
        throw new NotFoundError("Vendor not found");
    }
    const { password, ...vendorWithoutPassword } = vendor._doc;
    return res.status(200).json({ vendor: vendorWithoutPassword });
};

const getVendorProducts = async (req, res) => {
    // Get all products of a vendor

    const { role } = req.user;

    if (role !== "vendor") {
        throw new UnauthorizedError("You are not a vendor");
    }

    const products = await Product.find({ vendorID: req.user.userID });

    if (!products) {
        throw new NotFoundError("Products not found");
    }

    return res.status(200).json({ products });
};

const addProduct = async (req, res) => {
    const { userID, role } = req.user;

    if (role !== "vendor") {
        throw new UnauthorizedError("You are not authorized to add a product");
    }
    const { name, price, description } = req.body;

    if (!req.file) {
        throw new BadRequestError("Image is required");
    }
    const imageURL = req.file.path;
    const product = await Product.create({
        name,
        price,
        imageURL,
        description,
        imageURL,
        vendorID: userID,
    });
    return res.status(201).json({ product });
};

const deleteProduct = async (req, res) => {
    const { userID, role } = req.user;

    if (role !== "vendor") {
        throw new UnauthorizedError(
            "You are not authorized to delete a product"
        );
    }
    const product = await Product.findOneAndDelete({
        _id: req.params.id,
        vendorID: userID,
    });

    if (!product) {
        throw new NotFoundError("Product not found");
    }
    return res.status(200).json({ product });
};

const updateProduct = async (req, res) => {
    const { userID, role } = req.user;

    if (role !== "vendor") {
        throw new UnauthorizedError(
            "You are not authorized to update a product"
        );
    }

    const product = await Product.findOneAndUpdate(
        { _id: req.params.id, vendorID: userID },
        req.body,
        { new: true }
    );

    if (!product) {
        throw new NotFoundError("Product not found");
    }

    return res.status(200).json({ product });
};

module.exports = {
    getVendors,
    getVendorId,
    getVendorProducts,
    addProduct,
    deleteProduct,
    updateProduct,
};
