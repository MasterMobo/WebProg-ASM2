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
