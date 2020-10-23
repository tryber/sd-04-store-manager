const { salesModels } = require('../models');
const { errors } = require('../service');
const { HTTPStatus } = require('../config');
const { errorUnprocessableEntity } = require('../service/errors');

const registerSalesController = async (req, res) => {
  try {
    const [...itensSold] = req.body;

    const registerSale = await salesModels.registerSales(itensSold);

    return res.status(HTTPStatus.OK).json(registerSale);
  } catch (err) {
    console.log(err);
    return errors.errorIntern(res);
  }
};

const getAllSalesController = async (req, res) => {
  try {
    const sales = await salesModels.getAllSales();

    if (!sales) {
      return errors.errorNotFound(res, 'Sale not found');
    }

    return res.status(HTTPStatus.OK).json({ sales });
  } catch (err) {
    console.error(err);
    return errors.errorIntern(res);
  }
};

const getSaleByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesModels.getSaleById(id);

    if (sale === null) {
      return errors.errorUnprocessableEntity(res, 'Wrong id format');
    }

    return res.status(HTTPStatus.OK).json(sale);
  } catch (err) {
    console.error(err);
    return errors.errorIntern(res);
  }
};

module.exports = { registerSalesController, getAllSalesController, getSaleByIdController };
