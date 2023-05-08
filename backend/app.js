require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// Middleware
const errorHandler = require("./middlewares/errorHandler");

// Routes
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    await connectDB(process.env.MONGO_URI);
};
start();
