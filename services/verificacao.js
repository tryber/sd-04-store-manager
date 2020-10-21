const { findByName } = require('../models/productsModels');
const rescue = require('express-rescue')

const isValidProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  if (name.length < 5) return res.statu(422).json({ message: '"name" length must be at least 5 characters long' });

  const find = rescue(await findByName(name));
  if (find) return res.status(422).json({ message: 'Product already exists' });

  if (quantity <= 0) return res.status(422).json({ message: '"quantity" must be larger than or equal to 1' });

  if (typeof quantity === 'string') return res.status(422).json({ message: '"quantity" must be a number' })

  return next();
}

module.exports = {
  isValidProduct,
}
