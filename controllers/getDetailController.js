const getDetailService = require("../services/getDetailService")


const productDetails = async (req, res) => {
  const product = req.params;
  const productId = product.id;
  if(productId === ":id") {
    res.status(404).json({ error: "PARAMS_IN_REQUEST_ERROR" })
    return;
  }
  
  try{
    // 제품 상세 페이지
    const getDetail = await getDetailService.productDetails(productId);
    res.status(200).json({ data: getDetail })

  } catch (error) {
    console.log(error)
    res.status( error.statusCode || 500 ).json({ error: error.message })
  }

}


module.exports = { productDetails }