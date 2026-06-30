// Products Controller
const Products = require("../models/productsSchema");

// Get all products
const getProducts = async (req, res) => {
  try {
    const product = await Products.find();
    const prod = await product.countDocument();
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

module.exports = { getProducts };
