const salesModel = require('../models/salesModel');

const createSales = async (req, res) => {
  const newSales = await salesModel.create(req.body);

  res.status(200).json(newSales);
};

const readSale = async (req, res) => {
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
