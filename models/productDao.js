const { json } = require('express/lib/response');
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

/* const readProducts = async () => {
  const products = await myDataSource.query(
    `SELECT 
        name, 
        description, 
        type_id, 
        category_id, 
        thumbnail_id, 
        price_origin, 
        sale_rate_id,
        sale_price,
        created_at
        FROM products p
        `
  );
  return products;
}; */

//위클리 베스트
/* const weeklyBest = async (orderDate) => {
  const products = await myDataSource.query(
    `SELECT p.*,
    IFNULL(COUNT(o.product_id),0) AS order
    FROM products p
    LEFT JOIN order o ON o.product_id = p.id
    WHERE DATE(o.order_date)>=?
    AND o.status = 2
    ORDER BY COUNT(o.product_id) DESC LIMIT 9`,
    [orderDate]
  );
  return products;
}; */

//카테고리별 제품 조회
const readCategory = async (categoryId, page) => {
  const categoryProducts = await myDataSource.query(
    `SELECT c.id AS categoryId, c.parent_id, c.name AS category, c.level AS categoryDepth,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "name", p.name, 
          "description", p.description,
          "type", p_t.name,
          "thumbnailDefault", t_i.default_img,
          "thumbnailHover", t_i.hover_img,
          "priceOrigin", p.price_origin,
          "saleRate", s_r.sale,
          "salePrice", p.sale_price
        )
      ) AS products
    FROM products p
    JOIN category c ON c.id = p.category_id
    JOIN thumbnail_images t_i ON t_i.id = p.thumbnail_id
    LEFT OUTER JOIN product_types p_t ON p_t.id = p.type_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = p.sale_rate_id
    WHERE p.category_id = ?
    GROUP BY p.category_id
    LIMIT ?, 9`,
    [categoryId, (page = (page - 1) * 9)]
  );
  return categoryProducts;
};

//타입별 제품 조회 (잎차, 피라미드...)
const readProductType = async (categoryId, typeId) => {
  const products = await myDataSource.query(
    `SELECT t.name AS productType, c.name AS category, c.level AS categoryDepth,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "name", p.name,
          "description", p.description,
          "thumbnailDefault", t_i.default_img,
          "thumbnailHover", t_i.hover_img,
          "priceOrigin", p.price_origin,
          "saleRate", s_r.sale,
          "salePrice", p.sale_price
        )
      ) AS products
    FROM products p
    JOIN category c ON c.id = p.category_id
    JOIN product_types t ON t.id = p.type_id
    JOIN thumbnail_images t_i ON t_i.id = p.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = p.sale_rate_id
    WHERE p.category_id = ? AND p.type_id = ?
    GROUP BY p.category_id`,
    [categoryId, typeId]
  );
  return products;
};

//리뷰순
const reviewSort = async categoryId => {
  const sort = await myDataSource.query(
    `SELECT
      c.name AS category,
      t.name AS type,
      p.name,
      p.description,
      COUNT(r.product_id) AS reviewCount,
      t_i.default_img,
      t_i.hover_img,
      p.price_origin,
      s_r.sale,
      p.sale_price
    FROM products p
    JOIN category c ON c.id = p.category_id
    JOIN product_types t ON t.id = p.type_id
    LEFT OUTER JOIN review r ON p.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = p.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = p.sale_rate_id
    WHERE p.category_id = ?
    GROUP BY p.id
    ORDER BY COUNT(r.product_id) DESC`,
    [categoryId]
  );
  return sort;
};

//판매순
/* const sortPurchase = async () => {
  const sort = await myDataSource.query(
    `SELECT
      p.name,
      p.description,
      COUNT(o.product_id) AS orderCount,
      t_i.default_img,
      t_i.hover_img,
      p.price_origin,
      s_r.sale,
      p.sale_price
    FROM products p
    LEFT OUTER JOIN order o ON p.id = o.product_id
    JOIN thumbnail_images t_i ON t_i.id = p.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = p.sale_rate_id
    WHERE p.category_id = ? AND p.type_id = ?
    GROUP BY p.id
    ORDER BY COUNT(o.product_id) DESC`
  );
  return sort;
}; */

//신상품순
const newProductSort = async categoryId => {
  const sort = await myDataSource.query(
    `SELECT 
      c.name AS category,
      t.name AS type,
      p.name,
      p.description,
      t_i.default_img,
      t_i.hover_img,
      p.price_origin,
      s_r.sale,
      p.sale_price,
      p.created_at
    FROM products p
    JOIN category c ON c.id = p.category_id
    JOIN product_types t ON t.id = p.type_id
    JOIN thumbnail_images t_i ON t_i.id = p.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = p.sale_rate_id
    WHERE p.category_id = ?
    ORDER BY p.created_at DESC`,
    [categoryId]
  );
  return sort;
};

//낮은 가격순
const priceAscSort = async categoryId => {
  const sort = await myDataSource.query(
    `SELECT 
      c.name AS category,
      t.name AS type,
      p.name,
      p.description,
      t_i.default_img,
      t_i.hover_img,
      p.price_origin,
      s_r.sale,
      p.sale_price
    FROM products p
    JOIN category c ON c.id = p.category_id
    JOIN product_types t ON t.id = p.type_id
    JOIN thumbnail_images t_i ON t_i.id = p.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = p.sale_rate_id
    WHERE p.category_id = ?
    ORDER BY p.price_origin ASC`,
    [categoryId]
  );
  return sort;
};

//높은 가격순
const priceDescSort = async categoryId => {
  const sort = await myDataSource.query(
    `SELECT 
      c.name AS category,
      t.name AS type,
      p.name,
      p.description,
      t_i.default_img,
      t_i.hover_img,
      p.price_origin,
      s_r.sale,
      p.sale_price
    FROM products p
    JOIN category c ON c.id = p.category_id
    JOIN product_types t ON t.id = p.type_id
    JOIN thumbnail_images t_i ON t_i.id = p.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = p.sale_rate_id
    WHERE p.category_id = ?
    ORDER BY p.price_origin DESC`,
    [categoryId]
  );
  return sort;
};

module.exports = {
  readCategory,
  readProductType,
  reviewSort,
  newProductSort,
  priceAscSort,
  priceDescSort,
};

// reviewSort,
// sortPurchase,
// weeklyBest,
