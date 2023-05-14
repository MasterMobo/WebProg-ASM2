const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const VendorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
        match: /^[a-zA-Z0-9]+$/, // contains only letters (lower and upper case) and digits
        minlength: 8,
        maxlength: 15,
    },
    password: {
        // Password will be hashed before saving to database
        type: String,
        required: [true, "Please provide password"],
    },

    profilePicURL: {
        type: String,
        required: false,
        default: null,
    },

    businessName: {
        type: String,
        required: [true, "Please provide business name"],
        unique: true,
        minlength: 5,
        maxlength: 50,
    },

    businessAddress: {
        type: String,
        required: [true, "Please provide business address"],
        unique: true,
        minlength: 5,
        maxlength: 100,
    },
    role: {
        type: String,
        required: [true, "Please provide role"],
        enum: ["vendor"],
        default: "vendor",
    },
});

// Hash password before saving to database
VendorSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
VendorSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Vendor", VendorSchema);
