const getUserAbout = async (req, res) => {
    res.send("<h1>About User</h1>");
};

const getUserHome = async (req, res) => {
    res.send("<h1>Home User</h1>");
};

module.exports = { getUserAbout, getUserHome };
