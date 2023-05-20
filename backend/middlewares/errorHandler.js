// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

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
