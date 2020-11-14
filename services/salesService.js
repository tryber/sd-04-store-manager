const { findById } = require('../models/dbModel');

const insertSaleValidationMiddleware = (req, res, next) => {
  const sales = req.body;
  const error = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };
  sales.forEach((sale) => {
    const product = findById(sale.productId, 'products');
    if (sale.quantity <= 0 || isNaN(sale.quantity) || !product) {
      return res.status(422).json(error);
    }
  });
  return next();
};

module.exports = {
  insertSaleValidationMiddleware,
};
