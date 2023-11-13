const express = require("express");
const productController = require("../controllers/products");
const router = express.Router();

router.get("/products", productController.getAllProducts);
router.get("/product/:prodId", productController.getProduct);

router.post("/add-product",productController.postAddProduct);

router.post("/product/buy", productController.buyProduct);

module.exports = router;
