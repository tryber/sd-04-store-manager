const Boom = require('@hapi/boom');
const rescue = require('express-rescue');
const { validateProduct } = require('../models/productsModel');

const validate = (searchOnDb = true) => rescue(
  async ({ body: { name, quantity } = {} }, _res, next) => {
    const message = await validateProduct({ name, quantity }, searchOnDb);
    if (message) throw Boom.badData(message);
    next();
  },
);

module.exports = validate;
