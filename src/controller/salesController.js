const { salesModels } = require('../models');
const { errors } = require('../service');
const { HTTPStatus } = require('../config');

const registerSalesController = async (req, res) => {
  try {
    const [...itensSold] = req.body;

    const registerSale = await salesModels.registerSales(itensSold);

    return res.status(HTTPStatus.OK).json(registerSale);
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

    return res.status(HTTPStatus.OK).json({ sales });
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
      return errors.errorsMessages(res, 'Wrong id format', 'invalid_data');
    }

    return res.status(HTTPStatus.OK).json(sale);
  } catch (err) {
    console.error('getSaleByIdController', err);
    return errors.errorsMessages(res);
  }
};

const updateSaleController = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = req.body;

    await salesModels.updateSale(id, sale);

    const saleUpdate = await salesModels.getSaleById(id);

    console.log(saleUpdate);
    return res.status(HTTPStatus.OK).json(saleUpdate);
  } catch (err) {
    console.error('getSaleByIdController', err);
    return errors.errorsMessages(res);
  }
};

module.exports = {
  registerSalesController,
  getAllSalesController,
  getSaleByIdController,
  updateSaleController,
};
