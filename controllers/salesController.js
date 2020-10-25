const { salesModels } = require('../models');
const { errors } = require('../services');

const registerSalesController = async (req, res) => {
  try {
    const [...itensSold] = req.body;

    const registerSale = await salesModels.registerSales(itensSold);
    console.log('register sale', registerSale);
    return res.status(200).json(registerSale);
  } catch (err) {
    console.error('registerSalesController', err);
    return errors.errorsMessages(res);
  }
};

const getAllSalesController = async (req, res) => {
  try {
    const sales = await salesModels.getAllSales();

    if (!sales) {
      return errors.errorsMessages(res, 'Sale not found', 'not_found');
    }

    return res.status(200).json({ sales });
  } catch (err) {
    console.error('getAllSalesController', err);
    return errors.errorsMessages(res);
  }
};

module.exports = {
  registerSalesController,
  getAllSalesController,
};
