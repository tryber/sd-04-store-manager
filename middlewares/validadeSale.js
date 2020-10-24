const Boom = require('@hapi/boom');
const rescue = require('express-rescue');
const { validateSale } = require('../models/salesModel');

const validate = rescue(async ({ body }, _res, next) => {
  const message = await validateSale(body);
  if (message) throw Boom.badData(message);
  next();
});

module.exports = validate;
