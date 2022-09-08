const express = require('express');
const isValidateToken = require('../middlewares/authorization');
const cartOrderController = require('../controllers/cartOrder');

const router = express.Router();

router.post('', isValidateToken.validateToken, cartOrderController.createCart);
router.get('', isValidateToken.validateToken, cartOrderController.readUserCart);

router.patch(
  '/order/address',
  isValidateToken.validateToken,
  cartOrderController.cartOrderAddAddress
);

router.get(
  '/address',
  isValidateToken.validateToken,
  cartOrderController.getAddress
);
router.patch(
  '/order',
  isValidateToken.validateToken,
  cartOrderController.cartOrder
);
router.patch('', isValidateToken.validateToken, cartOrderController.editCart);
router.delete(
  '/:cartId',
  isValidateToken.validateToken,
  cartOrderController.deleteCart
);

module.exports = router;
