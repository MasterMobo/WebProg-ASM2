// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978482, s3979081

const Hub = require("../models/distributionHub");

const getHubs = async (req, res) => {
  const hubs = await Hub.find({});
  return res.status(200).json({ hubs });
};

const getHubId = async (req, res) => {
  const hub = await Hub.findById(req.params.id);
  if (!hub) {
    throw new NotFoundError("Hub not found");
  }
  return res.status(200).json({ hub });
};

module.exports = { getHubs, getHubId };
