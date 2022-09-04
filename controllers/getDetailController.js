const getDetailService = require("../services/getDetailService")


const productDetails = async (req, res) => {
  const product = req.params;
  const productId = product.id;
  if(productId === ":id") {
    res.status(400).json({ err: "PARAMS_IN_REQUEST_ERROR" })
  }
  
  try{
    // 제품 상세 페이지
    const getDetail = await getDetailService.productDetails(productId);
    res.status(200).json({ data: getDetail })

  } catch (err) {
    console.log(err)
    res.status( err.statusCode || 500 ).json({ err: err.message })
  }

}


module.exports = { productDetails }