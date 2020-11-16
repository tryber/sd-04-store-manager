const crudModel = require('../models/crudModel');

const updateQuantity = async (action, productId, quantity) => {
  const product = await crudModel.findById('products', productId);
  console.log('product', product);
  if (!product) return;
  let newQuantity;
  console.log('product.quantity', product.quantity);
  if (action === 'POST') {
    newQuantity = product.quantity - quantity;
  }
  if (action === 'DELETE') {
    newQuantity = product.quantity + quantity;
  }
  console.log('newquantity', newQuantity);
  console.log('product.quantity', product.quantity);
  await crudModel.updateProduct(productId, product.name, newQuantity);
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
