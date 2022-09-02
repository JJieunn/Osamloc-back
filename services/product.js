const productsDao = require('../models/product');

//위클리 베스트
/* const weeklyBest = async (orderDate) => {
  return await productsDao.weeklyBest(orderDate);
}; */

/* const readProducts = async () => {
  return await productsDao.readProducts();
};
 */
//카테고리별 제품 조회
const readCategory = async categoryId => {
  return await productsDao.readCategory(categoryId);
};

//타입별 제품 조회 (잎차, 피라미드...)
const readProductType = async (categoryId, typeId) => {
  return await productsDao.readProductType(categoryId, typeId);
};

//리뷰순
const reviewSort = async (categoryId, typeId) => {
  return await productsDao.reviewSort(categoryId, typeId);
};

//판매순
/* const sortPurchase = async () => {
  return await productsDao.sortPurchase();
}; */

//신상품순
const newProductSort = async categoryId => {
  return await productsDao.newProductSort(categoryId);
};

//낮은 가격순
const priceAscSort = async categoryId => {
  return await productsDao.priceAscSort(categoryId);
};

//높은 가격순
const priceDescSort = async categoryId => {
  return await productsDao.priceDescSort(categoryId);
};

module.exports = {
  readCategory,
  readProductType,
  reviewSort,
  newProductSort,
  priceAscSort,
  priceDescSort,
};

// reviewSort,
// sortPurchase,
// weeklyBest,
