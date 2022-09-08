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

//장바구니 추가
const createCart = async (userId, productId, quantity) => {
  const post = await myDataSource.query(
    `INSERT INTO cart_order ( user_id, product_id, quantity )
      VALUES (?, ?, ?)`,
    [userId, productId, quantity]
  );
  return post;
};

//유저 장바구니 조회
const readUserCart = async userId => {
  const userCart = await myDataSource.query(
    `SELECT u.id AS userId, u.name AS userName,
    c_o.id AS cartId,
    p.id AS productId,
    p.name, 
    c_o.quantity,
    p.price_origin AS priceOrigin,
    p.sale_price AS salePrice,
    t_i.default_img AS product_thumbnail,
    c_o.status,
      CASE 
      WHEN p.sale_price is null
      THEN p.price_origin * quantity
      ELSE p.sale_price * quantity
      END AS price
  FROM users u
  JOIN cart_order c_o ON c_o.user_id = u.id
  JOIN products p ON p.id = c_o.product_id
  JOIN thumbnail_images t_i ON t_i.id = p.thumbnail_id
  WHERE u.id = ?`,
    [userId]
  );
  return userCart;
};

//장바구니 > 주문 > 배송지 입력
const cartOrderAddAddress = async (
  userId,
  name,
  phone,
  zipCode,
  address,
  detailed,
  cartId,
  status
) => {
  await myDataSource.query(
    `INSERT INTO address ( 
      user_id,
      name,
      phone,
      zip_code,
      address,
      detailed_address
      VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, name, phone, zipCode, address, detailed]
  );
  console.log(3);

  await myDataSource.query(
    `UPDATE cart_order
    SET address_id = 
      (SELECT MAX(address.id)
       FROM address
       WHERE user_id = ?), status = ?
    WHERE id = ?`,
    [userId, status, cartId]
  );

  console.log(4);

  const order = await myDataSource.query(
    `SELECT
      c_o.user_id,
      c_o.product_id, 
      c_o.quantity,
      c_o.status,
      c_o.address_id
    FROM cart_order c_o
    WHERE c_o.id = ?`,
    [cartId]
  );
  console.log(5);

  return order;
};

//기본배송지 불러오기
const getAddress = async userId => {
  const address = await myDataSource.query(
    `SELECT
      a.name,
      a.phone,
      a.zip_code,
      a.address,
      a.detailed_address,
      a.default_address
    FROM address a
    WHERE user_id = ? AND default_address = 1`,
    [userId]
  );
  return address;
};

//기본배송지 > 장바구니 > 주문
const cartOrder = async (userId, status, cartId) => {
  await myDataSource.query(
    `UPDATE cart_order
    SET address_id = 
      (SELECT address.id
       FROM address
       WHERE user_id = ? AND default_address = 1), status = ?
    WHERE id = ?`,
    [userId, status, cartId]
  );

  const order = await myDataSource.query(
    `SELECT
      c_o.user_id,
      c_o.product_id,
      c_o.quantity,
      c_o.status,
      c_o.address_id
    FROM cart_order c_o
    WHERE c_o.id = ?`,
    [cartId]
  );

  return order;
};

//장바구니 수량 수정
const editCart = async (cartId, newQuantity) => {
  await myDataSource.query(
    `UPDATE cart_order
    SET quantity = ?
    WHERE id = ?`,
    [newQuantity, cartId]
  );
  const newCart = await myDataSource.query(
    `SELECT 
      c_o.user_id,
      c_o.product_id, 
      c_o.quantity,
      c_o.status
    FROM cart_order c_o
    WHERE c_o.id = ?`,
    [cartId]
  );
  return newCart;
};

//장바구니 삭제
const deleteCart = async cartId => {
  const deleted = await myDataSource.query(
    `DELETE FROM cart_order 
  WHERE cart_order.id = ?`,
    [cartId]
  );
  return deleted;
};

module.exports = {
  createCart,
  readUserCart,
  cartOrderAddAddress,
  getAddress,
  cartOrder,
  editCart,
  deleteCart,
};
