const errorHandler = (err, req, res, next) => {
    const customError = {
        // Set default values
        statusCode: err.statusCode || 500,
        message: err.message || "Something went wrong, please try again later",
    };
    console.log(err);
    return res
        .status(customError.statusCode)
        .json({ message: customError.message });
};

module.exports = errorHandler;
