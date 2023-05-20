// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

const APIError = require("./APIError");
const UnauthorizedError = require("./UnauthorizedError");
const NotFoundError = require("./NotFoundError");
const BadRequestError = require("./BadRequestError");

module.exports = {
    APIError,
    UnauthorizedError,
    NotFoundError,
    BadRequestError,
};
