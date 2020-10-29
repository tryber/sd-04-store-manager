const { createProductVal, readProductVal, updateProductVal,
  deleteProductVal } = require('./productsValidations');
const { createProduct, readProduct, readProducts, updateProduct,
  deleteProduct } = require('./products');
const { createSalesVal, readSaleVal } = require('./salesValidations');
const { createSales, readSale, readSales } = require('./sales');
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
  readSaleVal,
  readSale,
  readSales,
  notFound,
  internalError,
};
