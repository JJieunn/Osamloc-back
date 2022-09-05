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


const getReviewByReviewId = async (reviewId) => {
  const [queryRes] = await myDataSource.query(`
    SELECT id FROM review WHERE id = ?
  `, [reviewId])

  return queryRes;
}


const createReview = async (userId, productId, contents, image_url, rate) => {
  const queryRes = await myDataSource.query(`
    INSERT INTO review (user_id, product_id, contents, image_url, rate) VALUES (?, ?, ?, ?, ?)
  `, [userId, productId, contents, image_url, rate])

  return queryRes;
}

// 대신 getDetailDao.js의 함수 사용
const getReviewListByProductId = async (productId) => {
  const queryRes = await myDataSource.query(`
    SELECT id, user_id, contents, image_url, rate, created_at 
    FROM review 
    WHERE product_id = ? 
    ORDER BY created_at DESC
  `, [productId])

  return queryRes;
}


const updateReviewContents = async (reviewId, productId, newContents) => {
  const queryRes = await myDataSource.query(`
    UPDATE review SET contents = ? WHERE id = ?
  `, [newContents, reviewId])

  return queryRes;
}


const deleteReview = async (reviewId) => {
  await myDataSource.query(`
    DELETE FROM review WHERE id = ?
  `, [reviewId])
}



module.exports = {
  getReviewByReviewId,
  createReview,
  getReviewListByProductId,
  updateReviewContents,

  deleteReview
}