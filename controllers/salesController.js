const { salesModels } = require('../models');
const { errors } = require('../services');

const registerSalesController = async (req, res) => {
  try {
    const [...itensSold] = req.body;

    const registerSale = await salesModels.registerSales(itensSold);

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

const getSaleByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesModels.getSaleById(id);

    if (sale === null) {
      return errors.errorsMessages(res, 'Sale not found', 'not_found');
    }

    return res.status(200).json(sale);
  } catch (err) {
    console.error('getSaleByIdController', err);
    return errors.errorsMessages(res);
  }
};

const deleteSalesController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSales = await salesModels.getSaleById(id);
    console.log('deletesales', deleteSales);
    if (deleteSales === null) {
      return errors.errorsMessages(res, 'Wrong sale ID format', 'invalid_data');
    }

    await salesModels.deleteSales(id);
    return res.status(200).json(deleteSales);
  } catch (err) {
    console.error('deleteSalesController', err);
    return errors.errorsMessages(res);
  }
};

module.exports = {
  registerSalesController,
  getAllSalesController,
  getSaleByIdController,
  deleteSalesController,
};
