const getDetailDao = require("../models/getDetailDao")

const productDetails = async (productId) => {

  // 제품 유무 확인
  const isProductExisted = await getDetailDao.getProductIdById(productId)
  if(!isProductExisted) {
    const err = new Error("NON_PRODUCT_EXISTED")
    err.statusCode = 404 // 존재하지 않는 제품 페이지 요청
    throw err;
  }

  const details = await getDetailDao.getDetailById(productId)

  if(!details) {
    const err = new Error("GET_DETAIL_PAGE_ERROR")
    err.statusCode = 500
    throw err;
  }

  // string으로 가져온 값들 number로 변환
  details["price_origin"] = Number(details["price_origin"])*1000;
  details["sale_price"] = Number(details["sale_price"])*1000;  // Null => 0
  
  // 상세 페이지 이미지 json으로 변환
  details["detailImgs"] = JSON.parse(details["detailImgs"])

  // 부모 카레고리 숫자 > 이름으로 데이터 변환
  const parentCategoryId = details["parentCategory"]
  const parentCategoryName = await getDetailDao.getCategoryName(parentCategoryId)
  details["parentCategory"] = parentCategoryName["name"]


  // 상세 페이지 리뷰 리스트
  const reviewRes = await getDetailDao.getReviewListInDetail(productId)
  const reviewAllCount = await getDetailDao.getNumberOfReviews(productId)
  
  const star = [];
  let average = 0;
  for(let i = 0;i<reviewRes.length;i++){
    star.push(reviewRes[i]["rate"])
    average += star[i]
  }
  average = (average / star.length).toFixed(1)
  

  details["reviews"] = reviewRes
  details["reviewAllCount"] = reviewAllCount["count(id)"]
  details["imgReviewCount"] = reviewAllCount["count(image_url)"]
  details["rateAverage"] = average

  // 상품 추가 옵션
  const optionRes = await getDetailDao.getProductOptions(productId)
  details["options"] = JSON.parse(optionRes["JSON_ARRAYAGG(p.name)"])

  return details;
}


module.exports = { productDetails }