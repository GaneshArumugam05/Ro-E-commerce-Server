// Products Route
const express = require("express");
const router = express.Router();

const { getProducts, searchProduct } = require("../controllers/productsController");

router.get("/", getProducts);
router.get("/search", searchProduct);

module.exports = router;
