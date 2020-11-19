const { findById, updateProduct } = require('../models/dbModel');

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

const existSaleValidation = async (req, res, next) => {
  const { id } = req.params;
  const sale = await findById(id, 'sales');
  if (!sale) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
  return next();
};

const updateProductForSale = async (req, res, next) => {
  const { id } = req.params;
  const currentSale = await findById(id, 'sales');
  console.log(currentSale);
  let sales = req.body;
  if (req.method === 'DELETE' && currentSale) {
    sales = currentSale.itensSold;
  }
  sales.forEach(async (sale) => {
    const product = await findById(sale.productId, 'products');

    let newQuantity = product.quantity - sale.quantity;
    if (req.method === 'DELETE') {
      newQuantity = product.quantity + sale.quantity;
    }
    updateProduct(sale.productId, product.name, newQuantity);
  });
  return next();
};

module.exports = {
  insertSaleValidationMiddleware,
  updateProductForSale,
  existSaleValidation,
};
