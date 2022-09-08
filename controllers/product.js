const productsService = require('../services/product');

//타입별 제품 조회
const readProductType = async (req, res) => {
  try {
    const { name, type } = req.query;
    const products = await productsService.readProductType(name, type);
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//3depth 전체제품 조회
const readThreeDepth = async (req, res) => {
  const { name } = req.query;
  try {
    const categoryProducts = await productsService.readThreeDepth(name);
    res.status(200).json({ data: categoryProducts });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//위클리 베스트
const weeklyBest = async (req, res) => {
  try {
    const products = await productsService.weeklyBest();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//위클리 베스트 + 리뷰순
const weeklyBestSort = async (req, res) => {
  try {
    const products = await productsService.weeklyBestSort();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//베스트
const productBest = async (req, res) => {
  try {
    const products = await productsService.productBest();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//2depth 제품 조회
const readTwoDepthCategory = async (req, res) => {
  const { id, page } = req.query;
  try {
    const categoryProducts = await productsService.readTwoDepthCategory(
      id,
      page
    );
    res.status(200).json({ data: categoryProducts });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//3depth 제품 조회
const readThreeDepthReview = async (req, res) => {
  const { name, page } = req.query;
  try {
    const categoryProducts = await productsService.readThreeDepthReview(
      name,
      page
    );
    res.status(200).json({ data: categoryProducts });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

const readThreeDepthPopular = async (req, res) => {
  const { name, page } = req.query;
  try {
    const sort = await productsService.readThreeDepthPopular(name, page);
    res.status(200).json({ data: sort });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

const readThreeDepthNewProduct = async (req, res) => {
  const { name, page } = req.query;
  try {
    const sort = await productsService.readThreeDepthNewProduct(name, page);
    res.status(200).json({ data: sort });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

const readThreeDepthPriceAsc = async (req, res) => {
  const { name, page } = req.query;
  try {
    const sort = await productsService.readThreeDepthPriceAsc(name, page);
    res.status(200).json({ data: sort });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

const readThreeDepthPriceDesc = async (req, res) => {
  const { name, page } = req.query;
  try {
    const sort = await productsService.readThreeDepthPriceDesc(name, page);
    res.status(200).json({ data: sort });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//3depth + type + (sort)
const reviewSort = async (req, res) => {
  const { name, type, page } = req.query;
  try {
    const sort = await productsService.reviewSort(name, type, page);
    res.status(200).json({ data: sort });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

const popularSort = async (req, res) => {
  const { name, type, page } = req.query;
  try {
    const sort = await productsService.popularSort(name, type, page);
    res.status(200).json({ data: sort });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

const newProductSort = async (req, res) => {
  const { name, type, page } = req.query;
  try {
    const sort = await productsService.newProductSort(name, type, page);
    res.status(200).json({ data: sort });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

const priceAscSort = async (req, res) => {
  const { name, type, page } = req.query;
  try {
    const sort = await productsService.priceAscSort(name, type, page);
    res.status(200).json({ data: sort });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

const priceDescSort = async (req, res) => {
  const { name, type, page } = req.query;
  try {
    const sort = await productsService.priceDescSort(name, type, page);
    res.status(200).json({ data: sort });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
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
