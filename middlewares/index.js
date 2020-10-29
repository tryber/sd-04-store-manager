const { createProductVal, readProductVal, updateProductVal,
  deleteProductVal } = require('./productsValidations');
const { createProduct, readProduct, readProducts, updateProduct,
  deleteProduct } = require('./products');
const { createSalesVal, readSaleVal, updateSaleVal,
  deleteSaleVal } = require('./salesValidations');
const { createSales, readSale, readSales, updateSale, deleteSale } = require('./sales');
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
  updateSaleVal,
  updateSale,
  deleteSaleVal,
  deleteSale,
  notFound,
  internalError,
};
