// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978482, s3979081

const jwt = require("jsonwebtoken");

const { UnauthorizedError } = require("../errors/index");

const jwtAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (
    !token ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    throw new UnauthorizedError("Invalid Authorization header");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }
};

module.exports = jwtAuth;
