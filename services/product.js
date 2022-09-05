const productsDao = require('../models/productDao');

//위클리 베스트
const weeklyBest = async () => {
  return await productsDao.weeklyBest();
};

/* const readProducts = async () => {
  return await productsDao.readProducts();
}; */

//2depth 제품 조회
const readTwoDepthCategory = async (id, page) => {
  return await productsDao.readTwoDepthCategory(id, page);
};

//3depth 제품 조회
const readCategory = async (name, page) => {
  const products = await productsDao.readCategory(name, page);
  return products;
};

//타입별 제품 조회 (잎차, 피라미드...)
const readProductType = async (name, type) => {
  const products = await productsDao.readProductType(name, type);

  products.map(data => {
    data.products = JSON.parse(data.products);
  });

  return products;
};

//리뷰순
const reviewSort = async (name, type, page) => {
  return await productsDao.reviewSort(name, type, page);
};

//판매순
const popularSort = async (name, type, page) => {
  return await productsDao.popularSort(name, type, page);
};

//신상품순
const newProductSort = async (name, type, page) => {
  return await productsDao.newProductSort(name, type, page);
};

//낮은 가격순
const priceAscSort = async (name, type, page) => {
  return await productsDao.priceAscSort(name, type, page);
};

//높은 가격순
const priceDescSort = async (name, type, page) => {
  return await productsDao.priceDescSort(name, type, page);
};

module.exports = {
  weeklyBest,
  readTwoDepthCategory,
  readCategory,
  readProductType,
  reviewSort,
  popularSort,
  newProductSort,
  priceAscSort,
  priceDescSort,
};

// reviewSort,
// sortPurchase,
// weeklyBest,
