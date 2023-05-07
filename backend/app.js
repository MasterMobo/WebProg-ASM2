require("dotenv").config();

const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
