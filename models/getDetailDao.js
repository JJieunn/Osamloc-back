const { DataSource } = require('typeorm');

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
    console.log('Data Source has been initialized!');
  })
  .catch(() => {
    console.log('Database initiate fail');
  });

const getProductIdById = async productId => {
  const [queryRes] = await myDataSource.query(
    `SELECT id, name FROM products WHERE id = ?`,
    [productId]
  );
  return queryRes;
};

const getDetailById = async productId => {
  const [queryRes] = await myDataSource.query(
    `
    SELECT p.id, p.name, p.description, p.price_origin,
      p.sale_price, s_r.sale, 
      c.name as category, c.parent_id as parentCategory,
      t_i.default_img as defaultImg, t_i.hover_img as hoverImg,
      JSON_ARRAYAGG(d_i.img_url) as detailImgs
    FROM products p 
    LEFT JOIN sale_rate s_r ON p.sale_rate_id = s_r.id
    JOIN category c ON p.category_id = c.id
    JOIN thumbnail_images t_i ON p.thumbnail_id = t_i.id
    LEFT JOIN detail_images d_i ON p.id = d_i.product_id
    WHERE p.id = ?
  `,
    [productId]
  );
  // 원래 detail_images의 JOIN도 INNER JOIN 이어야하나, DB에 모든 값을 넣어두지 않아 LEFT OUTER JOIN으로 대체.
  return queryRes;
};

const getCategoryName = async parentId => {
  const [queryRes] = await myDataSource.query(
    `
    SELECT c. id, c.name FROM category c WHERE c.id = ?
  `,
    [parentId]
  );

  return queryRes;
};

// 리뷰
const getReviewListInDetail = async productId => {
  const queryRes = await myDataSource.query(
    `
  SELECT r.id, r.user_id, u.account, r.content, r.image_url, r.rate,
    DATE_FORMAT(r.updated_at, '%Y.%m.%d') as date
    FROM review r
    JOIN users u ON r.user_id = u.id
    WHERE product_id = ?
    ORDER BY updated_at DESC
  `,
    [productId]
  );

  return queryRes;
};

// 리뷰 갯수
const getNumberOfReviews = async productId => {
  const [queryRes] = await myDataSource.query(
    ` 
  SELECT count(id), count(image_url) FROM review WHERE product_id = ?
  `,
    [productId]
  );

  return queryRes;
};

// 옵션들의 이름 및 가격 정보
const getOptionListsById = async productId => {
  const queryRes = await myDataSource.query(
    `
    SELECT
      p_o.option_product_id,
      p.name,
      p.price_origin,
      p.sale_price,
      s_r.sale
    FROM product_option p_o
    JOIN products p ON p_o.option_product_id = p.id 
    LEFT JOIN sale_rate s_r ON p.sale_rate_id = s_r.id
    WHERE p_o.product_id = ?
  `,
    [productId]
  );

  return queryRes;
};

module.exports = {
  getProductIdById,
  getDetailById,
  getCategoryName,
  getReviewListInDetail,
  getNumberOfReviews,
  getOptionListsById,
};
