const userNameCheck = async (username) => {
    // Check if username is already taken in the whole system
    const customerExists = await Customer.findOne({ username });
    if (customerExists) {
        return false;
    }
};

const registerRole = async (req, res, schema) => {
    const newUser = await schema.create(req.body);
    res.status(201).json({ newUser });
};

const loginRole = async (req, res, schema) => {
    const { username } = req.body;

    const foundCustomer = await schema.findOne({ username });
    if (!foundCustomer) {
        return res.status(404).json({ message: "Username not found" });
    }

    const { password } = req.body;
    const passwordMatch = await foundCustomer.comparePassword(password);

    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
    }
    return res.status(200).json({ message: "Login success" });
};

module.exports = { userNameCheck, loginRole, registerRole };
