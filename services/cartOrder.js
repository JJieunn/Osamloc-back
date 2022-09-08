const cartOrderDao = require('../models/cartOrderDao');

//장바구니 추가
const createCart = async (userId, productId, quantity) => {
  if (quantity > 1000) {
    const error = new Error('NO_MORE_QUANTITY');
    error.statusCode = 400;
    throw error;
  }

  return await cartOrderDao.createCart(userId, productId, quantity);
};

//유저 장바구니 조회
const readUserCart = async userId => {
  const userCart = await cartOrderDao.readUserCart(userId);
  /* userCart.map(data => {
    data.products = JSON.parse(data.products);
  }); */ /* 
  userCart['price_origin'] = Number(userCart['price_origin']) * 1000;
  userCart['sale_price'] = Number(userCart['sale_price']) * 1000; */
  console.log('cart after Number : ', userCart);

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
  console.log(2);

  return await cartOrderDao.cartOrderAddAddress(
    userId,
    name,
    phone,
    zipCode,
    address,
    detailed,
    cartId,
    status
  );
};

const getAddress = async userId => {
  return await cartOrderDao.getAddress(userId);
};

//장바구니 > 주문
const cartOrder = async (userId, status, cartId) => {
  return await cartOrderDao.cartOrder(userId, status, cartId);
};

//장바구니 수량 수정
const editCart = async (cartId, newQuantity) => {
  if (0 < newQuantity <= 1000) {
    return await cartOrderDao.editCart(cartId, newQuantity);
  }
};

//장바구니 삭제
const deleteCart = async cartId => {
  return await cartOrderDao.deleteCart(cartId);
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
