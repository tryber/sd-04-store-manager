const { findByName } = require('../models/productsModels');
const rescue = require('express-rescue');

const isValidProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const find = await findByName(name);

  if (name.length < 5) return res.status(422).json({ err: { code: 'invalid_data' , message: '"name" length must be at least 5 characters long' }});

  if (find) return res.status(422).json({ err: { code: 'invalid_data' , message: 'Product already exists' }});

  if (quantity <= 0) return res.status(422).json({ err: { code: 'invalid_data' , message: '"quantity" must be larger than or equal to 1' }});

  if (typeof quantity === 'string') return res.status(422).json({ err: { code: 'invalid_data' , message: '"quantity" must be a number' }});

  next();
};

module.exports = {
  isValidProduct,
};
