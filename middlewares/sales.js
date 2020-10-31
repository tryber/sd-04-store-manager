const salesModel = require('../models/salesModels');
const stockServices = require('../services/stockServices');

const createSales = async (req, res) => {
  const stockStatus = await stockServices.update(req.body);

  if (!stockStatus.done) return res.status(404).json(stockStatus.msg);

  const newSales = await salesModel.create(req.body);

  res.status(200).json(newSales);
};

const readSale = async (req, res) => { // Testar retirada do async
  const sale = req.sale;

  res.status(200).json(sale);
};

const readSales = async (_, res) => {
  const sales = await salesModel.read();

  res.status(200).json({ sales });
};

const updateSale = async (req, res) => {
  const id = req.params.id;
  const itensSold = req.body;
  const sale = await salesModel.update(id, itensSold);

  res.status(200).json(sale);
};

const deleteSale = async (req, res) => {
  const id = req.params.id;

  await stockServices.del(id);

  const sale = await salesModel.del(id);

  res.status(200).json(sale);
};

module.exports = {
  createSales,
  readSale,
  readSales,
  updateSale,
  deleteSale,
};
