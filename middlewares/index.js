const { createProductVal, readProductVal } = require('./validations');
const { createProduct, readProduct, readProducts } = require('./products');
const { notFound, internalError } = require('./errors');

module.exports = {
  createProductVal,
  createProduct,
  readProductVal,
  readProduct,
  readProducts,
  notFound,
  internalError,
};
