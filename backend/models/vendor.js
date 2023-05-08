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
        minlength: 5,
        maxlength: 50,
    },

    businessAddress: {
        type: String,
        required: [true, "Please provide business address"],
        minlength: 5,
        maxlength: 100,
    },
});

VendorSchema.methods.comparePassword = async function (password) {
    return password === this.password;
};

module.exports = mongoose.model("Vendor", VendorSchema);
