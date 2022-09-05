const express = require('express');
// const isValidateToken = require("../middlewares/authorization")
const productsController = require('../controllers/product');
const getDetailController = require("../controllers/getDetailController")

const router = express.Router();

//위클리 베스트
router.get('/best/weekly', productsController.weeklyBest);

// router.get('', productsController.readProducts);
router.get('', productsController.readTwoDepthCategory);
router.get('/category', productsController.readCategory);
router.get('/category/type', productsController.readProductType);
router.get('/category/type/review', productsController.reviewSort);
router.get('/category/type/new', productsController.newProductSort);
router.get('/category/type/price/asc', productsController.priceAscSort);
router.get('/category/type/price/desc', productsController.priceDescSort);
router.get('/category/type/popular', productsController.popularSort);

//제품 상세 페이지
// isValidateToken.validateToken,
router.get("/item/:id", getDetailController.productDetails)

module.exports = router;
