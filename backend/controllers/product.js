const getProductHome = async (req, res) => {
    res.send("<h1>Home Product</h1>");
};

const getProductAbout = async (req, res) => {
    res.send("<h1>About Product</h1>");
};

module.exports = { getProductHome, getProductAbout };