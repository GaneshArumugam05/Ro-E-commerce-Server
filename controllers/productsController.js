// Products Controller
const Products = require("../models/productsSchema");

// Get all products ------------------------------------------------------------------------------- /
const getProducts = async (req, res) => {
  try {
    const {
      keyword,
      brand,
      minPrice,
      maxPrice,
      sort,
      page,
      limit,
    } = req.query;

    const currentPage = Number(page) || 1;
    const perPage = Number(limit) || 10;
    const skip = (currentPage - 1) * perPage;

    const query = {};

    if (brand) {
      query.brand = brand;
    }

    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    const sortOption = {};

    switch (sort) {
      case "price_asc":
        sortOption.price = 1;
        break;

      case "price_desc":
        sortOption.price = -1;
        break;

      default:
        sortOption.createdAt = -1;
    }

    const product = await Products.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    const totalProducts = await Products.countDocuments(query);
    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products data retrieved",
      totalProducts: totalProducts,
      currentPage,
      perPage,
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
