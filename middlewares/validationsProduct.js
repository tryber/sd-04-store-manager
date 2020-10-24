const { validateNameLength } = require('../services/productsService');

const validationProducts = (req, res, next) => {
  const { name, quantity } = req.body;
  if (!validateNameLength(name))
    return res.status(400).json({ message: 'O nome deve ter no mínimo 5 letras!' });
  return next();
};

module.exports = {
  validationProducts,
};
