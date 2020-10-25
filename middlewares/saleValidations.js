const returnResponse = require('../services/returnResponse');
const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

const validateQuantity = (req, res, next) => {
  const { body } = req;

  for (let i = 0; i < body.length; i += 1) {
    if (body[i].quantity <= 0 || !Number.isInteger(body[i].quantity)) {
      return res
        .status(422)
        .json(returnResponse('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  }

  next();
};

const checkSaleExistence = async (req, res, next) => {
  const { id } = req.params;
  const conn = await connection();
  const foundId = conn.collection('sales').findOne({ _id: ObjectId(id) });

  if (!foundId) {
    return res.status(404).json(returnResponse('not_found', 'Sale not found'));
  }

  next();
};

module.exports = {
  validateQuantity,
  checkSaleExistence,
};
