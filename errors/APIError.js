// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

class APIError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

module.exports = APIError;
