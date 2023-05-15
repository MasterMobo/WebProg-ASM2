const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
    cloud_name: "dgxnapmq0",
    api_key: "165395781533645",
    api_secret: "9JllUPnH82CksqZzJKniHyJF_T8",
});

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        public_id: (req, file) => Date.now() + "-" + file.originalname,
    },
});

const upload = multer({ storage: storage });
module.exports = upload;
