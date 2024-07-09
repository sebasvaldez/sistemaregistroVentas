import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const categoryFound = await Category.findOne({ category });
    if (categoryFound) return res.status(400).json(["Category already exists"]);
    const newCategory = new Category({ category });
    const categorySaved = await newCategory.save();
    res.json(categorySaved);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);

    res.status(204).json(["Category deleted"]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
