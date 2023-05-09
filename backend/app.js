require("dotenv").config(); // Load environment variables into process.env
require("express-async-errors"); // Handle async errors (this will throw async errors directly to the error handler middleware)

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// Middlewares
const errorHandler = require("./middlewares/errorHandler");

// Routers
const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customer");
const vendorRoutes = require("./routes/vendor");
const shipperRoutes = require("./routes/shipper");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

app.use(express.json()); // Middleware to handle JSON data
app.use("/api/v1/auth", authRoutes); // Route for login and register
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/vendor", vendorRoutes);
app.use("/api/v1/shipper", shipperRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    await connectDB(process.env.MONGO_URI);
};
start();
