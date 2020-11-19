const crud = require('../model');

const updateQuantity = async (action, productId, quantity) => {
  const product = await crud.findById('products', productId);
  if (!product) return;
  if (action !== 'POST' && action !== 'DELETE') return;

  const newQuantity = action === 'POST' ? product.quantity - quantity : product.quantity + quantity;

  await crud.updateProduct(productId, product.name, newQuantity);
};

const updateProductQuantity = async (action, itensSold) => {
  if (itensSold === {}) return;
  const promisses = itensSold.map(({ productId, quantity }) =>
    updateQuantity(action, productId, quantity),
  );

  await Promise.all(promisses);
};

module.exports = {
  updateProductQuantity,
};
