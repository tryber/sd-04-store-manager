const { createProductVal, readProductVal, updateProductVal,
  deleteProductVal } = require('./validations');
const { createProduct, readProduct, readProducts, updateProduct,
  deleteProduct } = require('./products');
const { notFound, internalError } = require('./errors');

module.exports = {
  createProductVal,
  createProduct,
  readProductVal,
  readProduct,
  readProducts,
  updateProductVal,
  updateProduct,
  deleteProductVal,
  deleteProduct,
  notFound,
  internalError,
};
