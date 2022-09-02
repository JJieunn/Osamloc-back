const express = require('express');
const productsController = require('../controllers/product');

const router = express.Router();

//위클리 베스트
// router.get("/:orderDate", productsController.weeklyBest);

//카테고리별 제품 조회
//JSON.parse() 적용해야함
router.get('', productsController.readCategory);
// router.get("", categoryController.readProducts);

//타입별 제품 조회
router.get('/type', productsController.readProductType);

//리뷰순
router.get('/review', productsController.reviewSort);

//판매순
// router.get("/popular", productsController.sortPurchase);

//신상품순
router.get('/new', productsController.newProductSort);

//낮은 가격순
router.get('/price/asc', productsController.priceAscSort);

//높은 가격순
router.get('/price/desc', productsController.priceDescSort);

module.exports = router;
