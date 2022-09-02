const express = require('express');

const userRouter = require('./user');
const productsRouter = require('./product');

const router = express.Router();

router.use(userRouter);
router.use('/products', productsRouter);

module.exports = router;
