const reviewService = require("../services/reviewService")


// 리뷰 생성
// foundUser = id, account, password
const createReviewController = async (req, res) => {
  const { id } = req.foundUser // user_id
  const productId = Number(req.params.id)
  const { content, image_url, rate } = req.body

  console.log("found : ", req.foundUser)
  if(!id) {
    res.status(401).json({ error: "NEED_LOGIN" })
  }

  if(!(content && rate)) {
    res.status(400).json({ error: "INPUT_ERROR" })
  }

  // 길이 에러가 리뷰 존재한다보다 먼저? 나중?
  if(content.length > 60) {
    res.status(400).json({ error: "CONTENTS_TOO_LONG" })
  }

  try{
    // console.log("id : ", id, "product_id : ", product_id, "contents : ", contents)
    const reviews = await reviewService.createReviewService(id, productId, content, image_url, rate);
    res.status(200).json({ message: "REVIEW_CREATED", reviews })
  } catch (error) {
    console.log(error)
    res.status( error.statusCode || 500 ).json({ error: error.message })
  }
}


// 리뷰 수정
const updateReviewController = async (req, res) => {
  const { id } = req.foundUser
  // reviewId는 어디로? body? params? 어떻게 백으로 전달?
  const reviewId = Number(req.query.r_id)
  console.log(reviewId)
  // 상세 페이지에서 수정 요청을 하는데 productId가 필요한가?
  const productId = Number(req.params.id)
  const { rate, content, image_url } = req.body
  

  if(!id) { // code 확인
    res.status(401).json({ error: "NEED_LOGIN" })
  }
  
  if(!image_url && !content && !rate) {
    res.status(400).json({ error: "INPUT_ERROR" })
    }
  
  if(content !== undefined && content.length > 60) {
    res.status(400).json({ error: "CONTENTS_TOO_LONG" })
  }

try{
    const reviewList = await reviewService.updateReviewService(id, reviewId, productId, image_url, content, rate)
    res.status(200).json({ message: "REVIEW_UPDATED", reviewList })
  } catch (error) {
    console.log(error)
    res.status( error.statusCode || 500 ).json({ error: error.message })
  }
}


// 리뷰 삭제
const deleteReviewController = async (req, res) => {
  const { id } = req.foundUser
  // r_id를 쿼리로 받을건지 body에 받을건지
  const reviewId = Number(req.query.r_id)
  const productId = Number(req.params.id)


  if(!id) {
    res.status(401).json({ error: "NEED_LOGIN" })
  }

  if(!(reviewId && productId)) {
    res.status(400).json({ error: "REQUEST_ERROR" }) // 에러 메세지 변경하기
  }

  try{
    const reviewList = await reviewService.deleteReviewService(id, reviewId, productId)
    res.status(200).json({ message: "REVIEW_DELETED", reviewList })
  } catch (error) {
    console.log(error)
    res.status( error.statusCode || 500 ).json({ error: error.message })
  }
}



module.exports = {
  createReviewController,
  updateReviewController,
  deleteReviewController
}