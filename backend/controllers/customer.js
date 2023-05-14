const Customer =require ("../models/customer");

const getCustomers = async (req, res) => {
    const customers =await Customer.find({});
    const customersWithoutPassword = customers.map((customer) => {
        const { password, ...customerWithoutPassword } = customer._doc;
        return customerWithoutPassword;
    });
    res.status(200).json({ customersWithoutPassword});
    }

const getCustomerId = async (req, res) => {
    const customer = await Customer.findById(req.params.id);
        
    if (!customer) {
        throw new NotFoundError("Customer not found");
    }
    const { password, ...customerWithoutPassword } = customer._doc;
    res.status(200).json({ customerWithoutPassword });
    }
module.exports = { getCustomers, getCustomerId};