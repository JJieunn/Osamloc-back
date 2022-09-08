const express = require('express');

const usersRouter = require('./usersRouter');
const productsRouter = require('./product');
const cartRouter = require('./cartOrder');

const router = express.Router();

router.get('/ping', (_, res) => {
  res.send('pong');
});

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/cart', cartRouter);

module.exports = router;
