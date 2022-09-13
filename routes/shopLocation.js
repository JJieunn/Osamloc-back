const express = require('express');

const shopLocationController = require('../controllers/shopLocation');

const router = express.Router();

router.get('', shopLocationController.getStore);
router.get('/:category', shopLocationController.getStoreCategory);

module.exports = router;
