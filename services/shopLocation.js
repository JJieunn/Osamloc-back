const shopLocationDao = require('../models/shopLocation');

const getStore = async page => {
  return await shopLocationDao.getStore(page);
};

const getStoreCategory = async (category, page) => {
  return await shopLocationDao.getStoreCategory(category, page);
};

module.exports = {
  getStore,
  getStoreCategory,
};
