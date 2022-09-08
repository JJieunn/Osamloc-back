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

//3depth + (sort)
const readThreeDepth = async name => {
  const categoryProducts = await myDataSource.query(
    `SELECT
      c.name AS category,
      t.name AS type,
      pr.name,
      pr.description,
      (SELECT COUNT(w.product_id)
        FROM products p
        LEFT OUTER JOIN product_wishlist w
        ON p.id = w.product_id
        WHERE p.id = pr.id) AS likeCount,
      COUNT(r.product_id) AS reviewCount,
      t_i.default_img,
      t_i.hover_img,
      REPLACE(pr.price_origin, '.', ',') AS price_origin,
      s_r.sale,
      REPLACE(pr.sale_price, '.', ',') AS sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    JOIN product_types t ON t.id = pr.type_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ?
    GROUP BY pr.id`,
    [name]
  );
  return categoryProducts;
};

//타입별 전체제품 조회
const readProductType = async (name, type) => {
  const products = await myDataSource.query(
    `SELECT
    c.name AS category,
    t.name AS type,
    pr.name,
    pr.description,
    (SELECT COUNT(w.product_id)
      FROM products p
      LEFT OUTER JOIN product_wishlist w
      ON p.id = w.product_id
      WHERE p.id = pr.id) AS likeCount,
    COUNT(r.product_id) AS reviewCount,
    t_i.default_img,
    t_i.hover_img,
    REPLACE(pr.price_origin, '.', ',') AS price_origin,
    s_r.sale,
    REPLACE(pr.sale_price, '.', ',') AS sale_price
  FROM products pr
  JOIN category c ON c.id = pr.category_id
  JOIN product_types t ON t.id = pr.type_id
  LEFT OUTER JOIN review r ON pr.id = r.product_id
  JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
  LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
  WHERE c.name = ? AND t.name IN (?)
  GROUP BY pr.id`,
    [name, type.split(',')]
  );
  return products;
};

//위클리 베스트
const weeklyBest = async () => {
  const products = await myDataSource.query(
    `SELECT
    pr.name,
    pr.description,
    (SELECT COUNT(w.product_id)
      FROM products p
      LEFT OUTER JOIN product_wishlist w
      ON p.id = w.product_id
      WHERE p.id = pr.id) AS likeCount,
    COUNT(r.product_id) AS reviewCount,
    t_i.default_img,
    t_i.hover_img,
    REPLACE(pr.price_origin, '.', ',') AS price_origin,
    s_r.sale,
    REPLACE(pr.sale_price, '.', ',') AS sale_price,
    pr.created_at
  FROM products pr
  LEFT OUTER JOIN review r ON pr.id = r.product_id
  JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
  LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
  WHERE pr.created_at > DATE_ADD(now(),interval -7 day)
  GROUP BY pr.id
  ORDER BY likeCount DESC
  LIMIT 9`
  );
  return products;
};

//위클리 베스트 + 리뷰순
const weeklyBestSort = async () => {
  const products = await myDataSource.query(
    `SELECT
    pr.name,
    pr.description,
    (SELECT COUNT(w.product_id)
      FROM products p
      LEFT OUTER JOIN product_wishlist w
      ON p.id = w.product_id
      WHERE p.id = pr.id) AS likeCount,
    COUNT(r.product_id) AS reviewCount,
    t_i.default_img,
    t_i.hover_img,
    REPLACE(pr.price_origin, '.', ',') AS price_origin,
    s_r.sale,
    REPLACE(pr.sale_price, '.', ',') AS sale_price,
    pr.created_at
  FROM products pr
  LEFT OUTER JOIN review r ON pr.id = r.product_id
  JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
  LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
  WHERE pr.created_at > DATE_ADD(now(),interval -7 day)
  GROUP BY pr.id
  ORDER BY reviewCount DESC
  LIMIT 9`
  );
  return products;
};

//베스트
const productBest = async () => {
  const products = await myDataSource.query(
    `SELECT
    pr.name,
    pr.description,
    (SELECT COUNT(w.product_id)
      FROM products p
      LEFT OUTER JOIN product_wishlist w
      ON p.id = w.product_id
      WHERE p.id = pr.id) AS likeCount,
    COUNT(r.product_id) AS reviewCount,
    t_i.default_img,
    t_i.hover_img,
    REPLACE(pr.price_origin, '.', ',') AS price_origin,
    s_r.sale,
    REPLACE(pr.sale_price, '.', ',') AS sale_price,
    pr.created_at
  FROM products pr
  LEFT OUTER JOIN review r ON pr.id = r.product_id
  JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
  LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
  GROUP BY pr.id
  ORDER BY likeCount DESC
  LIMIT 9`
  );
  return products;
};

//2depth + 리뷰순 조회
const readTwoDepthCategory = async (id, page) => {
  const categoryProducts = await myDataSource.query(
    `SELECT
      c.name AS category,
      t.name AS type,
      pr.name,
      pr.description,
      (SELECT COUNT(w.product_id)
        FROM products p
        LEFT OUTER JOIN product_wishlist w
        ON p.id = w.product_id
        WHERE p.id = pr.id) AS likeCount,
      COUNT(r.product_id) AS reviewCount,
      t_i.default_img,
      t_i.hover_img,
      REPLACE(pr.price_origin, '.', ',') AS price_origin,
      s_r.sale,
      REPLACE(pr.sale_price, '.', ',') AS sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    JOIN product_types t ON t.id = pr.type_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.parent_id = ?
    GROUP BY pr.id
    ORDER BY COUNT(r.product_id) DESC
    LIMIT ?, 9`,
    [id, (page - 1) * 9]
  );
  return categoryProducts;
};

//3depth + (sort)
const readThreeDepthReview = async (name, page) => {
  const categoryProducts = await myDataSource.query(
    `SELECT
      c.name AS category,
      t.name AS type,
      pr.name,
      pr.description,
      (SELECT COUNT(w.product_id)
        FROM products p
        LEFT OUTER JOIN product_wishlist w
        ON p.id = w.product_id
        WHERE p.id = pr.id) AS likeCount,
      COUNT(r.product_id) AS reviewCount,
      t_i.default_img,
      t_i.hover_img,
      REPLACE(pr.price_origin, '.', ',') AS price_origin,
      s_r.sale,
      REPLACE(pr.sale_price, '.', ',') AS sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    JOIN product_types t ON t.id = pr.type_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ?
    GROUP BY pr.id
    ORDER BY COUNT(r.product_id) DESC
    LIMIT ?, 9`,
    [name, (page - 1) * 9]
  );
  return categoryProducts;
};

const readThreeDepthPopular = async (name, page) => {
  const sort = await myDataSource.query(
    `SELECT
      c.name AS category,
      pr.name,
      pr.description,
      (SELECT COUNT(w.product_id)
        FROM products p
        LEFT OUTER JOIN product_wishlist w
        ON p.id = w.product_id
        WHERE p.id = pr.id) AS likeCount,
      COUNT(r.product_id) AS reviewCount,
      t_i.default_img,
      t_i.hover_img,
      REPLACE(pr.price_origin, '.', ',') AS price_origin,
      s_r.sale,
      REPLACE(pr.sale_price, '.', ',') AS sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ?
    GROUP BY pr.id
    ORDER BY likeCount DESC
    LIMIT ?, 9`,
    [name, (page - 1) * 9]
  );
  return sort;
};

const readThreeDepthNewProduct = async (name, page) => {
  const sort = await myDataSource.query(
    `SELECT
      c.name AS category,
      pr.name,
      pr.description,
      pr.created_at,
      (SELECT COUNT(w.product_id)
        FROM products p
        LEFT OUTER JOIN product_wishlist w
        ON p.id = w.product_id
        WHERE p.id = pr.id) AS likeCount,
      COUNT(r.product_id) AS reviewCount,
      t_i.default_img,
      t_i.hover_img,
      REPLACE(pr.price_origin, '.', ',') AS price_origin,
      s_r.sale,
      REPLACE(pr.sale_price, '.', ',') AS sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ?
    GROUP BY pr.id
    ORDER BY pr.created_at DESC
    LIMIT ?, 9`,
    [name, (page - 1) * 9]
  );
  return sort;
};

const readThreeDepthPriceAsc = async (name, page) => {
  const sort = await myDataSource.query(
    `SELECT
      c.name AS category,
      pr.name,
      pr.description,
      (SELECT COUNT(w.product_id)
        FROM products p
        LEFT OUTER JOIN product_wishlist w
        ON p.id = w.product_id
        WHERE p.id = pr.id) AS likeCount,
      COUNT(r.product_id) AS reviewCount,
      t_i.default_img,
      t_i.hover_img,
      REPLACE(pr.price_origin, '.', ',') AS price_origin,
      s_r.sale,
      REPLACE(pr.sale_price, '.', ',') AS sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ?
    GROUP BY pr.id
    ORDER BY 
      CASE
      WHEN sale_price is null
      THEN price_origin
      ELSE sale_price
      END ASC
    LIMIT ?, 9`,
    [name, (page - 1) * 9]
  );
  return sort;
};

const readThreeDepthPriceDesc = async (name, page) => {
  const sort = await myDataSource.query(
    `SELECT
    c.name AS category,
    pr.name,
    pr.description,
    (SELECT COUNT(w.product_id)
      FROM products p
      LEFT OUTER JOIN product_wishlist w
      ON p.id = w.product_id
      WHERE p.id = pr.id) AS likeCount,
    COUNT(r.product_id) AS reviewCount,
    t_i.default_img,
    t_i.hover_img,
    REPLACE(pr.price_origin, '.', ',') AS price_origin,
    s_r.sale,
    REPLACE(pr.sale_price, '.', ',') AS sale_price
  FROM products pr
  JOIN category c ON c.id = pr.category_id
  LEFT OUTER JOIN review r ON pr.id = r.product_id
  JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
  LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
  WHERE c.name = ?
  GROUP BY pr.id
  ORDER BY 
    CASE
    WHEN sale_price is null
    THEN price_origin
    ELSE sale_price
    END DESC
  LIMIT ?, 9`,
    [name, (page - 1) * 9]
  );
  return sort;
};

//3depth + type + (sort)
const reviewSort = async (name, type, page) => {
  const sort = await myDataSource.query(
    `SELECT
      c.name AS category,
      t.name AS type,
      pr.name,
      pr.description,
      (SELECT COUNT(w.product_id)
        FROM products p
        LEFT OUTER JOIN product_wishlist w
        ON p.id = w.product_id
        WHERE p.id = pr.id) AS likeCount,
      COUNT(r.product_id) AS reviewCount,
      t_i.default_img,
      t_i.hover_img,
      REPLACE(pr.price_origin, '.', ',') AS price_origin,
      s_r.sale,
      REPLACE(pr.sale_price, '.', ',') AS sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    JOIN product_types t ON t.id = pr.type_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ? AND t.name IN (?)
    GROUP BY pr.id
    ORDER BY COUNT(r.product_id) DESC
    LIMIT ?, 9`,
    [name, type.split(','), (page - 1) * 9]
  );
  return sort;
};

const popularSort = async (name, type, page) => {
  const sort = await myDataSource.query(
    `SELECT
      c.name AS category,
      t.name AS type,
      pr.name,
      pr.description,
      (SELECT COUNT(w.product_id)
        FROM products p
        LEFT OUTER JOIN product_wishlist w
        ON p.id = w.product_id
        WHERE p.id = pr.id) AS likeCount,
      COUNT(r.product_id) AS reviewCount,
      t_i.default_img,
      t_i.hover_img,
      REPLACE(pr.price_origin, '.', ',') AS price_origin,
      s_r.sale,
      REPLACE(pr.sale_price, '.', ',') AS sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    JOIN product_types t ON t.id = pr.type_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ? AND t.name IN (?)
    GROUP BY pr.id
    ORDER BY likeCount DESC
    LIMIT ?, 9`,
    [name, type.split(','), (page - 1) * 9]
  );
  return sort;
};

const newProductSort = async (name, type, page) => {
  const sort = await myDataSource.query(
    `SELECT
      c.name AS category,
      t.name AS type,
      pr.name,
      pr.description,
      pr.created_at,
      (SELECT COUNT(w.product_id)
        FROM products p
        LEFT OUTER JOIN product_wishlist w
        ON p.id = w.product_id
        WHERE p.id = pr.id) AS likeCount,
      COUNT(r.product_id) AS reviewCount,
      t_i.default_img,
      t_i.hover_img,
      REPLACE(pr.price_origin, '.', ',') AS price_origin,
      s_r.sale,
      REPLACE(pr.sale_price, '.', ',') AS sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    JOIN product_types t ON t.id = pr.type_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ? AND t.name IN (?)
    GROUP BY pr.id
    ORDER BY pr.created_at DESC
    LIMIT ?, 9`,
    [name, type.split(','), (page - 1) * 9]
  );
  return sort;
};

const priceAscSort = async (name, type, page) => {
  const sort = await myDataSource.query(
    `SELECT
      c.name AS category,
      t.name AS type,
      pr.name,
      pr.description,
      (SELECT COUNT(w.product_id)
        FROM products p
        LEFT OUTER JOIN product_wishlist w
        ON p.id = w.product_id
        WHERE p.id = pr.id) AS likeCount,
      COUNT(r.product_id) AS reviewCount,
      t_i.default_img,
      t_i.hover_img,
      REPLACE(pr.price_origin, '.', ',') AS price_origin,
      s_r.sale,
      REPLACE(pr.sale_price, '.', ',') AS sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    JOIN product_types t ON t.id = pr.type_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ? AND t.name IN (?)
    GROUP BY pr.id
    ORDER BY 
      CASE
      WHEN sale_price is null
      THEN price_origin
      ELSE sale_price
      END ASC
    LIMIT ?, 9`,
    [name, type.split(','), (page - 1) * 9]
  );
  return sort;
};

const priceDescSort = async (name, type, page) => {
  const sort = await myDataSource.query(
    `SELECT
      c.name AS category,
      t.name AS type,
      pr.name,
      pr.description,
      (SELECT COUNT(w.product_id)
        FROM products p
        LEFT OUTER JOIN product_wishlist w
        ON p.id = w.product_id
        WHERE p.id = pr.id) AS likeCount,
      COUNT(r.product_id) AS reviewCount,
      t_i.default_img,
      t_i.hover_img,
      REPLACE(pr.price_origin, '.', ',') AS price_origin,
      s_r.sale,
      REPLACE(pr.sale_price, '.', ',') AS sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    JOIN product_types t ON t.id = pr.type_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ? AND t.name IN (?)
    GROUP BY pr.id
    ORDER BY 
      CASE
      WHEN sale_price is null
      THEN price_origin
      ELSE sale_price
      END DESC
    LIMIT ?, 9`,
    [name, type.split(','), (page - 1) * 9]
  );
  return sort;
};

module.exports = {
  readProductType,
  readThreeDepth,
  weeklyBest,
  weeklyBestSort,
  productBest,
  readTwoDepthCategory,
  readThreeDepthReview,
  readThreeDepthPopular,
  readThreeDepthNewProduct,
  readThreeDepthPriceAsc,
  readThreeDepthPriceDesc,
  reviewSort,
  popularSort,
  newProductSort,
  priceAscSort,
  priceDescSort,
};

// readProducts,
// reviewSort,
// sortPurchase,
// weeklyBest,
