const { salesModels } = require('../models');
const { errors } = require('../service');
const { HTTPStatus } = require('../config');

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

module.exports = { registerSalesController };
