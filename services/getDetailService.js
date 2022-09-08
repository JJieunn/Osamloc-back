const getDetailDao = require('../models/getDetailDao');

const productDetails = async productId => {
  // 제품 유무 확인
  const isProductExisted = await getDetailDao.getProductIdById(productId);
  if (!isProductExisted) {
    const error = new Error('PRODUCT_NOT_EXIST');
    error.statusCode = 404; // 존재하지 않는 제품 페이지 요청
    throw error;
  }

  const details = await getDetailDao.getDetailById(productId);

  if (!details) {
    const error = new Error('GET_DETAIL_PAGE_ERROR');
    error.statusCode = 500;
    throw error;
  }

  // string으로 가져온 값들 number로 변환
  details['price_origin'] = Number(details['price_origin']) * 1000;
  details['sale_price'] = Number(details['sale_price']) * 1000; // Null => 0

  // 상세 페이지 이미지 json으로 변환
  details['detailImgs'] = JSON.parse(details['detailImgs']);

  // 부모 카레고리 숫자 > 이름으로 데이터 변환
  const parentCategoryId = details['parentCategory'];
  const parentCategoryName = await getDetailDao.getCategoryName(
    parentCategoryId
  );
  details['parentCategory'] = parentCategoryName['name'];

  // 상세 페이지 리뷰 리스트
  const reviewRes = await getDetailDao.getReviewListInDetail(productId);
  const reviewAllCount = await getDetailDao.getNumberOfReviews(productId);

  // 상세 페이지 별점
  const star = [];
  let average = 0;
  for (let i = 0; i < reviewRes.length; i++) {
    star.push(reviewRes[i]['rate']);
    average += star[i];
  }
  average = (average / star.length).toFixed(1);

  details['reviews'] = reviewRes;
  details['reviewAllCount'] = reviewAllCount['count(id)'];
  details['imgReviewCount'] = reviewAllCount['count(image_url)'];
  details['rateAverage'] = average;

  // 상품 추가 옵션
  // 반올림하지 않은 정확한 값을 위해 convert, cast 사용 안 함
  const optionList = await getDetailDao.getOptionListsById(productId);
  const options = [];

  optionList.map(option => {
    option['price_origin'] = Number(option['price_origin']) * 1000;
    option['sale_price'] = Number(option['sale_price']) * 1000;

    option['view'] = false;
    options.push(option);
  });
  details['options'] = options;

  return details;
};

module.exports = { productDetails };
