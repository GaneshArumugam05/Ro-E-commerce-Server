// Products Route
const express = require("express");
const router = express.Router();

const { getProducts, searchProduct } = require("../controllers/productsController");

router.get("/", getProducts);

module.exports = router;
