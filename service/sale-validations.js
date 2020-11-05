const { ObjectId } = require('mongodb');
const saleModel = require('../model/sale');

const buildError = (code, message, status) => ({
  error: { err: { code, message } },
  status,
});

const errorMessage = [
  'Wrong product ID or invalid quantity',
  'Sale not found',
  'Wrong sale ID format',
  'Such amount is not permitted to sell',
];

const isValidPost = async (itensSold) => {
  const isValidItensSold = itensSold.every((e) => typeof (e.quantity) === 'number' && e.quantity > 0);

  if (isValidItensSold === false) {
    return buildError('invalid_data', errorMessage[0], 422);
  }

  return null;
};

const isValidGet = async (id) => {
  if (!ObjectId.isValid(id)) { return buildError('invalid_data', errorMessage[1], 422); }

  const deleted = await saleModel.getSaleById(id);

  if (deleted === null) { return buildError('not_found', errorMessage[1], 404); }

  return null;
};

const isValidDelete = async (id) => {
  if (!ObjectId.isValid(id)) { return buildError('invalid_data', errorMessage[2], 422); }

  return null;
};

module.exports = {
  isValidPost,
  isValidGet,
  isValidDelete,
};
