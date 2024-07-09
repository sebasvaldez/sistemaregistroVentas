import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  const {
    brand,
    model,
    screen,
    mainCamera,
    processor,
    memory,
    battery,
    image,
    stock,
    price,
  } = req.body;
  try {
    const productFound = await Product.findOne({ model });
    if (productFound) return res.status(400).json(["Product already exists"]);
    const newProduct = new Product({
      brand,
      model,
      screen,
      mainCamera,
      processor,
      memory,
      battery,
      image,
      stock,
      price,
    });
    const productSaved = await newProduct.save();
    res.json(productSaved);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json(["Product not found"]);
    res.json(product);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(204).json(["Product deleted"]);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    brand,
    model,
    screen,
    mainCamera,
    processor,
    memory,
    battery,
    image,
    stock,
    price,
  } = req.body;
  try {
    const productUpdated = await Product.findByIdAndUpdate(
      id,
      {
        brand,
        model,
        screen,
        mainCamera,
        processor,
        memory,
        battery,
        image,
        stock,
        price,
      },
      { new: true }
    );
    res.json(productUpdated);
  } catch (error) {
    return res.status(500).json(["Product not found"]);
  }
};