const { createProductVal } = require('./validations');
const { createProduct } = require('./products');
const { notFound, internalError } = require('./errors');

module.exports = {
  createProductVal,
  createProduct,
  notFound,
  internalError,
};
