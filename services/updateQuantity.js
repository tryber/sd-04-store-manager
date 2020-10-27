const { remove, addNew } = require('../models');
const { updateQuantity } = require('../models/productsModel');

const postSale = async (itensSold) => {
  const newSale = await addNew('sales', { itensSold });
  for await (const { productId, quantity } of itensSold) {
    await updateQuantity(productId, -quantity);
  }
  // itensSold.forEach(async ({ productId, quantity }) => {
  //   updateQuantity(productId, -quantity);
  // });
  return newSale;
};

const removeSale = async (id) => {
  const result = await remove('sales', id, 'Wrong sale ID format');
  result.itensSold.forEach(async ({ productId, quantity }) => {
    await updateQuantity(productId, quantity);
  });
  return result;
};

module.exports = { postSale, removeSale };
