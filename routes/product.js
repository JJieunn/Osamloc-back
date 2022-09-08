const express = require('express');
// const isValidateToken = require('../middlewares/authorization');
const productsController = require('../controllers/product');
const getDetailController = require('../controllers/getDetailController');

const router = express.Router();

router.get('/category/type', productsController.readProductType);
router.get('/category', productsController.readThreeDepth);

router.get('/best/weekly', productsController.weeklyBest);
router.get('/best/weekly/review', productsController.weeklyBestSort);
router.get('/best', productsController.productBest);

router.get('', productsController.readTwoDepthCategory);
router.get('/category/review', productsController.readThreeDepthReview);
router.get('/category/popular', productsController.readThreeDepthPopular);
router.get('/category/new', productsController.readThreeDepthNewProduct);
router.get('/category/price/asc', productsController.readThreeDepthPriceAsc);
router.get('/category/price/desc', productsController.readThreeDepthPriceDesc);

router.get('/category/type/review', productsController.reviewSort);
router.get('/category/type/popular', productsController.popularSort);
router.get('/category/type/new', productsController.newProductSort);
router.get('/category/type/price/asc', productsController.priceAscSort);
router.get('/category/type/price/desc', productsController.priceDescSort);

//제품 상세 페이지
router.get('/item/:id', getDetailController.productDetails);

module.exports = router;
