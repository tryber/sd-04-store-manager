const errors = require('../services/errors');
const productsModel = require('../models/productsModel');
// validações sales feitas a partir de conversas com alunos da trybe, em especial Alice Arruda.
const validateSaleQuantity = async (req, res, next) => {
  try {
    const sales = req.body;

    const invalidSales = await sales.every(
      (sale) => sale.quantity <= 0 || Number.isNaN(Number(sale.quantity)),
    );

    if (invalidSales) {
      return errors.clientUnprocessableEntityError(res, 'Wrong product ID or invalid quantity');
    }
    return next();
  } catch (e) {
    console.error('validationQuantity', e);
  }
};

const validateProductIdExists = async (req, res, next) => {
  try {
    const sales = req.body;

    const validSale = await sales.every(async (sale) => {
      const product = await productsModel.getById(sale.productId);
      return product;
    });

    if (validSale) return next();

    return errors.clientUnprocessableEntityError(res, 'Wrong product ID or invalid quantity');
  } catch (e) {
    console.error('validationQuantity', e);
  }
};

module.exports = {
  validateSaleQuantity,
  validateProductIdExists,
};
