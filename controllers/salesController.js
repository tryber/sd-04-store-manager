const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { newSale, isValidSale } = require('../services/salesService');

const newSale = rescue(async (req, res, next) => {
  try {
    if (!isValidSale(req.body)) {
      next(Boom.badData('Wrong product ID or invalid quantity', 'invalid_data'));
    }
    const sale = await newSale(req.body);
    return res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  newSale,
};
