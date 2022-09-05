const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch(() => {
    console.log("Database initiate fail");
  });


const getReviewByReviewId = async (reviewId, productId) => {
  const [queryRes] = await myDataSource.query(`
    SELECT id FROM review WHERE id = ? AND product_id = ?
  `, [reviewId, productId])

  return queryRes;
}

// 구매한 사람인지 확인
const getOrderStatusByUserId = async (userId, productId) => {
  const [queryRes] = await myDataSource.query(`
  SELECT COUNT(status) as count FROM cart_order WHERE user_id = ? AND product_id = ? AND status = 2
  `, [userId, productId])

  return queryRes;
}

const createReview = async (userId, productId, contents, image_url, rate) => {
  const queryRes = await myDataSource.query(`
    INSERT INTO review (user_id, product_id, contents, image_url, rate) VALUES (?, ?, ?, ?, ?)
  `, [userId, productId, contents, image_url, rate])

  return queryRes;
}

/*
// 대신 getDetailDao.js의 함수 사용
const getReviewListByProductId = async (productId) => {
  const [queryRes] = await myDataSource.query(`
    SELECT id, user_id, contents, image_url, rate, created_at 
    FROM review 
    WHERE product_id = ? 
    ORDER BY created_at DESC
  `, [productId])

  return queryRes;
}
*/

// 리뷰 수정
const updateReviewContents = async (reviewId, productId, newContents) => {
  const queryRes = await myDataSource.query(`
    UPDATE review SET contents = ? WHERE id = ?
  `, [newContents, reviewId])

  return queryRes;
}

const updateReviewImgUrl = async (reviewId, productId, newImageUrl) => {
  const queryRes = await myDataSource.query(`
    UPDATE review SET image_url = ? WHERE id = ?
  `, [newImageUrl, reviewId])

  return queryRes;
}

const updateReviewRate = async (reviewId, productId, newRate) => {
  const queryRes = await myDataSource.query(`
    UPDATE review SET rate = ? WHERE id = ?
  `, [newRate, reviewId])

  return queryRes;
}


const deleteReview = async (reviewId) => {
  await myDataSource.query(`
    DELETE FROM review WHERE id = ?
  `, [reviewId])
}



module.exports = {
  getReviewByReviewId,
  getOrderStatusByUserId,
  createReview,
  updateReviewContents,
  updateReviewImgUrl,
  updateReviewRate,
  deleteReview
}
