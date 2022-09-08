const reviewService = require("../services/reviewService")


// 리뷰 생성
// foundUser = id, account, password
const createReviewController = async (req, res) => {
  const { id } = req.foundUser // user_id
  const productId = req.params.id
  const { content, image_url, rate } = req.body

  console.log("found : ", req.foundUser)
  if(!id) {
    res.status(401).json({ error: "NEED_LOGIN" })
    return;
  }

  if(!(content && rate)) {
    res.status(400).json({ error: "INPUT_ERROR" })
    return;
  }

  try{
    // id = user_id
    if(id && productId && content && rate){
    const reviews = await reviewService.createReviewService(id, productId, content, image_url, rate);
    res.status(200).json({ message: "REVIEW_CREATED", reviews }) }
  } catch (error) {
    console.log(error)
    res.status( error.statusCode || 500 ).json({ error: error.message })
  }
}


// 리뷰 수정
const updateReviewController = async (req, res) => {
  const { id } = req.foundUser
  const productId = req.params.id
  const { rate, content, image_url } = req.body
  

  if(!id) {
    res.status(401).json({ error: "NEED_LOGIN" })
    return;
  }
  if(!image_url && !content && !rate) {
    res.status(400).json({ error: "INPUT_ERROR" })
    return;
    }
  if(content !== undefined && content.length > 60) {
    res.status(400).json({ error: "CONTENTS_TOO_LONG" })
    return;
  }

try{
    const reviewList = await reviewService.updateReviewService(id, productId, image_url, content, rate)
    res.status(200).json({ message: "REVIEW_UPDATED", reviewList })
  } catch (error) {
    console.log(error)
    res.status( error.statusCode || 500 ).json({ error: error.message })
  }
}


// 리뷰 삭제
const deleteReviewController = async (req, res) => {
  const { id } = req.foundUser
  const productId = req.params.id


  if(!id) {
    res.status(401).json({ error: "NEED_LOGIN" })
    return;
  }

  try{
    const reviewList = await reviewService.deleteReviewService(id, productId)
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