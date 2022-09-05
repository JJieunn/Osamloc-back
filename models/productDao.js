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
    `SELECT *
    FROM products`
  );
  return products;
}; */

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
    pr.price_origin,
    s_r.sale,
    pr.sale_price,
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

//2depth + 리뷰 조회
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
      pr.price_origin,
      s_r.sale,
      pr.sale_price
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

//타입별 제품 조회 (잎차, 피라미드...)
const readProductType = async (name, type) => {
  const products = await myDataSource.query(
    `SELECT t.name AS productType, c.name AS category,
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
    WHERE c.name = ? AND t.name = ?
    GROUP BY p.category_id`,
    [name, type]
  );
  return products;
};

//3depth + 리뷰순 조회
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
      pr.price_origin,
      s_r.sale,
      pr.sale_price
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

//3depth + 판매순
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
      pr.price_origin,
      s_r.sale,
      pr.sale_price
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

//3depth + 신상품순
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
      pr.price_origin,
      s_r.sale,
      pr.sale_price
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

//3depth + 낮은 가격순
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
      pr.price_origin,
      s_r.sale,
      pr.sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ?
    GROUP BY pr.id
    ORDER BY pr.price_origin ASC
    LIMIT ?, 9`,
    [name, (page - 1) * 9]
  );
  return sort;
};

//3depth + 높은 가격순
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
      pr.price_origin,
      s_r.sale,
      pr.sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ?
    GROUP BY pr.id
    ORDER BY pr.price_origin DESC
    LIMIT ?, 9`,
    [name, (page - 1) * 9]
  );
  return sort;
};

//3depth + 타입 + 리뷰순
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
      pr.price_origin,
      s_r.sale,
      pr.sale_price
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

//3depth + type + 판매순
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
      pr.price_origin,
      s_r.sale,
      pr.sale_price
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

//3depth + type + 신상품순
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
      pr.price_origin,
      s_r.sale,
      pr.sale_price
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

//낮은 가격순
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
      pr.price_origin,
      s_r.sale,
      pr.sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    JOIN product_types t ON t.id = pr.type_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ? AND t.name IN (?)
    GROUP BY pr.id
    ORDER BY pr.price_origin ASC
    LIMIT ?, 9`,
    [name, type.split(','), (page - 1) * 9]
  );
  return sort;
};

//높은 가격순
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
      pr.price_origin,
      s_r.sale,
      pr.sale_price
    FROM products pr
    JOIN category c ON c.id = pr.category_id
    JOIN product_types t ON t.id = pr.type_id
    LEFT OUTER JOIN review r ON pr.id = r.product_id
    JOIN thumbnail_images t_i ON t_i.id = pr.thumbnail_id
    LEFT OUTER JOIN sale_rate s_r ON s_r.id = pr.sale_rate_id
    WHERE c.name = ? AND t.name IN (?)
    GROUP BY pr.id
    ORDER BY pr.price_origin DESC
    LIMIT ?, 9`,
    [name, type.split(','), (page - 1) * 9]
  );
  return sort;
};

module.exports = {
  weeklyBest,
  readTwoDepthCategory,
  readThreeDepthReview,
  readThreeDepthPopular,
  readThreeDepthNewProduct,
  readThreeDepthPriceAsc,
  readThreeDepthPriceDesc,
  readProductType,
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
