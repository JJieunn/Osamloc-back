const reviewService = require("../services/reviewService")


// 리뷰 생성
// foundUser = id, account, password
const createReviewController = async (req, res) => {
  const { id } = req.foundUser // user_id
  const productId = Number(req.params.id)
  const { contents, image_url, rate } = req.body

  if(!id) {
    res.status(400).json({ err: "NEED_LOG_IN" })
  }

  if(!(contents && rate)) {
    res.status(400).json({ err: "INPUT_ERROR" })
  }

  try{
    // console.log("id : ", id, "product_id : ", product_id, "contents : ", contents)
    const reviews = await reviewService.createReviewService(id, productId, contents, image_url, rate);
    res.status(200).json({ message: "REVIEW_CREATED", reviews })
  } catch (err) {
    console.log(err)
    res.status( err.statusCode || 500 ).json({ err: err.message })
  }
}


// 리뷰 수정
const updateReviewController = async (req, res) => {
  const { id } = req.foundUser
  // reviewId는 어디로? body? params?
  const reviewId = Number(req.query.r_id)
  console.log(reviewId)
  // 상세 페이지에서 수정 요청을 하는데 productId가 필요한가?
  const productId = Number(req.params.id)
  const { rate, contents, image_url } = req.body
  
  /*
  // key에 들어온 값 구별
  const requireKey = ['rate', 'newContents', 'image_url']
  const hasKey = {rate: false, newContents: false, image_url: false}
  Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if(requireKey.includes(key) && value) {
      hasKey[key] = true;
    }
  })

  const hasKeyArray = Object.entries(hasKey);
  for(let i = 0; i<hasKeyArray.length; i++) {
  const [key, value] = hasKeyArray[i]
  if(value) {
    console.log(value)
  }
}
*/
try{
    const reviewList = await reviewService.updateReviewService(id, reviewId, productId, image_url, contents, rate)
    res.status(200).json({ message: "REVIEW_UPDATED", reviewList })
  } catch (err) {
    console.log(err)
    res.status( err.statusCode || 500 ).json({ err: err.message })
  }
}


// 리뷰 삭제
const deleteReviewController = async (req, res) => {
  const { id } = req.foundUser
  // r_id를 쿼리로 받을건지 body에 받을건지
  const reviewId = Number(req.query.r_id)
  const productId = Number(req.params.id)


  if(!id) {
    res.status(400).json({ err: "NEED_LOG_IN" })
  }

  if(!(reviewId && productId)) {
    res.status(400).json({ err: "REQUEST_ERROR" }) // 에러 메세지 변경하기
  }

  try{
    const reviewList = await reviewService.deleteReviewService(id, reviewId, productId)
    res.status(200).json({ message: "REVIEW_DELETED", reviewList })
  } catch (err) {
    console.log(err)
    res.status( err.statusCode || 500 ).json({ err: err.message })
  }
}



module.exports = {
  createReviewController,
  updateReviewController,
  deleteReviewController
}