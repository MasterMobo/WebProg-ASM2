const mongoose = require('mongoose');
const ShipperSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please provide username"],
        unique: true,
        minlength: 8,
        maxlength: 15,
        match: /^[a-zA-Z0-9]+$/, // contains only letters (lower and upper case) and digits
    },
    password: {
        type: String,
        require: [true, "Please provide password"],
    },
    profilePicURL: {
        type: String,
        require: false,
        default: null,
    },
    distributionHubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DistributionHub",
        require: [true, "Please provide distribution hub id"],
    }
});

module.exports = mongoose.model("Shipper", ShipperSchema);