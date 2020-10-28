const { createProductVal, readProductVal, updateProductVal,
  deleteProductVal } = require('./productsValidations');
const { createProduct, readProduct, readProducts, updateProduct,
  deleteProduct } = require('./products');
const { createSalesVal } = require('./salesValidations');
const { createSales } = require('./sales');
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
  createSalesVal,
  createSales,
  notFound,
  internalError,
};
