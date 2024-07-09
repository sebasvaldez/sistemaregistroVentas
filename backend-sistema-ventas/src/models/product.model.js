import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  screen: {
    size: String,
    resolution: String,
    type: {
      type: String,
    },
  },
  mainCamera: {
    resolution: String,
    features: Array,
  },
  processor: String,
  memory: {
    ram: String,
    storage: String,
  },
  battery: {
    capacity: String,
    fastCharging: String,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);