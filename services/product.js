const productsDao = require('../models/productDao');

//타입별 전체제품 조회 (잎차, 피라미드...)
const readProductType = async (name, type) => {
  return await productsDao.readProductType(name, type);
};

const readThreeDepth = async name => {
  return await productsDao.readThreeDepth(name);
};

const weeklyBest = async productSort => {
  const sort = orderBy(productSort);

  return await productsDao.weeklyBest(sort);
};

const productBest = async () => {
  return await productsDao.productBest();
};

const readTwoDepthCategory = async (id, page) => {
  return await productsDao.readTwoDepthCategory(id, page);
};

const threeDepthCategorySort = async (name, productSort, page) => {
  const sort = orderBy(productSort);

  return await productsDao.threeDepthCategorySort(name, sort, page);
};

const productTypeSort = async (name, type, productSort, page) => {
  const sort = orderBy(productSort);

  return await productsDao.productTypeSort(name, type, sort, page);
};

const orderBy = productSort => {
  const sortOrderBy = {
    review: 'ORDER BY reviewCount DESC',
    popular: 'ORDER BY likeCount DESC',
    newProduct: 'ORDER BY pr.created_at DESC',
    priceAsc:
      'ORDER BY CASE WHEN sale_price is null THEN price_origin ELSE sale_price END ASC',
    priceDesc:
      'ORDER BY CASE WHEN sale_price is null THEN price_origin ELSE sale_price END DESC',
  };

  if (productSort === 'review') {
    return sortOrderBy.review;
  } else if (productSort === 'popular') {
    return sortOrderBy.popular;
  } else if (productSort === 'new') {
    return sortOrderBy.newProduct;
  } else if (productSort === 'price-asc') {
    return sortOrderBy.priceAsc;
  } else if (productSort === 'price-desc') {
    return sortOrderBy.priceDesc;
  } else return null;
};

module.exports = {
  readProductType,
  readThreeDepth,
  weeklyBest,
  productBest,
  readTwoDepthCategory,
  threeDepthCategorySort,
  productTypeSort,
};
