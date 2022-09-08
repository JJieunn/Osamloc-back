const productsDao = require('../models/productDao');

//타입별 전체제품 조회 (잎차, 피라미드...)
const readProductType = async (name, type) => {
  return await productsDao.readProductType(name, type);
};

const readThreeDepth = async name => {
  return await productsDao.readThreeDepth(name);
};

const weeklyBest = async () => {
  return await productsDao.weeklyBest();
};

const weeklyBestSort = async () => {
  return await productsDao.weeklyBestSort();
};

const productBest = async () => {
  return await productsDao.productBest();
};

const readTwoDepthCategory = async (id, page) => {
  return await productsDao.readTwoDepthCategory(id, page);
};

const readThreeDepthReview = async (name, page) => {
  return await productsDao.readThreeDepthReview(name, page);
};

const readThreeDepthPopular = async (name, page) => {
  return await productsDao.readThreeDepthPopular(name, page);
};

const readThreeDepthNewProduct = async (name, page) => {
  return await productsDao.readThreeDepthNewProduct(name, page);
};

const readThreeDepthPriceAsc = async (name, page) => {
  return await productsDao.readThreeDepthPriceAsc(name, page);
};

const readThreeDepthPriceDesc = async (name, page) => {
  return await productsDao.readThreeDepthPriceDesc(name, page);
};

const reviewSort = async (name, type, page) => {
  return await productsDao.reviewSort(name, type, page);
};

const popularSort = async (name, type, page) => {
  return await productsDao.popularSort(name, type, page);
};

const newProductSort = async (name, type, page) => {
  return await productsDao.newProductSort(name, type, page);
};

const priceAscSort = async (name, type, page) => {
  return await productsDao.priceAscSort(name, type, page);
};

const priceDescSort = async (name, type, page) => {
  return await productsDao.priceDescSort(name, type, page);
};

module.exports = {
  readProductType,
  readThreeDepth,
  weeklyBest,
  weeklyBestSort,
  productBest,
  readTwoDepthCategory,
  readThreeDepthReview,
  readThreeDepthPopular,
  readThreeDepthNewProduct,
  readThreeDepthPriceAsc,
  readThreeDepthPriceDesc,
  reviewSort,
  popularSort,
  newProductSort,
  priceAscSort,
  priceDescSort,
};

// reviewSort,
// sortPurchase,
// weeklyBest,
