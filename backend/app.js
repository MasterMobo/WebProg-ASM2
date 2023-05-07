const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

app.use("/product", productRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
