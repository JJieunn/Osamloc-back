const cartOrderService = require('../services/cartOrder');

//장바구니 추가
const createCart = async (req, res) => {
  const { id } = req.foundUser;
  const { productId, quantity } = req.body;

  if (!id) {
    res.status(401).json({ message: 'NEED_LOGIN' });
    return;
  }

  if (!(productId && quantity)) {
    res.status(400).json({ message: 'KEY_ERROR' });
    return;
  }

  try {
    await cartOrderService.createCart(id, productId, quantity);
    res.status(201).json({ message: 'cartCreated' });
  } catch (error) {
    res.status(error.statusCode || 404).json({ message: 'ERROR' });
  }
};

//유저 장바구니 조회
const readUserCart = async (req, res) => {
  const { id } = req.foundUser;

  if (!id) {
    res.status(401).json({ message: 'NEED_LOGIN' });
    return;
  }

  try {
    const userCart = await cartOrderService.readUserCart(id);
    res.status(200).json({ data: userCart });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'CART_NOT_EXIST' });
  }
};

//장바구니 > 주문 > 배송지 입력
const cartOrderAddAddress = async (req, res) => {
  const { userId, name, phone, zipCode, address, detailed, cartId, status } =
    req.body;
  console.log(1);
  try {
    const order = await cartOrderService.cartOrderAddAddress(
      userId,
      name,
      phone,
      zipCode,
      address,
      detailed,
      cartId,
      status
    );
    console.log(2);

    res.status(200).json({ data: order });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//기본배송지 불러오기
const getAddress = async (req, res) => {
  const { id } = req.foundUser;

  try {
    const address = await cartOrderService.getAddress(id);
    res.status(200).json({ data: address });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//장바구니 > 주문
const cartOrder = async (req, res) => {
  const { id } = req.foundUser;
  const { userId, status, cartId } = req.body;
  if (!id) {
    res.status(401).json({ message: 'NEED_LOGIN' });
    return;
  }

  if (!cartId) {
    res.status(400).json({ message: 'KEY_ERROR' });
    return;
  }

  try {
    const order = await cartOrderService.cartOrder(userId, status, cartId);
    res.status(200).json({ data: order });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//장바구니 수량 수정
const editCart = async (req, res) => {
  const { id } = req.foundUser;
  const { cartId, newQuantity } = req.body;

  if (!id) {
    res.status(401).json({ message: 'NEED_LOGIN' });
    return;
  }

  if (!newQuantity) {
    res.status(400).json({ message: 'KEY_ERROR' });
    return;
  }

  try {
    const newCart = await cartOrderService.editCart(cartId, newQuantity);
    res.status(200).json({ data: newCart });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

//장바구니 삭제
const deleteCart = async (req, res) => {
  const { id } = req.foundUser;
  const { cartId } = req.params;

  if (!id) {
    res.status(401).json({ message: 'NEED_LOGIN' });
    return;
  }

  if (!cartId) {
    res.status(400).json({ message: 'KEY_ERROR' });
    return;
  }

  try {
    await cartOrderService.deleteCart(cartId);
    res.status(204).json({ message: 'cartDeleted' });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

module.exports = {
  createCart,
  readUserCart,
  getAddress,
  cartOrder,
  cartOrderAddAddress,
  editCart,
  deleteCart,
};
