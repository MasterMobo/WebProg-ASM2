// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

const APIError = require("./APIError");
class BadRequestError extends APIError {
    constructor(message) {
        super(message);
        this.code = 400;
    }
}

module.exports = BadRequestError;
