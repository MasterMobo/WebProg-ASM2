// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978482, s3979081

const Customer = require("../models/customer");
const Vendor = require("../models/vendor");
const Shipper = require("../models/shipper");

const { NotFoundError } = require("../errors/index");

const getUserInfo = async (req, res) => {
  const { userID, role } = req.user;
  switch (role) {
    case "customer":
      findUser(req, res, userID, Customer);
      return;
    case "vendor":
      findUser(req, res, userID, Vendor);
      return;
    case "shipper":
      findUser(req, res, userID, Shipper);
      return;
  }
};

const findUser = async (req, res, userID, model) => {
  const foundUser = await model.findById(userID);
  if (!foundUser) {
    throw new NotFoundError("User not found");
  }
  const { password, ...user } = foundUser._doc;
  return res.status(200).json({ user });
};

module.exports = { getUserInfo };
