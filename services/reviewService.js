const reviewDao = require("../models/reviewDao")
const getDetailDao = require("../models/getDetailDao")


// 리뷰 작성
const createReviewService = async (userId, productId, contents, image_url, rate) => {
  // 구매자 한정
  const isUserOrderProduct = await reviewDao.getOrderStatusByUserId(userId, productId)
  console.log(isUserOrderProduct["count"])
  if(Number(isUserOrderProduct["count"]) < 1) {
    const err = new Error("NO_PURCHASE_PRODUCT")
    err.statusCode = 400
    throw err;
  }

  await reviewDao.createReview(userId, productId, contents, image_url, rate);
  const newReviewList = getDetailDao.getReviewListInDetail(productId);

  return newReviewList;
}


// 리뷰 수정
const updateReviewService = async (userId, reviewId, productId, newImage_url, newContents, newRate) => {
  const isReviewExisted = await reviewDao.getReviewByReviewId(reviewId, productId)
  console.log(isReviewExisted)
  if(!isReviewExisted) {
    const err = new Error("REVIEW_NON_EXISTED")
    err.statusCode = 400
    throw err;
  }

  const isUserOrderProduct = await reviewDao.getOrderStatusByUserId(userId, productId)
  if(isUserOrderProduct < 1) {
    const err = new Error("구매 안함")
    err.statusCode = 400
    throw err;
  }
console.log("contents : ", newContents, "img : ", newImage_url, "rate : ", newRate)
  if(newContents !== undefined) {
    await reviewDao.updateReviewContents(reviewId, productId, newContents)
  }
  if(newImage_url !== undefined) {
    await reviewDao.updateReviewImgUrl(reviewId, productId, newImage_url)
  }
  if(newRate !== undefined) {
    await reviewDao.updateReviewRate(reviewId, productId, newRate)
  }

  // await reviewDao.updateReview(reviewId, productId, newImage_url, newContents, newRate)
  const newReviewList = getDetailDao.getReviewListInDetail(productId)

  return newReviewList;
}



// 리뷰 삭제
const deleteReviewService = async (userId, reviewId, productId) => {
  // 리뷰 유무 확인
  const isReviewExisted = await reviewDao.getReviewByReviewId(reviewId, productId)

  if(!isReviewExisted) {
    const err = new Error("REVIEW_NON_EXISTED")
    err.statusCode = 400
    throw err;
  }

  /*
  const isUserOrderProduct = await reviewDao.getOrderStatusByUserId(userId, productId)

  if(isUserOrderProduct < 1) {
    const err = new Error("구매 안함")
    err.statusCode = 400
    throw err;
  }
  */
  
  // 삭제
  await reviewDao.deleteReview(reviewId)
  // 목록 새로고침
  const newReviewList = getDetailDao.getReviewListInDetail(productId)

  return newReviewList;
}



module.exports = {
  createReviewService,
  updateReviewService,
  deleteReviewService
}