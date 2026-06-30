// Products Controller
const Products = require("../models/productsSchema");

// Get all products
const getProducts = async (req, res) => {
  try {
    const product = await Products.find();
    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Products data retrieved",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search product
const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required",
      });
    }

    const products = await Products.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
        { modelName: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getProducts, searchProduct };
