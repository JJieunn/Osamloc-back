const express = require('express');

const usersRouter = require('./usersRouter');
const productsRouter = require('./product');

const router = express.Router();

router.get(("/ping"), (_, res) => {res.send("pong")})

router.use("/users", usersRouter);
router.use('/products', productsRouter);

module.exports = router;
