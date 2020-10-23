const { findByName } = require('../models/productsModels');

const isValidProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  if (name.length < 5) return res.status(422).json({ err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } });

  if (quantity <= 0) return res.status(422).json({ err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } });

  if (typeof quantity === 'string') return res.status(422).json({ err: { code: 'invalid_data', message: '"quantity" must be a number' } });

  next();
};

const isNew = async (req, res, next) => {
  const { name } = req.body;
  const find = await findByName(name);
  if (find) return res.status(422).json({ err: { code: 'invalid_data', message: 'Product already exists' } });
  next();
};

const isValidSale = async (req, res, next) => {
  const data = req.body;
  const compare = data.find(({ quantity }) => quantity <= 0 || typeof quantity === 'string');

  if (compare) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }

  next();
};

module.exports = {
  isValidProduct,
  isNew,
  isValidSale,
};
