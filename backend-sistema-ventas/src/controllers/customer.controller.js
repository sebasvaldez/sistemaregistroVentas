import Customer from "../models/customer.model.js";

export const createCustomer = async (req, res) => {
  const { name, email, phone, address, dni } = req.body;
  try {
    const customerFound = await Customer.findOne({ dni });
    if (customerFound) return res.status(400).json(["Customer already exists"]);
    const newCustomer = new Customer({ name, email, phone, address, dni });
    const customerSaved = await newCustomer.save();
    res.json(customerSaved);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await Customer.findByIdAndDelete(id);
    res.status(204).json(["Customer deleted"]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, dni } = req.body;
  try {
    const customerUpdated = await Customer.findByIdAndUpdate(
      id,
      { name, email, phone, address, dni },
      { new: true }
    );
    res.json(customerUpdated);
  } catch (error) {
    return res.status(500).json(["Customer not found"]);
  }
};