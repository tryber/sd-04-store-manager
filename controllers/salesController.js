const salesModel = require('../models/salesModel');
const indexModel = require('../models/indexModel');
const messageFunction = require('../service/index');

const postSalesController = async (req, res) => {
  try {
    const [...itensSold] = req.body;
    const addSales = await salesModel.addSales(itensSold);
    res.status(200).json(addSales);
  } catch (_e) {
    console.log(_e.message);
  }
};

const getSalesController = async (req, res) => {
  try {
    const listSales = await salesModel.getAll();
    res.status(200).json({ sales: listSales });
  } catch (_e) {
    console.log(_e.message);
  }
};

const getSalesDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await indexModel.getById(id, 'sales');
    const errMessage = { err: { code: 'not_found', message: 'Sale not found' } };
    if (!sale) return res.status(404).json(errMessage);
    res.status(200).json(sale);
  } catch (_e) {
    console.log(_e.message);
  }
};

const putSalesDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    const [...sale] = req.body;

    await salesModel.updateSale(id, sale);
    const updatedSale = await indexModel.getById(id, 'sales');
    res.status(200).json(updatedSale);
  } catch (_e) {
    console.log(_e.message);
  }
};

const deleteSalesController = async (req, res) => {
  try {
    const { id } = req.params;
    const itemToDelete = await indexModel.getById(id, 'sales');
    const errMessage = messageFunction('Wrong sale ID format');
    if (!itemToDelete) return res.status(422).json(errMessage);
    await indexModel.deleteProduct(id, 'sales');
    return res.status(200).json(itemToDelete);
  } catch (_e) {
    console.log(_e.message);
  }
};

module.exports = {
  postSalesController,
  getSalesController,
  getSalesDetailsController,
  putSalesDetailsController,
  deleteSalesController,
};
