const express = require('express');

const isValidateToken = require('../middlewares/authorization');
const productsController = require('../controllers/product');
const getDetailController = require('../controllers/getDetailController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.get('', productsController.readTwoDepthCategory);
router.get('/category', productsController.readThreeDepth);
router.get('/category/type', productsController.readProductType);

router.get('/category/sort', productsController.threeDepthCategorySort);
router.get('/category/type/sort', productsController.productTypeSort);

router.get('/best', productsController.productBest);
router.get('/best/weekly', productsController.weeklyBest);

//제품 상세 페이지
router.get('/item/:id', getDetailController.productDetails);
router.post(
  '/item/:id',
  isValidateToken.validateToken,
  reviewController.createReviewController
);
router.delete(
  '/item/:id',
  isValidateToken.validateToken,
  reviewController.deleteReviewController
);
router.patch(
  '/item/:id',
  isValidateToken.validateToken,
  reviewController.updateReviewController
);

module.exports = router;
