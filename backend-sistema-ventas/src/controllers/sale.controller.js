import Sale from "../models/sale.model.js";

export const getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    res.json(sale);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getsales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const createSale = async (req, res) => {
  const { user, client, products, total } = req.body;
  try {
    const newSale = new Sale({
      user,
      client,
      products,
      total,
    });
    const saleSaved = await newSale.save();
    res.json(saleSaved);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};