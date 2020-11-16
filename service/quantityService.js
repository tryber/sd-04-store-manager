const crudModel = require('../models/crudModel');

const updateQuantity = async (action, productId, quantity) => {
  const product = await crudModel.findById(productId);
  if (!product) return;
  let newQuantity;
  if (action === 'POST') {
    newQuantity = product.quantity - quantity;
  }
  if (action === 'DELETE') {
    newQuantity = product.quantity + quantity;
  }

  await crudModel.update(productId, product.name, newQuantity);
};

const updateProductQuantity = async (action, itensSold) => {
  if (itensSold === {}) return;
  const promisses = itensSold.map(({ productId, quantity }) =>
    updateQuantity(action, productId, quantity));

  await Promise.all(promisses);
};

module.exports = {
  updateProductQuantity,
};
