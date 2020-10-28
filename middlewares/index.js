const { createProductVal, readProductVal, updateProductVal } = require('./validations');
const { createProduct, readProduct, readProducts, updateProduct } = require('./products');
const { notFound, internalError } = require('./errors');

module.exports = {
  createProductVal,
  createProduct,
  readProductVal,
  readProduct,
  readProducts,
  updateProductVal,
  updateProduct,
  notFound,
  internalError,
};
