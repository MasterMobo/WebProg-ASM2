const mongoose = require("mongoose");
const DistributionHubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        unique: true,
        minlength: 5,
        maxlength: 100,
    },
    address: {
        type: String,
        required: [true, "Please provide address"],
        unique: true,
        minlength: 5,
        maxlength: 100,
    },
});

module.exports = mongoose.model("DistributionHub", DistributionHubSchema);
