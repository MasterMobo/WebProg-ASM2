// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978482, s3979081

require("dotenv").config(); // Load environment variables into process.env
require("express-async-errors"); // Handle async errors (this will throw async errors directly to the error handler middleware)

const express = require("express");
const app = express();

// Imports
const cors = require("cors");
const connectDB = require("./db/connect");
const errorHandler = require("./middlewares/errorHandler");
const jwtAuth = require("./middlewares/jwtAuth");

// Routers
const meRoutes = require("./routes/me");
const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customer");
const vendorRoutes = require("./routes/vendor");
const shipperRoutes = require("./routes/shipper");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const hubRoutes = require("./routes/distributionHub");

app.use(express.static("./frontend")); // Serve static files

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to handle JSON data
app.use("/api/v1/auth", authRoutes); // Route for login and register
app.use("/api/v1/hub", hubRoutes);
app.use("/api/v1/me", jwtAuth, meRoutes);
app.use("/api/v1/customer", jwtAuth, customerRoutes);
app.use("/api/v1/vendor", jwtAuth, vendorRoutes);
app.use("/api/v1/shipper", jwtAuth, shipperRoutes);
app.use("/api/v1/product", jwtAuth, productRoutes);
app.use("/api/v1/order", jwtAuth, orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
    await app.listen(PORT, () => {
        console.log("main 2");
        console.log("feature 1");
        console.log("feature 2");
        console.log("main 3");
        console.log("feature 3");
        console.log(`Server is running on port ${PORT}`);
    });
    console.log("Connecting to database...");
    await connectDB(process.env.MONGO_URI);
};
start();
