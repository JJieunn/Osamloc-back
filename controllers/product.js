const productsService = require('../services/product');

//위클리 베스트
/* const weeklyBest = async (orderDate) => {
  const { orderDate } = req.params;
  const products = await productsService.weeklyBest(orderDate);
  res.status(200).json({ data: products });
}; */

/* const readProducts = async (req, res) => {
  try {
    const products = await productsService.readProducts();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(404).json({ message: "ERROR" });
  }
}; */

//카테고리별 제품 조회
const readCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const categoryProducts = await productsService.readCategory(categoryId);
    res.status(200).json({ data: categoryProducts });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//타입별 제품 조회 (잎차, 피라미드...)
const readProductType = async (req, res) => {
  try {
    const { categoryId, typeId } = req.query;
    const products = await productsService.readProductType(categoryId, typeId);
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//리뷰순
const reviewSort = async (req, res) => {
  try {
    const { categoryId, typeId } = req.query;
    const sort = await productsService.reviewSort(categoryId, typeId);
    res.status(200).json({ data: sort });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//판매순
/* const sortPurchase = async () => {
  const sort = await productsService.sortPurchase();
  res.status(200).json({ data: sort });
}; */

//신상품순
const newProductSort = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const sort = await productsService.newProductSort(categoryId);
    res.status(200).json({ data: sort });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//낮은 가격순
const priceAscSort = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const sort = await productsService.priceAscSort(categoryId);
    res.status(200).json({ data: sort });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//높은 가격순
const priceDescSort = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const sort = await productsService.priceDescSort(categoryId);
    res.status(200).json({ data: sort });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
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
