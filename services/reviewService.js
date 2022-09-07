const reviewDao = require("../models/reviewDao")
const getDetailDao = require("../models/getDetailDao")


// 리뷰 작성
const createReviewService = async (userId, productId, content, imgUrl, rate) => {
  // 구매자 한정
  const isUserOrderProduct = await reviewDao.getOrderStatusByUserId(userId, productId)
  console.log(isUserOrderProduct["count"])
  if(Number(isUserOrderProduct["count"]) === 0 || Number(isUserOrderProduct["count"]) === NaN) {
    const error = new Error("NO_PURCHASE_PRODUCT")
    error.statusCode = 400
    throw error;
  }

  // 유저는 한 제품당 1개의 리뷰만
  const isUserReviewExisted = await reviewDao.getReviewByUserId(userId, productId)
  if(isUserReviewExisted) {
    const error = new Error("REVIEW_ALREADY_EXISTED")
    error.statusCode = 400
    throw error;
  }

  await reviewDao.createReview(userId, productId, content, imgUrl, rate);
  const newReviewList = getDetailDao.getReviewListInDetail(productId);

  return newReviewList;
}


// 리뷰 수정
const updateReviewService = async (userId, reviewId, productId, newImgUrl, newContent, newRate) => {
  const isReviewExisted = await reviewDao.getReviewByReviewId(reviewId, productId)
  console.log(isReviewExisted)
  if(!isReviewExisted) {
    const error = new Error("REVIEW_NOT_EXIST")
    error.statusCode = 400
    throw error;
  }

  const isUserOrderProduct = await reviewDao.getOrderStatusByUserId(userId, productId)
  if(isUserOrderProduct < 1) {
    const error = new Error("NO_PURCHASE_PRODUCT")
    error.statusCode = 400
    throw error;
  }

console.log("contents : ", newContent, "img : ", newImgUrl, "rate : ", newRate)
  if(newContent !== undefined) {
    await reviewDao.updateReviewContent(reviewId, productId, newContent)
  }
  if(newImgUrl !== undefined) {
    await reviewDao.updateReviewImgUrl(reviewId, productId, newImgUrl)
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
    const error = new Error("REVIEW_NOT_EXIST")
    error.statusCode = 400
    throw error;
  }

  /*
  const isUserOrderProduct = await reviewDao.getOrderStatusByUserId(userId, productId)

  if(isUserOrderProduct < 1) {
    const error = new Error("구매 안함")
    error.statusCode = 400
    throw error;
  }
  */
  
  // 삭제
  await reviewDao.deleteReview(reviewId, productId)
  // 목록 새로고침
  const newReviewList = getDetailDao.getReviewListInDetail(productId)

  return newReviewList;
}



module.exports = {
  createReviewService,
  updateReviewService,
  deleteReviewService
}