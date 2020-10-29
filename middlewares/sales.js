const salesModel = require('../models/salesModel');

const createSales = async (req, res) => {
  const newSales = await salesModel.create(req.body);

  res.status(200).json(newSales);
};

const readSale = async (req, res) => {
  const sale = req.sale;

  return res.status(200).json(sale);
};

const readSales = async (_, res) => {
  const sales = await salesModel.read();

  res.status(200).json({ sales });
};

module.exports = {
  createSales,
  readSale,
  readSales,
};
