const login = async (req, res) => {
    const { role, username, password } = req.body;

    switch (role) {
        case "vendor":
            // check database
            return;
        case "customer":
            // check database
            return;
        case "shipper":
            // check database
            return;
    }

    res.status(400).json({ message: "Invalid role" });
};

const register = async (req, res) => {
    const { role } = req.body;
    switch (role) {
        case "vendor":
            registerVendor(req, res);
            return;
        case "customer":
            registerCustomer(req, res);
            return;
        case "shipper":
            registerShipper(req, res);
            return;
    }

    res.status(400).json({ message: "Invalid role" });
};

const registerVendor = async (req, res) => {
    res.send("Register Vendor");
};

const registerCustomer = async (req, res) => {
    res.send("Register Customer");
};

const registerShipper = async (req, res) => {
    res.send("Register Shipper");
};

module.exports = { login, register };
