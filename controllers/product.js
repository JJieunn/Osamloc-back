const productsService = require('../services/product');

//위클리 베스트
const weeklyBest = async (req, res) => {
  const products = await productsService.weeklyBest();
  res.status(200).json({ data: products });
};

/* const readProducts = async (req, res) => {
  try {
    const products = await productsService.readProducts();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
}; */

//2depth 제품 조회
const readTwoDepthCategory = async (req, res) => {
  try {
    const { id, page } = req.query;
    const categoryProducts = await productsService.readTwoDepthCategory(
      id,
      page
    );
    res.status(200).json({ data: categoryProducts });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//3depth 제품 조회
const readCategory = async (req, res) => {
  try {
    const { name, page } = req.query;
    const categoryProducts = await productsService.readCategory(name, page);
    res.status(200).json({ data: categoryProducts });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//타입별 제품 조회 (잎차, 피라미드...)
const readProductType = async (req, res) => {
  try {
    const { name, type } = req.query;
    const products = await productsService.readProductType(name, type);
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//리뷰순
const reviewSort = async (req, res) => {
  try {
    const { name, type, page } = req.query;
    const sort = await productsService.reviewSort(name, type, page);
    res.status(200).json({ data: sort });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//판매순
const popularSort = async (req, res) => {
  try {
    const { name, type, page } = req.query;
    const sort = await productsService.popularSort(name, type, page);
    res.status(200).json({ data: sort });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//신상품순
const newProductSort = async (req, res) => {
  try {
    const { name, type, page } = req.query;
    const sort = await productsService.newProductSort(name, type, page);
    res.status(200).json({ data: sort });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//낮은 가격순
const priceAscSort = async (req, res) => {
  try {
    const { name, type, page } = req.query;
    const sort = await productsService.priceAscSort(name, type, page);
    res.status(200).json({ data: sort });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//높은 가격순
const priceDescSort = async (req, res) => {
  try {
    const { name, type, page } = req.query;
    const sort = await productsService.priceDescSort(name, type, page);
    res.status(200).json({ data: sort });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
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
