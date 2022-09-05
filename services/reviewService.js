const reviewDao = require("../models/reviewDao")
const getDetailDao = require("../models/getDetailDao")


// 리뷰 작성
const createReviewService = async (userId, productId, contents, image_url, rate) => {
  await reviewDao.createReview(userId, productId, contents, image_url, rate);
  const newReviewList = getDetailDao.getReviewListInDetail(productId)

  return newReviewList;
}


// 리뷰 수정
const updateReviewService = async (userId, reviewId, productId, newContents, newRate) => {
  const isReviewExisted = await reviewDao.getReviewByReviewId(reviewId)

  if(!isReviewExisted) {
    const err = new Error("REVIEW_NON_EXISTED")
    err.statusCode = 400
    throw err;
  }

  const updateReview = await reviewDao.updateReview(reviewId, productId, newContents, newRate)
  const newReviewList = getDetailDao.getReviewListInDetail(productId)

  return newReviewList;
}

// 리뷰 삭제
const deleteReviewService = async (userId, reviewId, productId) => {
  // 리뷰 유무 확인
  const isReviewExisted = await reviewDao.getReviewByReviewId(reviewId)

  if(!isReviewExisted) {
    const err = new Error("REVIEW_NON_EXISTED")
    err.statusCode = 400
    throw err;
  }
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